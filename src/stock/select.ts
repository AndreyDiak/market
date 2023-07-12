import { Prisma } from '@prisma/client';

export const SELECT_PREVIEW_STOCKS: Prisma.StockSelect = {
   id: true,
   name: true,
   lastPrice: true,
   company: {
      select: {
         id: true,
         name: true,
      },
   },
};
