import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class FindStockDto {
   @ApiProperty({ example: EXAMPLES.VALUES.STOCK_NAME })
   @IsNotEmpty()
   @IsNumber()
   stockName: string;
}
