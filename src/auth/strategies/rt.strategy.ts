import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { CONSTANTS } from 'src/utils/constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: CONSTANTS.JWT_REFRESH_SECRET,
         passReqToCallback: true,
      });
   }

   validate(req: Request, payload: any) {
      const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
      return { ...payload, refreshToken };
   }
}
