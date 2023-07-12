import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { TRADE_OPERATION_TYPE } from '../types';

export class SellStockDto {
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   count: number;

   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   price: number;

   @IsNotEmpty()
   sellType: TRADE_OPERATION_TYPE;
}
