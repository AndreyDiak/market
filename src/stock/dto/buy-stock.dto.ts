import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { TRADE_OPERATION_TYPE } from '../types';

export class BuyStockDto {
   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   count: number;

   @IsNumber()
   @IsNotEmpty()
   @Min(1)
   price: number;

   @IsNotEmpty()
   buyType: TRADE_OPERATION_TYPE;
}
