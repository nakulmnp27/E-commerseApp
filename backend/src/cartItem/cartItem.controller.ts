import { Body, Controller, Delete, Param, Patch, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CartItemService } from "./cartItem.service";
import { UpdateCartItemDto } from "./dto/update-cartItem.dto";
import { JwtAuthGuard } from "src/auth/jwt-guard";

@ApiTags('Cart Item')
@Controller('cart-item')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CartItemController {
  constructor(private readonly service: CartItemService) {}

  @Patch("update")
  updateItem(
    @Req() req,
    @Body() dto: UpdateCartItemDto
  ) {
    return this.service.updateQuantity(req.user.userId, dto);
  }

  @Delete("remove/:productId")
  removeItem(
    @Req() req,
    @Param("productId") productId: string
  ) {
    return this.service.removeItem(req.user.userId, productId);
  }
}
