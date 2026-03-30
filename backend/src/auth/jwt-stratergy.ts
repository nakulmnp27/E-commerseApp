import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config'
import type { StrategyOptionsWithRequest } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email
    };
  }
}


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(configService: ConfigService) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.refreshToken,
        (req) => req?.body?.refresh_token,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: configService.get<string>("JWT_REFRESH_SECRET")!,
      passReqToCallback: true
    };

    super(options);
  }

  async validate(req: any, payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken:
        req?.cookies?.refreshToken ??
        req?.body?.refresh_token ??
        req?.headers?.authorization?.replace("Bearer ", "")
    };
  }
}