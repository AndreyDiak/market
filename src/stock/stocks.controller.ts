import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   ParseIntPipe,
   Post,
   Request,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Prisma, Stock } from '@prisma/client';
import { CreateStockPortfolioRes } from 'src/portfolio/types';
import { MeUserRes } from 'src/users/types';
import { BuyStockDto, CreateStockDto, FindStockDto, SellStockDto } from './dto/create-stock.dto';
import { StocksService } from './stocks.service';
import { StockCreateRes, StockFindByIdRes, StockFindByNameRes } from './types';

@Controller('stocks')
export class StocksController {
   constructor(private readonly stockService: StocksService) {}

   @Post('/create')
   @HttpCode(HttpStatus.CREATED)
   @ApiOkResponse({ type: StockCreateRes })
   async createStock(@Body() createStockDto: CreateStockDto): Promise<Stock> {
      return this.stockService.create(createStockDto);
   }

   @Get('/all')
   @ApiOkResponse({ type: StockFindByNameRes })
   async all(@Body() stockFindManyArgs: Prisma.StockFindManyArgs): Promise<StockFindByNameRes[]> {
      return this.stockService.findAll(stockFindManyArgs);
   }

   @Get('/findByName/:name')
   @ApiBody({ type: FindStockDto })
   @HttpCode(HttpStatus.ACCEPTED)
   @ApiOkResponse({ type: StockFindByNameRes })
   async findByName(
      @Param('name') name: string,
      @Body() stockFindManyArgs: Prisma.StockFindManyArgs,
   ) {
      return this.stockService.findByName(name, stockFindManyArgs);
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
   @ApiBody({ type: BuyStockDto })
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
            prices: {
               orderBy: {
                  value: 'asc',
               },
            },
         },
      );
   }
}
