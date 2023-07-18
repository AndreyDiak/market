import { ApiProperty } from '@nestjs/swagger';
import { StockFindByIdRes, StockFindByNameRes } from 'src/stock/types';
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

export class MyPortfolioRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id?: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   ownerId?: number;

   @ApiProperty({ example: [EXAMPLES.PREVIEWS.PORTFOLIO_STOCK] })
   stocks?: PortfolioStockPreviewRes[];
   // bonds: PortfolioBondPreviewRes;
}

export class MyPortfolioStocksRes {
   @ApiProperty({ example: [EXAMPLES.PREVIEWS.PORTFOLIO_STOCK] })
   stocks?: PortfolioStockPreviewRes[];
}

export class MyPortfolioStockById extends CreateStockPortfolioRes {
   @ApiProperty({ example: EXAMPLES.FIND_BY_ID.STOCK })
   stock?: StockFindByIdRes;
}

export class PortfolioByIdRes extends MyPortfolioRes {}
