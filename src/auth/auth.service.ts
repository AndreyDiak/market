import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, MeUserRes } from 'src/users/types';
import { UsersService } from 'src/users/users.service';
import { CONSTANTS } from 'src/utils/constants';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

   async validate(email: string, password: string): Promise<MeUserRes> {
      const user = await this.usersService.findOne({ email });

      if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

      if (user && isPasswordValid) {
         return {
            userId: user.id,
            email,
         };
      }

      return null;
   }

   async login(loginUserDto: LoginUserDto) {
      console.log({ loginUserDto });
      const user = await this.validate(loginUserDto.email, loginUserDto.password);

      const tokens = await this.getTokens(user.userId, user.email);

      await this.updateRefreshToken(user.userId, tokens.refreshToken);

      return tokens;
   }

   async logout(userId: number) {
      return this.usersService.update(
         {
            id: userId,
         },
         {
            refreshToken: null,
         },
      );
   }

   // обновляем токен
   async refreshTokens(userId: number, refreshToken: string) {
      const user = await this.usersService.findOne({ id: userId });

      if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied.');

      const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);

      if (!rtMatches) throw new ForbiddenException('Access Denied.');

      const tokens = await this.getTokens(userId, user.email);

      await this.updateRefreshToken(userId, refreshToken);

      return tokens;
   }

   async updateRefreshToken(userId: number, refreshToken: string) {
      const hashedRefreshToken = await this.hashData(refreshToken);
      await this.usersService.update(
         { id: userId },
         {
            refreshToken: hashedRefreshToken,
         },
      );
   }

   async hashData(data: string) {
      return bcrypt.hash(data, CONSTANTS.HASH_SALT);
   }

   async getTokens(userId: number, email: string) {
      const payload = {
         userId,
         email,
      };

      const [at, rt] = await Promise.all([
         this.jwtService.signAsync(payload, {
            secret: CONSTANTS.JWT_ACCESS_SECRET,
            expiresIn: '15m',
         }),
         this.jwtService.signAsync(payload, {
            secret: CONSTANTS.JWT_REFRESH_SECRET,
            expiresIn: '7d',
         }),
      ]);

      return {
         accessToken: at,
         refreshToken: rt,
      };
   }
}
