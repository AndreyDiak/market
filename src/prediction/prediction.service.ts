import { Injectable } from '@nestjs/common';
import { Prediction, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StocksService } from 'src/stock/stock.service';

@Injectable()
export class PredictionService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly stocksService: StocksService,
   ) {}

   async create(data: Prisma.PredictionCreateManyInput): Promise<Prediction> {
      return this.prisma.prediction.create({
         data,
      });
   }

   async findOne(where: Prisma.PredictionWhereUniqueInput): Promise<Prediction> {
      return this.prisma.prediction.findUnique({ where });
   }

   async findAllByStockId(
      where: Prisma.PredictionWhereInput,
      select?: Prisma.PredictionSelect,
   ): Promise<Partial<Prediction>[] | null> {
      return this.prisma.prediction.findMany({
         where,
         select,
      });
   }

   async findBest(stockId: number): Promise<Prediction> {
      const { lastPrice } = await this.stocksService.findOne({
         id: stockId,
      });

      const positive = await this.findAllByStockId(
         {
            stockId,
            price: {
               gte: lastPrice,
            },
         },
         {
            id: true,
         },
      );

      const negative = await this.findAllByStockId(
         {
            stockId,
            price: {
               lt: lastPrice,
            },
         },
         {
            id: true,
         },
      );

      if (positive.length === 0 && negative.length === 0) {
         return null;
      }

      const predictionList = positive.length > negative.length ? positive : negative;

      const predictionId = predictionList[Math.floor(predictionList.length / 2)].id;

      return this.findOne({
         id: predictionId,
      });
   }
}
