// constants for example variables
export const EXAMPLE_ID = 1;

export const EXAMPLE_COUNT = 10000;

export const EXAMPLE_PRICE_VALUE = 1000;

export const EXAMPLE_DESCRIPTION = 'Some description text about this model';

export const EXAMPLE_TIME = '2023-06-30T21:42:55.931Z';

export const EXAMPLE_PRICE_PREVIEW = {
   id: EXAMPLE_ID,
   value: EXAMPLE_PRICE_VALUE,
   count: EXAMPLE_COUNT,
};

export const EXAMPLE_PRICE_COMPLEX = {
   ...EXAMPLE_PRICE_PREVIEW,
   stockId: EXAMPLE_ID,
};

export const EXAMPLE_COMPANY_PREVIEW = {
   id: EXAMPLE_ID,
   name: 'Gazprom',
};

export const EXAMPLE_COMPANY = {
   ...EXAMPLE_COMPANY_PREVIEW,
   description: EXAMPLE_DESCRIPTION,
   createdAt: EXAMPLE_TIME,
};

export const EXAMPLE_EMAIL = 'andrey@mail.ru';

export const EXAMPLE_NAME = 'andrey';

export const EXAMPLE_PASSWORD = 'andreyTestPass';

export const EXAMPLE_STOCK_NAME = 'OJSC Gazprom';

export const EXAMPLE_HASHED_PASSWORD = '$2b$10$90H0Hn.6Nx0SbrHQCX2xeeYjq.02nS5VpkIIwFAtDtCHEqHK';

export const EXAMPLE_ROLE = 'USER';

export const EXAMPLE_STOCK_FIND_BY_NAME = {
   id: EXAMPLE_ID,
   name: EXAMPLE_STOCK_NAME,
   currentPrice: EXAMPLE_PRICE_VALUE,
   prices: [EXAMPLE_PRICE_PREVIEW],
   company: EXAMPLE_COMPANY_PREVIEW,
};
