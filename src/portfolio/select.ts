import { Prisma } from '@prisma/client';

export const SELECT_PORTFOLIO_STOCK: Prisma.PortfolioSelect = {
   stocks: {
      select: {
         id: true,
         count: true,
         stockId: true,
      },
   },
};

export const SELECT_PORTFOLIO_ALL: Prisma.PortfolioSelect = {
   id: true,
   ownerId: true,
   ...SELECT_PORTFOLIO_STOCK,
};
