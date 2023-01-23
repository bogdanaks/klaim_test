import { Controller, Get, UseInterceptors } from "@nestjs/common"
import { ResponseInterceptor } from "src/common/response.interceptor"
import { QuoteService } from "./quote.service"

@UseInterceptors(ResponseInterceptor)
@Controller({
  version: "1",
  path: "quote"
})
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getQuote(): {
    authorId: number
    quoteId: number
    quote: string
  } {
    return this.quoteService.getQuote()
  }
}
