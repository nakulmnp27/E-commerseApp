  import {Controller,Get,Post,Patch, Delete, Param, Body, ParseIntPipe, UseGuards} from '@nestjs/common'
  import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'




  @ApiTags('User')
  @Controller('User')
  export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create User' })
    create(@Body() dto: CreateUserDto) {
      return this.service.create(dto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
      return this.service.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get users by id' })
    findById(@Param('id') id: string) {
      return this.service.findById(id)
    }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update User details' })
    update(
      @Param('id') id: string,
      @Body() dto: UpdateUserDto
  ) {
      return this.service.update(id, dto)
    }

    @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
    delete(@Param('id') id:string) {
      return this.service.softdelete(id) 
    }
  }