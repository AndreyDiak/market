import { Injectable } from '@nestjs/common';
import { Deal, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDealDto } from './dto/create-deal.dto';

@Injectable()
export class DealService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateDealDto) {
      return this.prisma.deal.create({ data });
   }

   async findLatest(where: Prisma.DealWhereInput): Promise<Deal> {
      return this.prisma.deal.findFirst({
         where,
         orderBy: {
            date: 'desc',
         },
      });
   }
}
