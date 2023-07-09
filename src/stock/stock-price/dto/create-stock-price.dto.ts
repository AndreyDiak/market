import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockPriceDto {
   @IsNumber()
   @IsNotEmpty()
   count: number;

   @IsNumber()
   @IsNotEmpty()
   value: number;

   @IsNumber()
   @IsNotEmpty()
   stockId: number;
}
