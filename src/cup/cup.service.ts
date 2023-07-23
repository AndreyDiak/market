import { Injectable } from '@nestjs/common';
import { Cup, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCupDto } from './dto/create-cup.dto';

@Injectable()
export class CupService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateCupDto): Promise<Cup> {
      const { price, stockId, totalCount, type } = data;

      return this.prisma.cup.create({
         data: {
            price,
            stockId,
            totalCount,
            type: type ?? 'BUY',
         },
      });
   }

   async update(where: Prisma.CupWhereUniqueInput, data: Prisma.CupUpdateInput): Promise<Cup> {
      return this.prisma.cup.update({ where, data });
   }

   async findMany(where: Prisma.CupWhereInput, findArgs?: Prisma.CupFindManyArgs): Promise<Cup[]> {
      const { orderBy, take } = findArgs;
      return this.prisma.cup.findMany({
         where,
         orderBy,
         take,
      });
   }

   async findFirst(where: Prisma.CupWhereInput, include?: Prisma.CupInclude) {
      return this.prisma.cup.findFirst({
         where,
         include,
      });
   }

   async createOrFind(where: Prisma.CupWhereInput, data: CreateCupDto): Promise<Cup> {
      return (await this.findFirst(where)) ?? (await this.create(data));
   }
}
