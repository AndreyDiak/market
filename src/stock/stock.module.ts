import { Module, forwardRef } from '@nestjs/common';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { UsersModule } from 'src/users/users.module';
import { StocksController } from './stock.controller';
import { StocksService } from './stock.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { OfferService } from 'src/offer/offer.service';
import { CupService } from 'src/cup/cup.service';
import { DealService } from 'src/deal/deal.service';

@Module({
   imports: [forwardRef(() => UsersModule)],
   providers: [
      StocksService,
      PortfolioService,
      StocksPortfolioService,
      OfferService,
      CupService,
      DealService,
   ],
   controllers: [StocksController],
   exports: [StocksService],
})
export class StockModule {}
