import { Injectable } from '@nestjs/common';
import { Offer, Operation, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UsersService } from 'src/users/users.service';
import { calculateOffers } from 'src/utils/functions/calculateOffers';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { DealService } from 'src/deal/deal.service';

@Injectable()
export class OfferService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly dealSerivce: DealService,
      private readonly usersService: UsersService,
      private readonly portfolioService: PortfolioService,
      private readonly stockPortfolioService: StocksPortfolioService,
   ) {}

   async findOne(where: Prisma.OfferWhereUniqueInput): Promise<Offer> {
      return this.prisma.offer.findUnique({
         where,
      });
   }

   async create(data: CreateOfferDto): Promise<Offer> {
      const { count, userId, cupId } = data;

      return this.prisma.offer.create({
         data: { count, userId, cupId },
      });
   }

   async update(
      where: Prisma.OfferWhereUniqueInput,
      data: Prisma.OfferUpdateInput,
   ): Promise<Offer> {
      return this.prisma.offer.update({ where, data });
   }

   async delete(where: Prisma.OfferWhereUniqueInput) {
      return this.prisma.offer.delete({ where });
   }

   async updateOffersAfterTrade(
      count: number,
      offers: Offer[],
      tradeType: Operation,
      payload: {
         price?: number;
         stockId: number;
         userId: number;
      },
   ) {
      const { idsToUpdate } = calculateOffers(count, offers);

      const { price, stockId, userId: initiatorUserId } = payload;

      await Promise.all(
         idsToUpdate.map(async (idToUpdate) => {
            const { id, userId, count, type } = idToUpdate;

            if (tradeType === 'BUY') {
               // мы покупаем акцию, значит мы должны
               // выплатить держателю деньги за акции
               await this.usersService.update(
                  {
                     id: userId,
                  },
                  {
                     balance: {
                        increment: count * price,
                     },
                  },
               );
            } else if (tradeType === 'SELL') {
               // мы продаем акцию, значит мы должны
               // добавить в портфель юзера акции
               const { id: portfolioId } = await this.portfolioService.findOne({ ownerId: userId });
               await this.stockPortfolioService.createOrUpdate(count, stockId, portfolioId);
            }

            // если мы выкупили не все акции у держателя то уменьшаем их кол-во
            if (type === 'update') {
               await this.update(
                  {
                     id,
                  },
                  {
                     count: {
                        decrement: count,
                     },
                  },
               );
               // если выкупили все то удаляем предложениен
            } else if (type === 'delete') {
               await this.delete({
                  id,
               });
            }

            await this.dealSerivce.create({
               count,
               price,
               stockId,
               type: tradeType,
               sellerId: tradeType === 'BUY' ? userId : initiatorUserId,
               buyerId: tradeType === 'BUY' ? initiatorUserId : userId,
            });
         }),
      );
   }
}
