import { IsString, IsEmail, MaxLength } from "class-validator"

export class RegisterDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string

  @IsString()
  @MaxLength(255)
  password: string

  @IsString()
  @MaxLength(255)
  fullname: string
}

export class LoginDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string

  @IsString()
  @MaxLength(255)
  password: string
}
