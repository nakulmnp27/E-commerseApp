import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

@ApiProperty({example:"Helmet"})
@IsString()
@MaxLength(50)
@IsNotEmpty()
prod_name: string

@ApiProperty({example: "black"})
@IsString()
prod_description : string

@ApiProperty({example: "SteelBird"})
@IsString()
@MaxLength(50)
prod_brand:string

@ApiProperty({example: 1200})
@IsInt()
@IsNotEmpty()
@Min(1)
prod_price : number
}
