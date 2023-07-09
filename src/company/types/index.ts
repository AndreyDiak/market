import { ApiProperty } from '@nestjs/swagger';
import { StockCreateRes } from 'src/stock/types';
import { EXAMPLE_COUNT, EXAMPLE_DESCRIPTION, EXAMPLE_ID, EXAMPLE_TIME } from 'src/utils';

export class CompanyFindByNameRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: 'OJSC Gazprom' })
   name: string;

   @ApiProperty({
      example: {
         company: {
            id: EXAMPLE_ID,
            name: 'Gazprom stocks',
         },
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
