import {
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   ParseIntPipe,
   Request,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { MeUserRes } from 'src/users/types';
import { PortfolioService } from './portfolio.service';
import { SELECT_PORTFOLIO_ALL, SELECT_PORTFOLIO_STOCK } from './select';
import { StocksPortfolioService } from './stocks-portfolio/stocks-portfolio.service';
import {
   MyPortfolioRes,
   MyPortfolioStockById,
   MyPortfolioStocksRes,
   PortfolioByIdRes,
} from './types';

@Controller('portfolio')
export class PortfolioController {
   constructor(
      private readonly portfolioService: PortfolioService,
      private readonly stocksPortfolioService: StocksPortfolioService,
   ) {}

   @Get('/my')
   @ApiOkResponse({ type: MyPortfolioRes })
   @HttpCode(HttpStatus.ACCEPTED)
   async my(@Request() req): Promise<MyPortfolioRes> {
      const { userId } = req.user as MeUserRes;

      return this.portfolioService.findOne(
         { ownerId: userId },
         {
            ...SELECT_PORTFOLIO_ALL,
         },
      );
   }

   // отдельные акции в портфолио только для себя
   @Get('/my/stocks')
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiOkResponse({ type: MyPortfolioStocksRes })
   async getMyStocks(@Request() req): Promise<MyPortfolioStocksRes> {
      const { userId } = req.user as MeUserRes;

      return this.portfolioService.findOne(
         { ownerId: userId },
         {
            ...SELECT_PORTFOLIO_STOCK,
         },
      );
   }

   // отдельныую акцию в портфолио только для себя
   @Get('/my/stocks/:id')
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiOkResponse({ type: MyPortfolioStockById })
   async getPortfolioStockById(
      @Param('id', ParseIntPipe) id: number,
   ): Promise<MyPortfolioStockById> {
      return this.stocksPortfolioService.findOne(
         { id },
         {
            stock: {
               include: {
                  company: true,
               },
            },
         },
      );
   }

   @Get('/:id')
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiOkResponse({ type: PortfolioByIdRes })
   async getPortfolioById(@Param('id', ParseIntPipe) id: number): Promise<PortfolioByIdRes> {
      return this.portfolioService.findOne(
         { id },
         {
            ...SELECT_PORTFOLIO_ALL,
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
}
