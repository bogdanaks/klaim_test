import {
  Body,
  Controller,
  Delete,
  Post,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { LoginDTO, RegisterDTO } from "./auth.dto"
import { AuthService } from "./auth.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1"
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body(new ValidationPipe()) data: RegisterDTO): Promise<void> {
    await this.authService.register({
      email: data.email,
      password: data.password,
      fullname: data.fullname
    })
  }

  @Post("/login")
  login(
    @Body(new ValidationPipe()) data: LoginDTO
  ): Promise<{ token: string }> {
    return this.authService.login({
      email: data.email,
      password: data.password
    })
  }

  @Delete("/logout")
  logout(): Promise<void> {
    return this.authService.logout()
  }
}
