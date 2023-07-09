import { ApiProperty } from '@nestjs/swagger';
import { StockFindByNameRes } from 'src/stock/types';
import { EXAMPLE_STOCK_FIND_BY_NAME, EXAMPLE_COUNT, EXAMPLE_ID } from 'src/utils';

export class CreateStockPortfolioRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id?: number;

   @ApiProperty({ example: EXAMPLE_COUNT })
   count?: number;

   @ApiProperty({ example: EXAMPLE_STOCK_FIND_BY_NAME })
   stock?: StockFindByNameRes;
}

export class PortfolioStockPreviewRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_COUNT })
   count: number;

   @ApiProperty({ example: EXAMPLE_ID })
   stockId: number;
}

export class PortfolioBondPreviewRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_COUNT })
   count: number;

   @ApiProperty({ example: EXAMPLE_ID })
   bondId: number;
}

export class PortfolioRes {
   id: number;
   ownerId: number;
   stocks: PortfolioStockPreviewRes;
   bonds: PortfolioBondPreviewRes;
}
