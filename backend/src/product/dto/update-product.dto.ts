import { IsInt, Min, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto{

@ApiProperty({example:"Riding Jacket", required:false})
@IsString()
@MaxLength(50)
@IsOptional()
prod_name?: string

@ApiProperty({example: "Leather and black colour",required:false})
@IsString()
@IsOptional()
prod_description? : string

@ApiProperty({example: "Axor",required:false})
@IsString()
@MaxLength(50)
@IsOptional()
prod_brand?:string

@ApiProperty({example: 1500,required:false})
@IsInt()
@IsOptional()
@Min(1)
prod_price?: number
} 