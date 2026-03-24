import { Controller, Get, Param, UseGuards, Req } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-guard";

@ApiTags('cart')
@Controller("cart")

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  getCart(@Req() req){
    return this.service.getCart(req.userId);
  }
}