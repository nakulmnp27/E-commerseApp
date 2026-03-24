import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaUserRepository } from "./user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService{
    constructor(private readonly repo:PrismaUserRepository){}

    async create(dto:CreateUserDto){
        const existing = await this.repo.findByEmail(dto.user_email)

        if(existing){
            throw new ConflictException("User Already exisits")
        }
        const hashedPassword = await bcrypt.hash(dto.user_password, 10)
        const User = await this.repo.create({
            ...dto,
        user_password:hashedPassword})

        return {
            message: "User created Sucessfully",
            data: {
                id: User.id,
                user_name: User.user_name,
                user_email: User.user_email,
                created_at: User.created_at,
                updated_at: User.updated_at,
            }
        }
    }

    async update (id:string, dto:UpdateUserDto){
        const exisiting = await this.repo.findById(id)
        
        if(!exisiting){
            throw new NotFoundException("User Id not found")
        }

        if (dto.user_email && dto.user_email !== exisiting.user_email) {
            const usermail = await this.repo.findByEmail(dto.user_email)
            if (usermail && usermail.id !== id) {
                throw new ConflictException("Email already in use")
            }
        }

        if (dto.user_password) {
            dto.user_password = await bcrypt.hash(dto.user_password, 10)
        }

        const updated = await this.repo.update(id, dto)

        return {
            message:"User Updated Successfully",
            data: {
                id: updated.id,
                user_name: updated.user_name,
                user_email: updated.user_email,
                created_at: updated.created_at,
                updated_at: updated.updated_at,
            }
        }
    }

    async findAll(){
        const users = await this.repo.findAll()

        return {
            message: "Users fetched successfully",
            data: users,
        }
    }

    async softdelete(id:string){
        const exisiting = await this.repo.findById(id)

        if(!exisiting){
            throw new NotFoundException("User Not found")
        }

        const deleted = await this.repo.softdelete(id)
        return {
            message : "User deleted successfully",
            data: deleted
        }
    }

    async findById(id: string) {
        const user = await this.repo.findById(id)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return {
                id: user.id,
                user_name: user.user_name,
                user_email: user.user_email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }
    }
    
}