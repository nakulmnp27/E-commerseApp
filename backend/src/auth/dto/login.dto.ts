import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {

  @ApiProperty({example:"mnp@admin.com"})
  @IsEmail()
  user_email: string;

  @ApiProperty({example:"Welcome@123"})
  @IsString()
  user_password: string;
}