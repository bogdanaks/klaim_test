import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Author } from "./author.entity"

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ) {}

  getRandomAuthor(): Promise<Author> {
    return this.authorRepository
      .createQueryBuilder("authors")
      .select()
      .orderBy("RANDOM()")
      .getOne()
  }
}
