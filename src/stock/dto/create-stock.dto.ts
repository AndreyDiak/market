import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { EXAMPLE_STOCK_NAME } from 'src/utils';

export class CreateStockDto {
   @ApiProperty({ example: 'OJSC CompanyName' })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: 100 })
   @IsNotEmpty()
   @IsNumber()
   readonly currentPrice: number;

   @ApiProperty({ example: 20 })
   @IsNotEmpty()
   @IsNumber()
   readonly currentCount: number;

   @ApiProperty({ example: 'Some description text' })
   @IsNotEmpty()
   @IsString()
   readonly description: string;

   @ApiProperty({ example: 1 })
   @IsNotEmpty()
   @IsNumber()
   readonly companyId: number;
}

export class FindStockDto {
   @ApiProperty({ example: EXAMPLE_STOCK_NAME })
   @IsNotEmpty()
   @IsNumber()
   stockName: string;
}

export class BuyStockDto {
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   stockCount: number;
}

export class SellStockDto {
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   stockCount: number;

   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   stockPrice: number;
}
