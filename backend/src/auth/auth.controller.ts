import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtAuthGuard } from "./jwt-guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @ApiBearerAuth('access-token')
  @Post("refresh")
  refresh(@Req() req: any, @Body() dto: RefreshTokenDto) {
    return this.service.refreshTokens(req.user.userId, req.user.email, dto.refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post("logout")
  logout(@Req() req: any) {
    return this.service.logout(req.user.userId);
  }
}