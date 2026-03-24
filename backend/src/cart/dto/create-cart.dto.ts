import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @ApiProperty({example:"uuid of the user"})
    @IsUUID()
    @IsNotEmpty()
    user_id: string;
}