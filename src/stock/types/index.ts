import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from 'src/utils';

export class StockFindByNameRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.STOCK_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   lastPrice: number;

   @ApiProperty({
      example: EXAMPLES.PREVIEWS.COMPANY,
   })
   company?: {
      id: number;
      name: string;
   };
}

export class StockCreateRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.STOCK_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.DESCRIPTION })
   description: string | null;

   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   lastPrice: number;

   @ApiProperty({ example: EXAMPLES.VALUES.TIME })
   createdAt: Date;

   @ApiProperty({ example: EXAMPLES.VALUES.TIME })
   updatedAt: Date;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   companyId: number;
}

export class StockFindByIdRes extends StockCreateRes {
   @ApiProperty({
      example: EXAMPLES.FIND_BY_ID.COMPANY,
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
