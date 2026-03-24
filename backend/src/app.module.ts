import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HealthModule } from './health/health.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'
import { CartModule } from './cart/cart.module'
import { CartItemModule } from './cartItem/cartItem.module'
import { AuthModule } from './auth/auth.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    HealthModule,

    ProductModule,
    UserModule,
    CartModule,
    CartItemModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}