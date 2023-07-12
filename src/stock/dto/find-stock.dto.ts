import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { EXAMPLE_STOCK_NAME } from 'src/utils';

export class FindStockDto {
   @ApiProperty({ example: EXAMPLE_STOCK_NAME })
   @IsNotEmpty()
   @IsNumber()
   stockName: string;
}
