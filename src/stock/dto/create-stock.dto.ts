import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateStockDto {
   @ApiProperty({ example: EXAMPLES.VALUES.USER_NAME })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   @IsNotEmpty()
   @IsNumber()
   readonly price: number;

   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   @IsNotEmpty()
   @IsNumber()
   readonly count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.DESCRIPTION })
   @IsNotEmpty()
   @IsString()
   readonly description: string;

   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   @IsNotEmpty()
   @IsNumber()
   readonly companyId: number;
}
