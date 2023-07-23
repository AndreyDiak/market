import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CUP_PAGINATION_LIMIT } from 'src/utils/constants';
import { CupService } from './cup.service';
import { CupType } from './types';

@Controller('cup')
export class CupController {
   constructor(private readonly cupSerivice: CupService) {}

   @Get('findByStockId/:stockId')
   async findManyCupsWithStockId(
      @Param('stockId', ParseIntPipe) stockId: number,
      @Query('take', ParseIntPipe) take: number,
      @Query('type') type: CupType,
   ) {
      return this.cupSerivice.findMany(
         {
            stockId,
            type,
         },
         {
            orderBy: {
               price: type === 'BUY' ? 'asc' : 'desc',
            },
            take: take ?? CUP_PAGINATION_LIMIT,
         },
      );
   }
}
