import { ApiProperty } from '@nestjs/swagger';
import { Trend } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateCompanyDto {
   @ApiProperty({ example: EXAMPLES.VALUES.COMPANY_NAME })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.DESCRIPTION })
   @IsNotEmpty()
   @IsString()
   readonly description: string;

   @ApiProperty({ example: EXAMPLES.VALUES.TRENDS })
   @IsNotEmpty()
   readonly trends: Trend[];
}
