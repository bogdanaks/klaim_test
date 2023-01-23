import { IsString } from "class-validator"

export class GetQuoteDTO {
  @IsString()
  authorId: string
}
