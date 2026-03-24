import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaCartRepository } from "./cart.repository";

@Injectable()
export class CartService {
  constructor(private repo: PrismaCartRepository) {}

  async getCart(userId: string) {
    const cart = await this.repo.findByUserId(userId);

    if (!cart) {
      return {
        message: "Cart is empty",
        data: null
      };
    }

    return {
      message: "Cart fetched successfully",
      data: cart
    };
  }

  async getOrCreateCart(userId: string) {
    let cart = await this.repo.findByUserId(userId);

    if (!cart) {
      cart = await this.repo.create({ user_id: userId });
    }

    return cart;
  }
}