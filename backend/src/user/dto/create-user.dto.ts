import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{
    @ApiProperty({example:"MNP"})
    @IsString()
    user_name: string

    @ApiProperty({example:"mnp@admin.com"})
    @IsEmail()
    @IsNotEmpty()
    user_email:string

    @ApiProperty({example : "Welcome@123"})
    @IsStrongPassword()
    @IsNotEmpty()
    user_password: string
}

