import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaCartRepository } from "../cart/cart.repository";
import { CartItemRepository } from "./cartItem.repository";
import { UpdateCartItemDto } from "./dto/update-cartItem.dto";

@Injectable()
export class CartItemService {
  constructor(
    private cartRepo: PrismaCartRepository,
    private itemRepo: CartItemRepository
  ) {}

  async updateQuantity(userId: string, dto: UpdateCartItemDto) {
    if (!dto.productId || !dto.quantity) {
      throw new BadRequestException("productId and quantity are required");
    }
    let cart = await this.cartRepo.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepo.create({ user_id: userId });
    }

    const item = await this.itemRepo.findByCartAndProduct(
      cart.id,
      dto.productId
    );
    if (!item) {
      const existingItem = await this.itemRepo.findByCartAndProduct(
        cart.id,
        dto.productId,
        true
      );

      if (existingItem) {
        const restored = await this.itemRepo.restoreItem(
          existingItem.id,
          dto.quantity
        );
        return {
          message: "Item added to cart successfully",
          data: restored
        };
      }

        const created = await this.itemRepo.create(
            cart.id,
            dto.productId,
            dto.quantity
        );
        return {
            message: "Item added to cart successfully",
            data: created
        };
    }
    const updated = await this.itemRepo.updateQuantity(
      item.id,
      dto.quantity
    );

    return {
      message: "Quantity updated successfully",
      data: updated
    };
    }

  async removeItem(userId: string, productId: string) {
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) {
        throw new NotFoundException("Cart item not found");
    }
    const item = await this.itemRepo.findByCartAndProduct(
        cart.id,
        productId
    );
    if (!item) {
        throw new NotFoundException("Item not found in cart");
    }
    const deleted = await this.itemRepo.softDelete(item.id);
    return {
        message: "Item removed from cart",
        data: deleted
    };
    }

    async findAll(userId: string){
      const cart = await this.cartRepo.findByUserId(userId)

      if (!cart) {
        return []
      }

      return this.itemRepo.findall(cart.id)
    }
}