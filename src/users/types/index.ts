import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from 'src/utils';

export class LoginUserDto {
   @ApiProperty({ example: EXAMPLES.VALUES.USER_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_PASSWORD })
   password: string;
}

export class LoginUserRes {
   @ApiProperty({ example: EXAMPLES.VALUES.TOKEN })
   access_token: string;
}

export class MeUserRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   userId: number;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_EMAIL })
   email: string;

   // @ApiProperty({ example: EXAMPLES.VALUES.USER_ROLE })
   // role: string;
}

export class UserFindByIdRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_NAME })
   name: string;
}

export class LogoutUserRes {
   @ApiProperty({ example: 'User logout!' })
   message: string;
}

export class SignupUserRes {
   @ApiProperty({ example: EXAMPLES.VALUES.ID })
   id: number;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_HASH })
   password: string;

   @ApiProperty({ example: EXAMPLES.VALUES.USER_ROLE })
   role: string;

   @ApiProperty({ example: EXAMPLES.VALUES.TIME })
   created_at: string;

   @ApiProperty({ example: EXAMPLES.VALUES.TIME })
   updated_at: string;
}
