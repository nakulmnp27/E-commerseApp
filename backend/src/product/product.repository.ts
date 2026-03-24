import { PrismaService } from '../prisma/prisma.service'
import { Product } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

export interface ProductRepository{
    create(data: CreateProductDto): Promise<Product>
    findAll(): Promise<Product[]>
    findById(id:string):Promise<Product | null>
    findByName(prod_name:string):Promise<Product | null>
    update(id:string, data:UpdateProductDto):Promise<Product>
    softdelete(id:string,):Promise<Product>
}

@Injectable()
export class PrismaProductRepository implements ProductRepository{
    constructor(private readonly prisma:PrismaService){}

    create(data: CreateProductDto): Promise<Product> {
        return this.prisma.product.create({data})
    }

    update(id: string, data: UpdateProductDto): Promise<Product> {
        return this.prisma.product.update({
            where : {id, is_deleted:false},
            data
        })
    }

    findById(id: string): Promise<Product | null> {
        return this.prisma.product.findFirst({
            where:{id, is_deleted:false},
        })
    }

    findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({
            where:{is_deleted:false}
        })
    }
    
    findByName(prod_name: string): Promise<Product | null> {
        return this.prisma.product.findFirst({
            where:{prod_name, is_deleted:false}
        })
    }
    softdelete(id: string): Promise<Product> {
        return this.prisma.product.update({
            where:{id},
            data:{is_deleted:true}
        })
    }
}