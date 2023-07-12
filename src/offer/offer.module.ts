import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { UsersService } from 'src/users/users.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';

@Module({
   providers: [OfferService, UsersService, PortfolioService, StocksPortfolioService],
})
export class OfferModule {}
