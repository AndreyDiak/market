import { ApiProperty } from '@nestjs/swagger';
import { StockCreateRes } from 'src/stock/types';
import { EXAMPLE_DESCRIPTION, EXAMPLE_ID, EXAMPLE_STOCK_NAME, EXAMPLE_TIME } from 'src/utils';

export class CompanyFindByNameRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: 'OJSC Gazprom' })
   name: string;

   @ApiProperty({
      example: {
         id: EXAMPLE_ID,
         name: EXAMPLE_STOCK_NAME,
      },
   })
   stock: {
      id: number;
      name: string;
   };
}

export class CompanyFindByIdRes extends CompanyFindByNameRes {
   @ApiProperty({ example: EXAMPLE_DESCRIPTION })
   description: string;

   @ApiProperty({ example: EXAMPLE_TIME })
   createdAt: Date;

   @ApiProperty({
      example: {
         id: EXAMPLE_ID,
         name: 'Gazpom stocks',
         description: EXAMPLE_DESCRIPTION,
         prices: [],
         companyId: EXAMPLE_ID,
      },
   })
   stock: StockCreateRes;
}
