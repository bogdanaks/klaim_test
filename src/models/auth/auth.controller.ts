import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common"
import { LocalAuthGuard } from "src/models/auth/local.auth.guard"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { RegisterDTO } from "./auth.dto"
import { AuthService } from "./auth.service"
import { AuthenticatedGuard } from "./authenticated.guard"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1"
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body(new ValidationPipe()) data: RegisterDTO): Promise<{}> {
    await this.authService.register({
      email: data.email,
      password: data.password,
      fullname: data.fullname
    })

    return {}
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Req() req): { token: string } {
    const sessionID = req.sessionID as string
    return {
      token: sessionID
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete("/logout")
  async logout(@Req() req): Promise<{}> {
    const token = req.query.token as string
    await this.authService.logout({ token })
    return {}
  }
}
