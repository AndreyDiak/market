import { ApiProperty } from '@nestjs/swagger';
import {
   EXAMPLE_COMPANY,
   EXAMPLE_COMPANY_PREVIEW,
   EXAMPLE_DESCRIPTION,
   EXAMPLE_ID,
   EXAMPLE_PRICE_COMPLEX,
   EXAMPLE_PRICE_PREVIEW,
   EXAMPLE_TIME,
} from 'src/utils';

export class StockFindByNameRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: 'OJSC Gazprom' })
   name: string;

   @ApiProperty({ example: [EXAMPLE_PRICE_PREVIEW] })
   prices: {
      id: number;
      count: number;
      value: number;
   }[];

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

   @ApiProperty({ example: 'OJSC Gazprom' })
   name: string;

   @ApiProperty({ example: [EXAMPLE_PRICE_COMPLEX] })
   prices: {
      id: number;
      value: number;
      count: number;
      stockId: number;
   }[];

   @ApiProperty({ example: EXAMPLE_TIME })
   createdAt: Date;

   @ApiProperty({ example: EXAMPLE_TIME })
   updatedAt: Date;

   @ApiProperty({ example: EXAMPLE_DESCRIPTION })
   description: string;

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
