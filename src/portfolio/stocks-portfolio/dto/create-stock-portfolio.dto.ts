import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockPortfolioDto {
   @IsNumber()
   @IsNotEmpty()
   count: number;

   @IsNumber()
   @IsNotEmpty()
   stockId: number;

   @IsNumber()
   @IsNotEmpty()
   portfolioId: number;
}
