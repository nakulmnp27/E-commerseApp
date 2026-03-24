import { User } from "@prisma/client"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

export type UserPublic = {
    id: string
    user_name: string
    user_email: string
    created_at: Date
    updated_at: Date
}

export interface UserRepository{
    create(data: CreateUserDto): Promise<User>
    findAll(): Promise<UserPublic[]>
    findById(id:string):Promise<User | null>
    findByEmail(user_name:string):Promise<User | null>
    update(id:string, data:UpdateUserDto):Promise<User>
    softdelete(id:string,):Promise<User>
}

@Injectable()
export class PrismaUserRepository implements UserRepository{
    constructor (private readonly prisma:PrismaService){}

    create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({data})
    }
    update(id: string, data: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where:{id, is_deleted:false},
            data
        })
    }
    findById(id: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where:{id, is_deleted:false}
        })
    }

    findAll(): Promise<UserPublic[]> {
        return this.prisma.user.findMany({
            where: {
                is_deleted:false
            },
            select: {
                id: true,
                user_name: true,
                user_email: true,
                created_at: true,
                updated_at: true
            }
        })
    }

    findByEmail(user_email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where:{user_email, is_deleted:false}
        })
    }
    
    softdelete(id: string): Promise<User> {
        return this.prisma.user.update({
            where:{id},
            data:{is_deleted:true}
        })
    }

}