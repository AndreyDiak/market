import { ApiProperty } from '@nestjs/swagger';
import {
   EXAMPLE_EMAIL,
   EXAMPLE_HASHED_PASSWORD,
   EXAMPLE_ID,
   EXAMPLE_NAME,
   EXAMPLE_PASSWORD,
   EXAMPLE_ROLE,
   EXAMPLE_TIME,
} from 'src/utils';

export class LoginUserReq {
   @ApiProperty({ example: EXAMPLE_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLE_PASSWORD })
   password: string;
}

export class LoginUserRes {
   @ApiProperty({
      example: {
         userId: EXAMPLE_ID,
         email: EXAMPLE_EMAIL,
         name: EXAMPLE_NAME,
         role: EXAMPLE_ROLE,
      },
   })
   user: {
      userId: number;
      email: string;
      name: string;
      role: string;
   };

   @ApiProperty({ example: 'User logged in' })
   message: string;
}

export class MeUserRes {
   @ApiProperty({ example: EXAMPLE_ID })
   userId: number;

   @ApiProperty({ example: EXAMPLE_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLE_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLE_ROLE })
   role: string;
}

export class UserFindByIdRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLE_NAME })
   name: string;
}

export class LogoutUserRes {
   @ApiProperty({ example: 'User logout!' })
   message: string;
}

export class SignupUserRes {
   @ApiProperty({ example: EXAMPLE_ID })
   id: number;

   @ApiProperty({ example: EXAMPLE_EMAIL })
   email: string;

   @ApiProperty({ example: EXAMPLE_NAME })
   name: string;

   @ApiProperty({ example: EXAMPLE_HASHED_PASSWORD })
   password: string;

   @ApiProperty({ example: EXAMPLE_ROLE })
   role: string;

   @ApiProperty({ example: EXAMPLE_TIME })
   created_at: string;

   @ApiProperty({ example: EXAMPLE_TIME })
   updated_at: string;
}
