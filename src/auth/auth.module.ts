import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './authenticated.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
   imports: [UsersModule, PassportModule.register({ session: true })],
   providers: [
      AuthService,
      LocalStrategy,
      SessionSerializer,
      {
         provide: APP_GUARD,
         useClass: AuthenticatedGuard,
      },
   ],
   exports: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
