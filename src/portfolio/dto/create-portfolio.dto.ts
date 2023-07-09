import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePortfolioDto {
   @IsNumber()
   @IsNumber()
   ownerId: number;
}
