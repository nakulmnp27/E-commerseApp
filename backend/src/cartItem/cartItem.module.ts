import { Module } from "@nestjs/common";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";
import { CartItemRepository } from "./cartItem.repository";
import { CartModule } from "src/cart/cart.module";


@Module({
  imports: [CartModule],
  controllers: [CartItemController],
  providers: [CartItemService, CartItemRepository],
})
export class CartItemModule {}

