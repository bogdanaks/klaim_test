import { Injectable } from "@nestjs/common"

@Injectable()
export class QuoteService {
  getQuote(): {
    authorId: number
    quoteId: number
    quote: string
  } {
    return {
      authorId: 1,
      quoteId: 1,
      quote: "A day without laughter is a day wasted."
    }
  }
}
