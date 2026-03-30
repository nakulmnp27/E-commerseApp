import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartItemRepository {
  constructor(private prisma: PrismaService) {}

  findByCartAndProduct(cartId: string, productId: string, includeDeleted = false) {
    if (includeDeleted) {
      return this.prisma.cartItem.findFirst({
        where: { cartId, productId }
      });
    }

    return this.prisma.cartItem.findFirst({
      where: { cartId, productId, is_deleted: false }
    });
  }

  create(cartId: string, productId: string, quantity: number) {
    return this.prisma.cartItem.create({
        data: { cartId, productId, quantity }
    });
  }

  restoreItem(id: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id },
      data: { is_deleted: false, quantity }
    });
  }

  updateQuantity(id: string, quantity: number) {
    return this.prisma.cartItem.update({
        where: { id, is_deleted:false },
        data: { quantity }
    });
  }

  findall(cartId: string){
    return this.prisma.cartItem.findMany({
      where:{cartId, is_deleted:false},
      include:{
        product:true
      },
      orderBy: {
        created_at: "asc"
      }
    })
  }

  softDelete(id: string) {
    return this.prisma.cartItem.update({
        where: { id },
        data: { is_deleted: true }
    });
  }
}