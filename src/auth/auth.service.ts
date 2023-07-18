import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoggedUserDto } from './dto/logged-user.dto';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService) {}

   async validate(email: string, password: string): Promise<LoggedUserDto> {
      const user = await this.usersService.findOne({ email });

      if (!user) {
         throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const { name, role } = user;

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      if (user && isPasswordValid) {
         return {
            userId: user.id,
            email,
            name,
            role,
         };
      }

      return null;
   }

   async login(user: LoggedUserDto) {
      return {
         user,
         message: 'User logged in',
      };
   }

   async logout(req: any) {
      req.session.destroy();
      return {
         message: 'User logout!',
      };
   }
}
