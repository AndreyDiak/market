import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Request,
   Param,
   ParseIntPipe,
} from '@nestjs/common';
import { MeUserRes } from 'src/users/types';
import { PortfolioService } from './portfolio.service';
import {
   SELECT_PORTFOLIO_ALL,
   // SELECT_PORTFOLIO_BONDS,
   SELECT_PORTFOLIO_STOCK,
} from './select';
import { StocksPortfolioService } from './stocks-portfolio/stocks-portfolio.service';

@Controller('portfolio')
export class PortfolioController {
   constructor(
      private readonly portfolioService: PortfolioService,
      private readonly stocksPortfolioService: StocksPortfolioService,
   ) {}

   @Get('/my')
   @HttpCode(HttpStatus.ACCEPTED)
   async my(@Request() req) {
      const { userId } = req.user as MeUserRes;

      return this.portfolioService.findOne(
         { ownerId: userId },
         {
            ...SELECT_PORTFOLIO_ALL,
         },
      );
   }

   @Get('/stocks')
   @HttpCode(HttpStatus.ACCEPTED)
   async getMyStocks(@Request() req) {
      const { userId } = req.user as MeUserRes;

      return this.portfolioService.findOne(
         { ownerId: userId },
         {
            ...SELECT_PORTFOLIO_STOCK,
         },
      );
   }

   // @Get('/bonds')
   // @HttpCode(HttpStatus.ACCEPTED)
   // async getMyBonds(@Request() req) {
   //    const { userId } = req.user as MeUserRes;

   //    return this.portfolioService.findOne(
   //       { ownerId: userId },
   //       {
   //          ...SELECT_PORTFOLIO_BONDS,
   //       },
   //    );
   // }

   @Get('/stocks/:id')
   async getPortfolioStockById(@Param('id', ParseIntPipe) id: number) {
      return this.stocksPortfolioService.findOne({ id });
   }

   @Get('/:id')
   async getPortfolioById(@Param('id', ParseIntPipe) id: number) {
      return this.portfolioService.findOne(
         {
            ownerId: id,
         },
         {
            ...SELECT_PORTFOLIO_ALL,
         },
      );
   }

   // @raymix TODO добавить два запроса /stocks/:id и /bonds/:id
}
