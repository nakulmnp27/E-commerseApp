import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { PrismaCartRepository } from "./cart.repository";

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaCartRepository],
  exports: [PrismaCartRepository],
})
export class CartModule {}

