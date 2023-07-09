import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './utils';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

      if (isPublic) {
         return true;
      }

      const request = context.switchToHttp().getRequest();

      return request.isAuthenticated();
   }
}
