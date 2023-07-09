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

export const SELECT_PORTFOLIO_BONDS: Prisma.PortfolioSelect = {
   bonds: {
      select: {
         id: true,
         count: true,
         bondId: true,
      },
   },
};

export const SELECT_PORTFOLIO_ALL: Prisma.PortfolioSelect = {
   ownerId: true,
   ...SELECT_PORTFOLIO_STOCK,
   ...SELECT_PORTFOLIO_BONDS,
};
