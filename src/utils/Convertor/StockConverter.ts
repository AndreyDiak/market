import { StockFindByNameRes } from 'src/stock/types';

export class StockConverter {
   public static convertToFindRes(data: any): StockFindByNameRes {
      const { prices, ...fields } = data;
      return {
         ...fields,
         price: prices[0],
      };
   }
}
