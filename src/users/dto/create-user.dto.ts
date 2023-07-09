import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class 
CreateUserDto {
   @ApiProperty({ example: 'andrey' })
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @ApiProperty({ example: 'andrey@mail.ru' })
   @IsNotEmpty()
   @IsEmail()
   readonly email: string;

   @ApiProperty({ example: 'testpass' })
   @IsNotEmpty()
   @IsString()
   readonly password: string;
}
