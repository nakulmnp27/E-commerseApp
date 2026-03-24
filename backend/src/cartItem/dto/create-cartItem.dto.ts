import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, Min, IsNotEmpty } from "class-validator";

export class createCartDto {
    @ApiProperty({example:"product-uuid"})
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({example:"1"})
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity?: number;
}