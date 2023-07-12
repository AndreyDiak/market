import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateOfferDto {
   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   @IsNotEmpty()
   @IsNumber()
   count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNotEmpty()
   @IsNumber()
   cupId: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNotEmpty()
   @IsNumber()
   userId: number;
}
