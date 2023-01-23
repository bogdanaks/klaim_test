import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common"
import { AuthUserType } from "src/common/interfaces"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { AuthUser } from "src/common/user.decorator"

import { UserService } from "./user.service"
import { AuthenticatedGuard } from "../auth/authenticated.guard"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1"
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get("/profile")
  async getProfile(@AuthUser() data: AuthUserType): Promise<{
    fullname: string
    email: string
  }> {
    const user = await this.userService.getProfileBy({ id: data.user_id })
    return {
      fullname: user.fullname,
      email: user.email
    }
  }
}
