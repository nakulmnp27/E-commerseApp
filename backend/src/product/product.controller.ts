  import {Controller,Get,Post,Patch, Delete, Param, Body, ParseIntPipe, UseGuards} from '@nestjs/common'
  import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'



  @ApiTags('Product')
  @Controller('Product')
  export class ProductController {
    constructor(private readonly service: ProductService) {}

    @Post()
    @ApiOperation({ summary: 'Create Product' })
    create(@Body() dto: CreateProductDto) {
      return this.service.create(dto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    findAll() {
      return this.service.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get products by id' })
    findById(@Param('id') id: string) {
      return this.service.findById(id)
    }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Product' })
    update(
      @Param('id') id: string,
      @Body() dto: UpdateProductDto
  ) {
      return this.service.update(id, dto)
    }

    @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
    delete(@Param('id') id:string) {
      return this.service.delete(id) 
    }
  }