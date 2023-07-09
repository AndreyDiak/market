import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
   @ApiProperty({ example: 'Gazprom' })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: 'Some description text' })
   @IsNotEmpty()
   @IsString()
   readonly description: string;
}
