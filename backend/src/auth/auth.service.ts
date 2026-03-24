import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaUserRepository } from "../user/user.repository";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private repo: PrismaUserRepository,
    private jwt: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.repo.findByEmail(dto.user_email);
    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }
    const isMatch = await bcrypt.compare( dto.user_password,user.user_password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = {
      sub: user.id,
      email: user.user_email
    };

    const token = this.jwt.sign(payload);

    return {
      message: "Login successful",
      access_token: token
    };
  }
}