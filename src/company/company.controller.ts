import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CompanyFindByIdRes, CompanyFindByNameRes } from './types';

@Controller('company')
export class CompanyController {
   constructor(private readonly companyService: CompanyService) {}

   @Post('/create')
   async create(@Body() createCompanyDto: CreateCompanyDto) {
      return this.companyService.create(createCompanyDto);
   }

   @Get('/all')
   @ApiOkResponse({ type: CompanyFindByNameRes })
   async all(): Promise<CompanyFindByNameRes[]> {
      return this.companyService.findAll();
   }

   @Get('/:id')
   @ApiOkResponse({ type: CompanyFindByIdRes })
   async findById(@Param('id', ParseIntPipe) id: number): Promise<CompanyFindByIdRes[]> {
      return this.companyService.findOne({ id });
   }
}
