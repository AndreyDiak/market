import { ApiProperty } from '@nestjs/swagger';
import {
   EXAMPLE_COMPANY,
   EXAMPLE_COMPANY_PREVIEW,
   EXAMPLE_DESCRIPTION,
   EXAMPLE_ID,
   EXAMPLE_PRICE_VALUE,
   EXAMPLE_STOCK_NAME,
   EXAMPLE_TIME,
} from 'src/utils';

export class StockFindByNameRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_STOCK_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLE_PRICE_VALUE })
   lastPrice: number;

   @ApiProperty({
      example: EXAMPLE_COMPANY_PREVIEW,
   })
   company?: {
      id: number;
      name: string;
   };
}

export class StockCreateRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_STOCK_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLE_DESCRIPTION })
   description: string | null;

   @ApiProperty({ example: [EXAMPLE_PRICE_VALUE] })
   prices: number[];

   @ApiProperty({ example: EXAMPLE_PRICE_VALUE })
   lastPrice: number;

   @ApiProperty({ example: EXAMPLE_TIME })
   createdAt: Date;

   @ApiProperty({ example: EXAMPLE_TIME })
   updatedAt: Date;

   @ApiProperty({ example: EXAMPLE_ID })
   companyId: number;
}

export class StockFindByIdRes extends StockCreateRes {
   @ApiProperty({
      example: EXAMPLE_COMPANY,
   })
   company: {
      id: number;
      name: string;
      description: string;
      createdAt: Date;
   };
}

export interface UsersPayback {
   userId: number;
   count: number;
}

export enum TRADE_OPERATION_TYPE {
   BEST_PRICE = 'best',
   LIMIT_ORDER = 'limit',
}
