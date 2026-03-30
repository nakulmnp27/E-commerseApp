import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaUserRepository } from "../user/user.repository";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

type TokenPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private repo: PrismaUserRepository,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.repo.findByEmail(dto.user_email);

    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }

    const isMatch = await bcrypt.compare(
      dto.user_password,
      user.user_password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload: TokenPayload = {
      sub: user.id,
      email: user.user_email
    };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>("JWT_SECRET"),
      expiresIn: (this.config.get<string>("JWT_EXPIRES_IN") || "15m") as any
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: (this.config.get<string>("JWT_REFRESH_EXPIRES_IN") || "7d") as any
    });

    const hashedRt = await bcrypt.hash(refreshToken, 10);
    await this.repo.update(payload.sub, { hash_refresh_token: hashedRt });

    return {
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshTokens(userId: string, email: string, refreshToken: string) {
    const user = await this.repo.findById(userId);
    const storedHashedRefreshToken = (user as any)?.hash_refresh_token as
      | string
      | null
      | undefined;

    if (!user || !storedHashedRefreshToken) {
      throw new UnauthorizedException("Access denied");
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      storedHashedRefreshToken
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException("Access denied");
    }

    const payload: TokenPayload = { sub: userId, email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>("JWT_SECRET"),
      expiresIn: (this.config.get<string>("JWT_EXPIRES_IN") || "15m") as any
    });

    const newRefreshToken = this.jwt.sign(payload, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: (this.config.get<string>("JWT_REFRESH_EXPIRES_IN") || "7d") as any
    });

    const hashedRt = await bcrypt.hash(newRefreshToken, 10);
    await this.repo.update(payload.sub, { hash_refresh_token: hashedRt });

    return {
      message: "Token refreshed successfully",
      access_token: accessToken,
      refresh_token: newRefreshToken
    };
  }

  async logout(userId: string) {
    await this.repo.update(userId, { hash_refresh_token: null });
    return {
      message: "Logout successful"
    };
  }
}