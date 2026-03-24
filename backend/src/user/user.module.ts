import { Module } from '@nestjs/common'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUserRepository } from './user.repository';


@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaUserRepository,
  ],
})
export class UserModule{}
