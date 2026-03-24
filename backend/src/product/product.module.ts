import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { PrismaProductRepository } from './product.repository'

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaProductRepository,
  ],
})
export class ProductModule {}