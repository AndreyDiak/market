export const CONSTANTS = {
   PAGINATION_LIMIT: Number(process.env.PAGINATION_LIMIT),
   CUP_PAGINATION_LIMIT: Number(process.env.CUP_PAGINATION_LIMIT),
   HASH_SALT: Number(process.env.HASH_SALT),
   JWT_ACCESS_SECRET: process.env.SECRET_ACCESS_JWT,
   JWT_REFRESH_SECRET: process.env.SECRET_REFRESH_JWT,
};
