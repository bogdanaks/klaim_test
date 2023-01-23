import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common"
import { LocalAuthGuard } from "src/models/auth/local.auth.guard"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { delay } from "src/common/utils"
import { AuthorService } from "./author.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1",
  path: "author"
})
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getAuthor(): Promise<{
    authorId: number
    name: string
  }> {
    const author = await this.authorService.getRandomAuthor()

    await delay(5000)

    return {
      authorId: author.id,
      name: author.name
    }
  }
}
