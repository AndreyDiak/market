import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateNoteDto {
   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   stockId: number;

   @IsString()
   @IsNotEmpty()
   @ApiProperty({ example: EXAMPLES.VALUES.TEXT })
   text: string;
}
