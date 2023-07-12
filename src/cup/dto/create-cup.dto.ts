import { ApiProperty } from '@nestjs/swagger';
import { Operation } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLE_COUNT, EXAMPLE_ID, EXAMPLE_PRICE_VALUE } from 'src/utils';

export class CreateCupDto {
   @ApiProperty({ example: EXAMPLE_PRICE_VALUE })
   @IsNotEmpty()
   @IsNumber()
   price: number;

   @ApiProperty({ example: EXAMPLE_ID })
   @IsNotEmpty()
   @IsNumber()
   stockId: number;

   @ApiProperty({ example: EXAMPLE_COUNT })
   @IsNotEmpty()
   @IsNumber()
   totalCount: number;

   @IsNotEmpty()
   type?: Operation;
}
