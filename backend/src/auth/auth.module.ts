import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy, RefreshTokenStrategy } from './jwt-stratergy'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaUserRepository } from 'src/user/user.repository'

@Module({
  imports: [
    PassportModule,
    ConfigModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '15m') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy, PrismaService, PrismaUserRepository ]
})
export class AuthModule {}

