import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   ParseIntPipe,
   Post,
   Query,
   Request,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Stock } from '@prisma/client';
import { CreateStockPortfolioRes } from 'src/portfolio/types';
import { MeUserRes } from 'src/users/types';
import { BuyStockDto } from './dto/buy-stock.dto';
import { CreateStockDto } from './dto/create-stock.dto';
import { FindStockDto } from './dto/find-stock.dto';
import { SellStockDto } from './dto/sell-stock.dto';
import { StocksService } from './stock.service';
import { StockCreateRes, StockFindByIdRes, StockFindByNameRes } from './types';
import { CONSTANTS } from 'src/utils/constants';

@Controller('stocks')
export class StocksController {
   constructor(private readonly stockService: StocksService) {}

   @Post('/create')
   @HttpCode(HttpStatus.CREATED)
   @ApiOkResponse({ type: StockCreateRes })
   async createStock(@Request() req, @Body() createStockDto: CreateStockDto): Promise<Stock> {
      const { userId } = req.user as MeUserRes;
      return this.stockService.create(userId, createStockDto);
   }

   @Get('/all')
   @ApiOkResponse({ type: StockFindByNameRes })
   async all(
      @Query('page', ParseIntPipe) page?: number,
      @Query('limit', ParseIntPipe) limit?: number,
   ): Promise<StockFindByNameRes[]> {
      const take = limit ?? CONSTANTS.PAGINATION_LIMIT;
      const skip = ((page ?? 1) - 1) * take;

      return this.stockService.findAll({
         skip,
         take,
      });
   }

   @Get('/count')
   async getCount(): Promise<number> {
      return this.stockService.getStocksCount();
   }

   @Get('/findByName')
   @ApiBody({ type: FindStockDto })
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiOkResponse({ type: StockFindByNameRes })
   async findByName(
      @Query('name') name: string,
      @Query('page', ParseIntPipe) page: number,
      @Query('limit', ParseIntPipe) limit: number,
   ) {
      const take = limit ?? CONSTANTS.PAGINATION_LIMIT;
      const skip = (page - 1) * take;

      return this.stockService.findByName(name, {
         take,
         skip,
      });
   }

   @Post('/buy/:id')
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiBody({ type: BuyStockDto })
   @ApiOkResponse({ type: CreateStockPortfolioRes })
   async buy(
      @Param('id', ParseIntPipe) id: number,
      @Body() buyStockDto: BuyStockDto,
      @Request() req,
   ): Promise<CreateStockPortfolioRes> {
      const { userId } = req.user as MeUserRes;
      return this.stockService.buy(userId, id, buyStockDto);
   }

   @Post('/sell/:id')
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiBody({ type: SellStockDto })
   async sell(
      @Param('id', ParseIntPipe) id: number,
      @Body() sellStockDto: SellStockDto,
      @Request() req,
   ) {
      const { userId } = req.user as MeUserRes;
      return this.stockService.sell(userId, id, sellStockDto);
   }

   @Get('/:id')
   @ApiOkResponse({ type: StockFindByIdRes })
   async findById(@Param('id', ParseIntPipe) id: number): Promise<Partial<StockFindByIdRes>> {
      return this.stockService.findOne(
         { id },
         {
            company: true,
         },
      );
   }
}
