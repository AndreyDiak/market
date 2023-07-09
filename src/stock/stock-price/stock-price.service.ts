import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockPriceDto } from './dto/create-stock-price.dto';
import { Prisma, StockPrice } from '@prisma/client';

@Injectable()
export class StockPriceService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateStockPriceDto): Promise<StockPrice> {
      return this.prisma.stockPrice.create({ data });
   }

   async update(
      where: Prisma.StockPriceWhereUniqueInput,
      data: Prisma.StockPriceUpdateInput,
   ): Promise<StockPrice> {
      return this.prisma.stockPrice.update({
         where,
         data,
      });
   }

   async delete(where: Prisma.StockPriceWhereUniqueInput): Promise<StockPrice> {
      return this.prisma.stockPrice.delete({
         where,
      });
   }
}
