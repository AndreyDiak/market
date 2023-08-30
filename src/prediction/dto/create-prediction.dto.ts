import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreatePredictionDto {
   @IsNotEmpty()
   @IsDate()
   @ApiProperty({ example: EXAMPLES.VALUES.TIME })
   expiresAt: Date;

   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   price: number;

   // @IsNumber()
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   postId?: number;

   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   stockId: number;
}
