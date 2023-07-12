import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Prisma, Stock } from '@prisma/client';
import { CupService } from 'src/cup/cup.service';
import { OfferService } from 'src/offer/offer.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { CreateStockPortfolioRes } from 'src/portfolio/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { BuyStockDto } from './dto/buy-stock.dto';
import { CreateStockDto } from './dto/create-stock.dto';
import { SellStockDto } from './dto/sell-stock.dto';
import { SELECT_PREVIEW_STOCKS } from './select';
import { StockFindByIdRes, StockFindByNameRes, TRADE_OPERATION_TYPE } from './types';

@Injectable()
export class StocksService {
   constructor(
      private readonly prisma: PrismaService,
      @Inject(forwardRef(() => UsersService))
      private readonly usersService: UsersService,
      private readonly portfolioService: PortfolioService,
      private readonly stocksPortfolioService: StocksPortfolioService,
      private readonly offerService: OfferService,
      private readonly cupService: CupService,
   ) {}

   async findOne(
      where: Prisma.StockWhereUniqueInput,
      include?: Prisma.StockInclude,
   ): Promise<Partial<StockFindByIdRes>> {
      return this.prisma.stock.findUnique({
         where,
         include,
      });
   }

   async findByName(
      stockName: string,
      findArgs: Prisma.StockFindManyArgs = {},
   ): Promise<StockFindByNameRes[]> {
      const { skip, take } = findArgs;
      return this.prisma.stock.findMany({
         skip,
         take,
         where: {
            name: {
               contains: stockName,
            },
         },
         select: SELECT_PREVIEW_STOCKS,
      }) as Promise<StockFindByNameRes[]>;
   }

   async findAll(findArgs: Prisma.StockFindManyArgs = {}): Promise<StockFindByNameRes[]> {
      const { skip, take } = findArgs;
      return this.prisma.stock.findMany({
         skip,
         take,
         select: SELECT_PREVIEW_STOCKS,
      }) as Promise<StockFindByNameRes[]>;
   }

   async create(ownerId: number, data: CreateStockDto): Promise<Stock> {
      const { name, count, price, description, companyId } = data;

      // создаем акцию в БД
      const stock = await this.prisma.stock.create({
         data: {
            name,
            description,
            companyId,
            lastPrice: price,
         },
      });

      // создаем первый стакан для акции
      const cup = await this.cupService.create({
         price,
         stockId: stock.id,
         totalCount: count,
      });

      // создаем предложение
      await this.offerService.create({
         count,
         userId: ownerId,
         cupId: cup.id,
      });

      return stock;
   }

   async update(
      where: Prisma.StockWhereUniqueInput,
      data: Prisma.StockUpdateInput,
   ): Promise<Stock> {
      return this.prisma.stock.update({
         where,
         data,
      });
   }

   async buy(
      userId: number,
      stockId: number,
      buyStockDto: BuyStockDto,
   ): Promise<CreateStockPortfolioRes | undefined> {
      const { balance } = await this.usersService.findOne(
         { id: userId },
         {
            balance: true,
         },
      );

      const { count, price, buyType } = buyStockDto;

      const fullPrice = count * price;

      switch (buyType) {
         case TRADE_OPERATION_TYPE.LIMIT_ORDER: {
            // получаем стакан
            const cup = await this.cupService.createOrFind(
               { stockId, price, type: 'SELL' },
               { price, stockId, totalCount: count, type: 'SELL' },
            );
            const { id: cupId } = cup;
            // создаем предложение
            await this.offerService.create({
               count,
               userId,
               cupId,
            });

            // обновляем баланс
            await this.usersService.update(
               {
                  id: userId,
               },
               {
                  balance: {
                     decrement: fullPrice,
                  },
               },
            );

            break;
         }
         case TRADE_OPERATION_TYPE.BEST_PRICE: {
            // получаем стакан
            const cup = await this.cupService.findFirst(
               {
                  stockId,
                  price,
                  type: 'BUY',
               },
               {
                  offers: {
                     orderBy: {
                        createdAt: 'asc',
                     },
                  },
               },
            );

            const { totalCount, offers, id: cupId } = cup;

            // в теории никогда не должна срабатывать
            if (count > totalCount) {
               throw new HttpException(
                  `Invalid stocks count, max is ${totalCount}`,
                  HttpStatus.BAD_REQUEST,
               );
            }

            if (fullPrice > balance) {
               throw new HttpException('Not enough money on balance', HttpStatus.BAD_REQUEST);
            }

            // проходимся по предложениям в стакане и делаем выплаты держателям акций
            await this.offerService.updateOffersAfterTrade(count, offers, 'BUY', {
               price,
            });

            // уменьшаем кол-во акций в стакане по заданной цене
            await this.cupService.update(
               { id: cupId },
               {
                  totalCount: {
                     decrement: count,
                  },
               },
            );

            // Обновляем дату изменения акции
            await this.update(
               {
                  id: stockId,
               },
               {
                  updatedAt: new Date(),
               },
            );

            // обновляем баланс
            await this.usersService.update(
               {
                  id: userId,
               },
               {
                  balance: {
                     decrement: fullPrice,
                  },
               },
            );

            // находим портфель пользователя
            const { id: portfolioId } = await this.portfolioService.findOne({ ownerId: userId });

            // обновляем или создаем запись в портфеле
            return this.stocksPortfolioService.createOrUpdate(count, stockId, portfolioId);
         }
         default:
            return null;
      }
   }

