import { ApiProperty } from '@nestjs/swagger';
import { Trend } from '@prisma/client';
import { StockCreateRes } from 'src/stock/types';
import { EXAMPLES } from 'src/utils';

export class CompanyFindByNameRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COMPANY_NAME })
   name: string;

   @ApiProperty({
      example: EXAMPLES.PREVIEWS.STOCK,
   })
   stock: {
      id: number;
      name: string;
      lastPrice: number;
   };
}

export class CompanyFindByIdRes extends CompanyFindByNameRes {
   @ApiProperty({ example: EXAMPLES.VALUES.DESCRIPTION })
   description: string;

   @ApiProperty({ example: EXAMPLES.VALUES.DESCRIPTION })
   createdAt: Date;

   @ApiProperty({ example: EXAMPLES.VALUES.TRENDS })
   trends: Trend;

   @ApiProperty({
      example: EXAMPLES.FIND_BY_ID.STOCK,
   })
   stock: StockCreateRes;
}
