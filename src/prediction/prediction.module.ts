import { Module } from '@nestjs/common';
import { CupService } from 'src/cup/cup.service';
import { DealService } from 'src/deal/deal.service';
import { OfferService } from 'src/offer/offer.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';
import { StocksService } from 'src/stock/stock.service';
import { UsersService } from 'src/users/users.service';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

@Module({
   providers: [
      PredictionService,
      StocksService,
      UsersService,
      PortfolioService,
      StocksPortfolioService,
      OfferService,
      CupService,
      DealService,
   ],
   controllers: [PredictionController],
})
export class PredictionModule {}
