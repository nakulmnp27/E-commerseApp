
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaProductRepository } from "./product.repository";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService{
    constructor (private readonly repo:PrismaProductRepository){}

    async create(dto:CreateProductDto){
        const existing = await this.repo.findByName(dto.prod_name)

        if(existing){
            throw new ConflictException("product already exists")
        }
        const product= await this.repo.create(dto)
        return {
            message:"Product created Successfully",
            data: product
        }
    }

    async update(id: string, dto: UpdateProductDto) {
    const existing = await this.repo.findById(id)

    if (!existing) {
        throw new NotFoundException('Product not found')
    }

    const updated = await this.repo.update(id, dto)

    return {
        message: 'Product updated successfully',
        data: updated
    }
    }

    findAll() {
        return this.repo.findAll()
    }

    async delete(id:string){
        const existing = await this.repo.findById(id)

        if(!existing){
            throw new NotFoundException("Product Not Found")
        }
       return this.repo.softdelete(id)
    }

    async findById(id: string) {
    const product = await this.repo.findById(id)

    if (!product) {
        throw new NotFoundException('Product not found')
    }

    return product
}

}