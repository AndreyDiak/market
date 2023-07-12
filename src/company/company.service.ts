import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, Prisma } from '@prisma/client';
import { CompanyFindByNameRes } from './types';

@Injectable()
export class CompanyService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateCompanyDto): Promise<Company> {
      const { name, description } = data;

      const company: Omit<Company, 'id' | 'createdAt'> = {
         name,
         description,
      };

      return this.prisma.company.create({ data: company });
   }

   async findOne(where: Prisma.CompanyWhereUniqueInput): Promise<any> {
      return this.prisma.company.findUnique({
         where,
         include: {
            stock: true,
         },
      });
   }

   async findAll(): Promise<CompanyFindByNameRes[]> {
      return this.prisma.company.findMany({
         select: {
            id: true,
            name: true,
            stock: {
               select: {
                  id: true,
                  name: true,
               },
            },
         },
      });
   }
}
