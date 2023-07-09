import { Module } from '@nestjs/common';
import { StockPriceService } from './stock-price.service';

@Module({
   providers: [StockPriceService],
})
export class StockPriceModule {}