   async sell(userId: number, stockId: number, sellStockDto: SellStockDto) {
      const { count, price, sellType } = sellStockDto;

      // находим портфель пользователя
      const { id: portfolioId } = await this.portfolioService.findOne({ ownerId: userId });

      switch (sellType) {
         case TRADE_OPERATION_TYPE.LIMIT_ORDER: {
            // получаме стакан
            const cup = await this.cupService.createOrFind(
               {
                  stockId,
                  price,
                  type: 'BUY',
               },
               {
                  price,
                  stockId,
                  totalCount: count,
                  type: 'BUY',
               },
            );

            const { id: cupId } = cup;

            // добавляем в стакан предложение
            await this.offerService.create({
               count,
               userId,
               cupId,
            });

            // удаляем акции из портфеля
            await this.stocksPortfolioService.deleteOrUpdate(count, stockId, portfolioId);

            break;
         }
         case TRADE_OPERATION_TYPE.BEST_PRICE: {
            const cup = await this.cupService.findFirst(
               {
                  stockId,
                  price,
                  type: 'SELL',
               },
               {
                  offers: {
                     orderBy: {
                        createdAt: 'asc',
                     },
                  },
               },
            );

            const { totalCount, offers, id: cupId } = cup;

            const { count: maxCountToSell } = await this.stocksPortfolioService.findFirst(
               {
                  portfolioId,
                  stockId,
               },
               {
                  count: true,
                  id: true,
               },
            );

            // если мы хотим продать больше чем у нас есть...
            if (count > maxCountToSell) {
               throw new HttpException(
                  `Invalid stocks count, max is ${maxCountToSell}`,
                  HttpStatus.BAD_REQUEST,
               );
            }

            // если мы хотим продать больше, чем готовы купить
            if (count > totalCount) {
               throw new HttpException(
                  `Invalid stocks count, max is ${totalCount}`,
                  HttpStatus.BAD_REQUEST,
               );
            }

            // удаляем акции из портфеля
            await this.stocksPortfolioService.deleteOrUpdate(count, stockId, portfolioId);

            // TODO @raymix проходимся по предложениям на покупку
            // и добавляем пользователям акции в портфели
            await this.offerService.updateOffersAfterTrade(count, offers, 'SELL', {
               stockId,
            });

            // уменьшаем кол-во акций в стакане по заданной цене
            await this.cupService.update(
               { id: cupId },
               {
                  totalCount: {
                     decrement: count,
                  },
               },
            );

            // полная цена за продажу акций
            const fullPrice = count * price;

            // новый баланс пользователя
            await this.usersService.update(
               { id: userId },
               {
                  balance: {
                     increment: fullPrice,
                  },
               },
            );

            // Обновляем дату изменения акции
            await this.update(
               {
                  id: stockId,
               },
               {
                  updatedAt: new Date(),
               },
            );
         }
         default:
            return null;
      }
   }
}
