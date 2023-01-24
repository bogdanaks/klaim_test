import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Quote } from "./quote.entity"

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) {}

  getQuoteByAuthorId(author_id: number): Promise<Quote> {
    return this.quoteRepository
      .createQueryBuilder("quote")
      .select()
      .where("quote.author_id = :author_id", { author_id })
      .orderBy("RANDOM()")
      .getOne()
  }
}
