import { Global, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { AccessTokenStrategy } from './strategies/at.strategy';

@Global()
@Module({
   imports: [UsersModule, JwtModule.register({})],
   providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
   controllers: [AuthController],
})
export class AuthModule {}
