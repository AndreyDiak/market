import { ApiProperty } from '@nestjs/swagger';
import { Operation } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateCupDto {
   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   @IsNotEmpty()
   @IsNumber()
   price: number;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNotEmpty()
   @IsNumber()
   stockId: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   @IsNotEmpty()
   @IsNumber()
   totalCount: number;

   @IsNotEmpty()
   type?: Operation;
}
