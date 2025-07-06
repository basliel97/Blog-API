import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../../application/users/queries/get-user-by-id.query';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_secret_key',
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('JWT Payload:', payload);
    const user = await this.queryBus.execute(new GetUserByIdQuery(payload.sub));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;  // attached to req.user
  }
}
