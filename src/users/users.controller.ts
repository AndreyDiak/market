import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { exclude, getSelectedFields } from 'src/utils';
import { MeUserRes } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly userService: UsersService) {}

   @Get('/me')
   @ApiOkResponse({ type: MeUserRes })
   async me(@Request() req) {
      const id = (req.user as MeUserRes).userId;
      const user = await this.userService.findOne({ id });
      return exclude(user, ['password']);
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
}
