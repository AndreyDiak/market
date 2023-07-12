import { ApiProperty } from '@nestjs/swagger';
import { StockFindByNameRes } from 'src/stock/types';
import { EXAMPLES } from 'src/utils';

export class CreateStockPortfolioRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id?: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   count?: number;

   @ApiProperty({ example: EXAMPLES.FIND_BY_NAME.STOCK })
   stock?: StockFindByNameRes;
}

export class PortfolioStockPreviewRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   stockId: number;
}

export class PortfolioBondPreviewRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   bondId: number;
}

export class PortfolioRes {
   id: number;
   ownerId: number;
   stocks: PortfolioStockPreviewRes;
   bonds: PortfolioBondPreviewRes;
}
