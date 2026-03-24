import { Cart } from "@prisma/client";
import { CreateCartDto } from "./dto/create-cart.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export interface CartRepository {
  create(data: CreateCartDto): Promise<Cart>;
  findByUserId(userId: string): Promise<Cart | null>;
}


@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCartDto): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  findByUserId(userId: string): Promise<Cart | null> {
    return this.prisma.cart.findFirst({
      where: {user_id: userId, is_deleted: false },
    });
  }
}