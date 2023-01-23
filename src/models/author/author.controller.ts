import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common"
import { JwtAuthGuard } from "src/common/jwt-auth.guard"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { AuthorService } from "./author.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1",
  path: "author"
})
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(): { authorId: number; name: string } {
    return this.authorService.getAuthor()
  }
}
