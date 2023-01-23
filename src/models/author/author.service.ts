import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthorService {
  getAuthor(): { authorId: number; name: string } {
    return { authorId: 1, name: "Charlie Chaplin" }
  }
}
