import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsInt, Min,} from "class-validator";

export class UpdateCartItemDto {

    @ApiProperty({example:"product-uuid"})
    @IsUUID()
    productId: string;

    @ApiProperty({example:"1"})
    @IsInt()
    @Min(1)
    quantity: number;
}
