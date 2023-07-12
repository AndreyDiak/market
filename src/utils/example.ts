// constants for example variables
const VALUES = {
   ID: 1,
   COUNT: 10000,
   PRICE: 1000,
   DESCRIPTION: 'Some description text about this model',
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
};

const PREVIEWS = {
   STOCK: {
      id: VALUES.ID,
      name: VALUES.STOCK_NAME,
      lastPrice: VALUES.PRICE,
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
// export const EXAMPLE_PRICE_COMPLEX = {
//    ...EXAMPLE_PRICE_PREVIEW,
//    stockId: EXAMPLE_ID,
// };

// export const EXAMPLE_COMPANY_PREVIEW = {
//    id: EXAMPLE_ID,
//    name: 'Gazprom',
// };

// export const EXAMPLE_COMPANY = {
//    ...EXAMPLE_COMPANY_PREVIEW,
//    description: EXAMPLE_DESCRIPTION,
//    createdAt: EXAMPLE_TIME,
// };

// export const EXAMPLE_STOCK_FIND_BY_NAME = {
//    id: EXAMPLE_ID,
//    name: EXAMPLE_STOCK_NAME,
//    currentPrice: EXAMPLE_PRICE_VALUE,
//    prices: [EXAMPLE_PRICE_PREVIEW],
//    company: EXAMPLE_COMPANY_PREVIEW,
// };
