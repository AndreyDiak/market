import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { TRADE_OPERATION_TYPE } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from 'src/utils';

export class SellStockDto {
   @ApiProperty({ example: EXAMPLES.VALUES.COUNT })
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   count: number;

   @ApiProperty({ example: EXAMPLES.VALUES.PRICE })
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   price: number;

   @ApiProperty({ example: EXAMPLES.VALUES.TRADE })
   @IsNotEmpty()
   sellType: TRADE_OPERATION_TYPE;
}
