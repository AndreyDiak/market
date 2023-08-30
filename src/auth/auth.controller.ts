import { Body, Controller, Get, Header, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto, LoginUserRes, LogoutUserRes, SignupUserRes } from 'src/users/types';
import { UsersService } from 'src/users/users.service';
import { GetCurrentUser, GetCurrentUserId } from 'src/utils/decorators';
import { AuthService } from './auth.service';
import { RtGuard } from './guards/rt.guard';
import { Public } from './utils';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly userService: UsersService,
   ) {}

   @Public()
   @Post('/signup')
   @ApiOkResponse({ type: SignupUserRes })
   @Header('Content-type', 'application/json')
   async signupUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
   }

   @Public()
   @Post('/signin')
   @ApiBody({ type: LoginUserDto })
   @ApiOkResponse({ type: LoginUserRes })
   @Header('Content-type', 'application/json')
   async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      const token = await this.authService.login(body);

      res.cookie('access_token', token.accessToken, {
         httpOnly: true,
         expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
         path: '/',
         sameSite: 'none',
         secure: true,
         domain: 'localhost',
      });

      res.cookie('refresh_token', token.refreshToken, {
         httpOnly: true,
         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
         path: '/',
         sameSite: 'none',
         secure: true,
         domain: 'localhost',
      });

      return token;
   }

   @Public()
   // @UseGuards(RtGuard)
   @Post('/refresh')
   async refreshTokens(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
   ) {
      console.log('hello');
      return this.authService.refreshTokens(userId, refreshToken);
   }

   @Get('/signout')
   @ApiOkResponse({ type: LogoutUserRes })
   async logout(@Request() req) {
      return this.authService.logout(req);
   }
}
