import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CupType } from 'src/cup/types';
import { EXAMPLES } from 'src/utils';

export class CreateDealDto {
   @ApiProperty({ example: EXAMPLES.VALUES.OPERATION })
   @IsNotEmpty()
   type: CupType;

   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   @IsNotEmpty()
   @IsNumber()
   price: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   @IsNumber()
   @IsNotEmpty()
   count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNumber()
   @IsNotEmpty()
   buyerId: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNumber()
   @IsNotEmpty()
   sellerId: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNumber()
   @IsNotEmpty()
   stockId: number;
}
