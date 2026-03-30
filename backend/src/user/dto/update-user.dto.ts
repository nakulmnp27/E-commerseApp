import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto{
    @ApiProperty({example:"MNP", required:false})
    @IsString()
    @IsOptional()
    user_name?: string

    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    user_email?: string

    @ApiProperty({example : "Welcome@123", required:false})
    @IsStrongPassword()
    @IsOptional()
    @IsNotEmpty()
    user_password?: string

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    hash_refresh_token?: string | null
}