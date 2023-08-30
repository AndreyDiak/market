import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONSTANTS } from 'src/utils/constants';

type JwtPayload = {
   userId: string;
   email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: CONSTANTS.JWT_ACCESS_SECRET,
         usernameField: 'email',
      });
   }

   validate(payload: JwtPayload) {
      return payload;
   }
}
