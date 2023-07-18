import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockPortfolioRes } from '../types';
import { CreateStockPortfolioDto } from './dto/create-stock-portfolio.dto';
import { STOCK_PORTFOLIO_DEFAULT_SELECT } from './utils';

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
      }) as Promise<CreateStockPortfolioRes>;
   }

   async update(
      where: Prisma.StockPortfolioWhereUniqueInput,
      data: Prisma.StockPortfolioUpdateInput,
   ): Promise<CreateStockPortfolioRes> {
      return this.prisma.stockPortfolio.update({
         where,
         data,
         select: STOCK_PORTFOLIO_DEFAULT_SELECT,
      }) as Promise<CreateStockPortfolioRes>;
   }

   async delete(where: Prisma.StockPortfolioWhereUniqueInput) {
      return this.prisma.stockPortfolio.delete({
         where,
      });
   }

   async findOne(
      where: Prisma.StockPortfolioWhereUniqueInput,
      include?: Prisma.StockPortfolioInclude,
   ) {
      return this.prisma.stockPortfolio.findUnique({
         where,
         include,
      });
   }

   async findMany(where: Prisma.StockPortfolioWhereInput, select?: Prisma.StockPortfolioSelect) {
      return this.prisma.stockPortfolio.findMany({
         where,
         select,
      });
   }

   async findFirst(where: Prisma.StockPortfolioWhereInput, select?: Prisma.StockPortfolioSelect) {
      return this.prisma.stockPortfolio.findFirst({
         where,
         select,
      });
   }

   // если у нас нет
   async createOrUpdate(
      count: number,
      stockId: number,
      portfolioId: number,
   ): Promise<CreateStockPortfolioRes> {
      const stockPortfolio = await this.findFirst({
         stockId,
         portfolioId,
      });

      const { id } = stockPortfolio ?? {};

      // если у нас уже есть акция то мы просто увеличиваем ее кол-во
      if (id) {
         return this.update(
            { id },
            {
               count: {
                  increment: count,
               },
            },
         );
      }

      // если акции нет то создаем новую ячейку
      return this.create({
         count,
         stockId,
         portfolioId,
      });
   }

   async deleteOrUpdate(count: number, stockId: number, portfolioId: number) {
      const stockPortfolio = await this.findFirst({
         stockId,
         portfolioId,
      });

      const { count: stockInPortfolioCount, id } = stockPortfolio;

      // если мы хотим продать все акции то удаляем ячейку
      if (stockInPortfolioCount === count) {
         return this.delete({ id });
      }

      // если мы продаем часть акций то просто уменьшаем их кол-во в портфеле
      return this.update(
         {
            id,
         },
         {
            count: {
               decrement: count,
            },
         },
      );
   }
}
