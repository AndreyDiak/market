import { Injectable } from '@nestjs/common';
import { Portfolio, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { StocksPortfolioService } from './stocks-portfolio/stocks-portfolio.service';

@Injectable()
export class PortfolioService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly stockPortfolioService: StocksPortfolioService,
   ) {}

   async findOne(where: Prisma.PortfolioWhereUniqueInput, select?: Prisma.PortfolioSelect) {
      return this.prisma.portfolio.findUnique({
         where,
         select: {
            id: true,
            ...select,
         },
      });
   }

   async update(ownerId: number, data: Prisma.PortfolioUpdateInput): Promise<Portfolio> {
      return this.prisma.portfolio.update({
         where: {
            ownerId,
         },
         data,
      });
   }

   async create(data: CreatePortfolioDto): Promise<Portfolio> {
      return this.prisma.portfolio.create({
         data: {
            ownerId: data.ownerId,
         },
      });
   }
}
