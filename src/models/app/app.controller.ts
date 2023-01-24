import { Controller, Get, UseInterceptors } from "@nestjs/common"
import { ResponseInterceptor } from "src/common/response.interceptor"

import { AppService } from "./app.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1"
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/info")
  getInfo(): { info: string } {
    return {
      info: this.appService.getInfo()
    }
  }
}
