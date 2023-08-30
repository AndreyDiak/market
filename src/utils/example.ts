import { Trend } from '@prisma/client';

// constants for example variables
const VALUES = {
   ID: 1,
   COUNT: 10000,
   PRICE: 1000,
   DESCRIPTION: 'Some description text about this model',
   TEXT: 'Some text of post or comment',
   TIME: '2023-06-30T21:42:55.931Z',
   USER_NAME: 'Andrey',
   USER_EMAIL: 'andrey@mail.ru',
   USER_PASSWORD: 'testPass',
   USER_HASH: '$2b$10$90H0Hn.6Nx0SbrHQCX2xeeYjq.02nS5VpkIIwFAtDtCHEqHK',
   USER_ROLE: 'USER',
   STOCK_NAME: 'Gazprom',
   COMPANY_NAME: 'PJSC Gazprom',
   OPERATION: 'BUY',
   TRADE: 'best',
   TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyb2Rp',
   TRENDS: [Trend.HEALTH, Trend.IT, Trend.MINING, Trend.PRODUCTION, Trend.TECH, Trend.TRADE],
};

const PREVIEWS = {
   STOCK: {
      id: VALUES.ID,
      name: VALUES.STOCK_NAME,
      lastPrice: VALUES.PRICE,
   },
   PORTFOLIO_STOCK: {
      id: VALUES.ID,
      count: VALUES.COUNT,
      stockId: VALUES.ID,
   },
   COMPANY: {
      id: VALUES.ID,
      name: VALUES.COMPANY_NAME,
   },
};

const FIND_BY_NAME = {
   STOCK: {
      ...PREVIEWS.STOCK,
      company: PREVIEWS.COMPANY,
   },
};

const FIND_BY_ID = {
   STOCK: {
      ...PREVIEWS.STOCK,
      description: VALUES.DESCRIPTION,
      createdAt: VALUES.TIME,
      updatedAt: VALUES.TIME,
      companyId: VALUES.ID,
      company: {
         ...PREVIEWS.COMPANY,
         description: VALUES.DESCRIPTION,
         createdAt: VALUES.TIME,
      },
   },
   COMPANY: {
      ...PREVIEWS.COMPANY,
      description: VALUES.DESCRIPTION,
      createdAt: VALUES.TIME,
   },
   LOGIN: {
      userId: VALUES.ID,
      email: VALUES.USER_EMAIL,
      name: VALUES.USER_NAME,
      role: VALUES.USER_ROLE,
   },
};

export const EXAMPLES = {
   VALUES,
   PREVIEWS,
   FIND_BY_NAME,
   FIND_BY_ID,
};
