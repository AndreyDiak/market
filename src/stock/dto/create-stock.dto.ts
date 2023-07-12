import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
   EXAMPLE_COUNT,
   EXAMPLE_DESCRIPTION,
   EXAMPLE_ID,
   EXAMPLE_PRICE_VALUE,
   EXAMPLE_STOCK_NAME,
} from 'src/utils';

export class CreateStockDto {
   @ApiProperty({ example: EXAMPLE_STOCK_NAME })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: EXAMPLE_PRICE_VALUE })
   @IsNotEmpty()
   @IsNumber()
   readonly price: number;

   @ApiProperty({ example: EXAMPLE_COUNT })
   @IsNotEmpty()
   @IsNumber()
   readonly count: number;

   @ApiProperty({ example: EXAMPLE_DESCRIPTION })
   @IsNotEmpty()
   @IsString()
   readonly description: string;

   @ApiProperty({ example: EXAMPLE_ID })
   @IsNotEmpty()
   @IsNumber()
   readonly companyId: number;
}
