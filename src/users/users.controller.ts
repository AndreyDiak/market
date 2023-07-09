import {
   Body,
   Controller,
   Get,
   Header,
   HttpCode,
   HttpStatus,
   Param,
   ParseIntPipe,
   Post,
   Request,
   UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Public } from 'src/auth/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginUserReq, LoginUserRes, LogoutUserRes, MeUserRes, SignupUserRes } from './types';
import { getSelectedFields } from 'src/utils';

@Controller('users')
export class UsersController {
   constructor(
      private readonly userService: UsersService,
      private readonly authService: AuthService,
   ) {}

   @Post('/signup')
   @ApiOkResponse({ type: SignupUserRes })
   @Public()
   @HttpCode(HttpStatus.CREATED)
   @Header('Content-type', 'application/json')
   async signupUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
   }

   @Post('/login')
   @ApiBody({ type: LoginUserReq })
   @ApiOkResponse({ type: LoginUserRes })
   @Public()
   @UseGuards(LocalAuthGuard)
   @HttpCode(HttpStatus.OK)
   @Header('Content-type', 'application/json')
   async login(@Request() req) {
      return this.authService.login(req.user);
   }

   @Get('/me')
   @ApiOkResponse({ type: MeUserRes })
   async me(@Request() req) {
      const id = req.user.userId;
      return this.userService.findOne({ id });
   }

   @Get('/:id')
   async findById(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(
         {
            id,
         },
         getSelectedFields(['id', 'name', 'email']),
      );
   }

   @Get('/logout')
   @ApiOkResponse({ type: LogoutUserRes })
   @Public()
   async logout(@Request() req) {
      return this.authService.logout(req);
   }
}
