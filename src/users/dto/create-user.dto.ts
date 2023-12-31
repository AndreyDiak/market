import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EXAMPLES } from 'src/utils';

export class CreateUserDto {
   @ApiProperty({ example: EXAMPLES.VALUES.USER_NAME })
   @IsNotEmpty()
   @IsString()
   @MinLength(3)
   readonly name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_EMAIL })
   @IsNotEmpty()
   @IsEmail()
   readonly email: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_PASSWORD })
   @IsNotEmpty()
   @IsString()
   @MinLength(7)
   readonly password: string;
}
