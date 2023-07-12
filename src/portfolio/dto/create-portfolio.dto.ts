import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePortfolioDto {
   @IsNumber()
   @IsNotEmpty()
   ownerId: number;
}
