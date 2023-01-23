import { Controller, Get, UseInterceptors } from "@nestjs/common"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { UserService } from "./user.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1"
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  getProfile(): { fullname: string; email: string } {
    return this.userService.getProfile()
  }
}
