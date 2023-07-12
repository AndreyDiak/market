import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLE_COUNT, EXAMPLE_ID } from 'src/utils';

export class CreateOfferDto {
   @ApiProperty({ example: EXAMPLE_COUNT })
   @IsNotEmpty()
   @IsNumber()
   count: number;

   @ApiProperty({ example: EXAMPLE_ID })
   @IsNotEmpty()
   @IsNumber()
   cupId: number;

   @ApiProperty({ example: EXAMPLE_ID })
   @IsNotEmpty()
   @IsNumber()
   userId: number;
}
