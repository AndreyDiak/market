import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreatePortfolioDto {
   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   ownerId: number;
}
