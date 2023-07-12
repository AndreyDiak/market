import { Module, forwardRef } from '@nestjs/common';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { UsersModule } from 'src/users/users.module';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { OfferService } from 'src/offer/offer.service';
import { CupService } from 'src/cup/cup.service';

@Module({
   imports: [forwardRef(() => UsersModule)],
   providers: [StocksService, PortfolioService, StocksPortfolioService, OfferService, CupService],
   controllers: [StocksController],
   exports: [StocksService],
})
export class StockModule {}
