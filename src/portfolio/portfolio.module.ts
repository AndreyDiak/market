import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { StocksPortfolioModule } from './stocks-portfolio/stocks-portfolio.module';
import { StocksPortfolioService } from './stocks-portfolio/stocks-portfolio.service';

@Module({
   controllers: [PortfolioController],
   providers: [PortfolioService, StocksPortfolioService],
   exports: [PortfolioService],
   imports: [StocksPortfolioModule],
})
export class PortfolioModule {}
