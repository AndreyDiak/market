import { Prisma } from '@prisma/client';

export const STOCK_PORTFOLIO_DEFAULT_SELECT: Prisma.StockPortfolioSelect = {
   id: true,
   count: true,
   stock: {
      select: {
         id: true,
         name: true,
         lastPrice: true,
      },
   },
};
