import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Stock } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyStockDto, CreateStockDto, SellStockDto } from './dto/create-stock.dto';
import { StockFindByIdRes, StockFindByNameRes } from './types';
import { UsersService } from 'src/users/users.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { CreateStockPortfolioRes } from 'src/portfolio/types';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { StockConverter } from 'src/utils/Convertor/StockConverter';
import { StockPriceService } from './stock-price/stock-price.service';
import { CreateStockPriceDto } from './stock-price/dto/create-stock-price.dto';

@Injectable()
export class StocksService {
   constructor(
      private readonly prisma: PrismaService,
      @Inject(forwardRef(() => UsersService))
      private readonly usersService: UsersService,
      private readonly portfolioService: PortfolioService,
      private readonly stocksPortfolioService: StocksPortfolioService,
      private readonly stockPriceService: StockPriceService,
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
      const stocks = await this.prisma.stock.findMany({
         skip,
         take,
         where: {
            name: {
               contains: stockName,
            },
         },
         select: {
            id: true,
            name: true,
            prices: {
               orderBy: {
                  value: 'asc',
               },
               take: 1,
               select: {
                  id: true,
                  count: true,
                  value: true,
               },
            },
            company: {
               select: {
                  id: true,
                  name: true,
               },
            },
         },
      });
      return stocks.map((stock) => StockConverter.convertToFindRes(stock));
   }

   async findAll(findArgs: Prisma.StockFindManyArgs = {}): Promise<StockFindByNameRes[]> {
      const { skip, take } = findArgs;
      const stocks = await this.prisma.stock.findMany({
         skip,
         take,
         select: {
            id: true,
            name: true,
            prices: {
               orderBy: {
                  value: 'asc',
               },
               take: 1,
               select: {
                  id: true,
                  count: true,
                  value: true,
               },
            },
            company: {
               select: {
                  id: true,
                  name: true,
               },
            },
         },
      });
      return stocks.map((stock) => StockConverter.convertToFindRes(stock));
   }

   async create(data: CreateStockDto): Promise<Stock> {
      const { name, currentCount, currentPrice, description, companyId } = data;

      const stock: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'> = {
         name,
         description,
         companyId: companyId,
      };

      const createdStock = await this.prisma.stock.create({ data: stock });

      const createStockPriceDto: CreateStockPriceDto = {
         count: currentCount,
         value: currentPrice,
         stockId: createdStock.id,
      };

      await this.stockPriceService.create(createStockPriceDto);

      return createdStock;
   }

   async update(id: number, data: Prisma.StockUpdateInput): Promise<Stock> {
      return this.prisma.stock.update({
         where: {
            id,
         },
         data,
      });
   }

   async buy(
      userId: number,
      stockId: number,
      buyStockDto: BuyStockDto,
   ): Promise<CreateStockPortfolioRes> {
      const user = await this.usersService.findOne({ id: userId });

      const stock = await this.findOne(
         { id: stockId },
         {
            prices: {
               orderBy: {
                  value: 'asc',
               },
               where: {
                  count: {
                     not: 0,
                  },
               },
               take: 1,
            },
         },
      );

      const { balance } = user;

      const { prices } = stock;

      const currentPrice = prices[0];

      const { value: price, count, id: stockPriceId } = currentPrice;

      if (count < buyStockDto.stockCount) {
         throw new HttpException(`Invalid stocks count, max is ${count}`, HttpStatus.BAD_REQUEST);
      }

      const fullPrice = buyStockDto.stockCount * price;

      if (fullPrice > balance) {
         throw new HttpException('Not enough money on balance', HttpStatus.BAD_REQUEST);
      }

      // новый баланс пользователя
      await this.usersService.update(userId, {
         balance: {
            decrement: fullPrice,
         },
      });

      // если мы скупили все акции по данной цене, то удаляем ячейку с ценой,
      // иначе просто уменьшаем количество оставшихся акций
      if (count === buyStockDto.stockCount) {
         await this.stockPriceService.delete({
            id: stockPriceId,
         });
      } else {
         await this.stockPriceService.update(
            {
               id: stockPriceId,
            },
            {
               count: {
                  decrement: buyStockDto.stockCount,
               },
               updatedAt: new Date(),
            },
         );
      }

      const portfolio = await this.portfolioService.findOne(
         { ownerId: userId },
         {
            stocks: true,
         },
      );

      const { id: portfolioId, stocks } = portfolio;

      const isStockAlreadyInPortfolio = stocks.find((item) => item.stockId === stockId);

      if (isStockAlreadyInPortfolio) {
         return this.stocksPortfolioService.update(isStockAlreadyInPortfolio.id, {
            count: {
               increment: buyStockDto.stockCount,
            },
         });
      }

      return this.stocksPortfolioService.create({
         count: buyStockDto.stockCount,
         stockId,
         portfolioId,
      });
   }

   async sell(userId: number, stockId: number, sellStockDto: SellStockDto) {
      const user = await this.usersService.findOne({ id: userId });
      const stock = await this.findOne(
         { id: stockId },
         {
            prices: {
               orderBy: {
                  value: 'asc',
               },
            },
         },
      );

      const portfolio = await this.portfolioService.findOne(
         {
            ownerId: userId,
         },
         {
            stocks: {
               where: {
                  stockId: {
                     equals: stockId,
                  },
               },
               select: {
                  id: true,
                  count: true,
               },
            },
         },
      );

      // у нас гарантированно только один элемент в массиве
      const { id: stockPortfolioId, count: stocksInPortfolioCount } = portfolio.stocks[0];

      console.log(sellStockDto.stockCount);
      console.log(stocksInPortfolioCount);

      return stock;
   }
}
