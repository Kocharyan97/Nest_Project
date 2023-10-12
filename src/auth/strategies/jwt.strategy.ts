import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'experiment',
    });
  }

  async validate(user: IUser) {
    return { id: user.id, email: user.email };
  }
}