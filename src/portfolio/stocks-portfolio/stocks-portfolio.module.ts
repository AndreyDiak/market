import { Module } from '@nestjs/common';
import { StocksPortfolioController } from './stocks-portfolio.controller';
import { StocksPortfolioService } from './stocks-portfolio.service';

@Module({
   controllers: [StocksPortfolioController],
   providers: [StocksPortfolioService],
   exports: [StocksPortfolioService],
   imports: [StocksPortfolioModule],
})
export class StocksPortfolioModule {}
