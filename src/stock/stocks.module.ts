import { Module, forwardRef } from '@nestjs/common';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { UsersModule } from 'src/users/users.module';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { StockPriceModule } from './stock-price/stock-price.module';
import { StockPriceService } from './stock-price/stock-price.service';

@Module({
   imports: [forwardRef(() => UsersModule), StockPriceModule],
   providers: [StocksService, PortfolioService, StocksPortfolioService, StockPriceService],
   controllers: [StocksController],
   exports: [StocksService],
})
export class StockModule {}
