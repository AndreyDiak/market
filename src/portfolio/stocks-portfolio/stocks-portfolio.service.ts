import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockPortfolioRes } from '../types';
import { STOCK_PORTFOLIO_DEFAULT_SELECT } from './utils';
import { CreateStockPortfolioDto } from './dto/create-stock-portfolio.dto';

@Injectable()
export class StocksPortfolioService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateStockPortfolioDto): Promise<CreateStockPortfolioRes> {
      const { count, stockId, portfolioId } = data;
      return this.prisma.stockPortfolio.create({
         data: {
            count,
            stockId,
            portfolioId,
         },
         select: STOCK_PORTFOLIO_DEFAULT_SELECT,
      }) as any;
   }

   async update(id: number, data: Prisma.StockPortfolioUpdateInput) {
      return this.prisma.stockPortfolio.update({
         where: {
            id,
         },
         data,
         select: STOCK_PORTFOLIO_DEFAULT_SELECT,
      }) as any;
   }

   async delete(id: number) {
      return this.prisma.stockPortfolio.delete({
         where: {
            id,
         },
      });
   }

   async findOne(where: Prisma.StockWhereUniqueInput, select?: Prisma.StockPortfolioSelect) {
      return this.prisma.stockPortfolio.findUnique({
         where,
         select,
      });
   }
}
