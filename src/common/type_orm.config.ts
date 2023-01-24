import { DataSource } from "typeorm"
import { ConfigService } from "@nestjs/config"
import { config } from "dotenv"
import { Author } from "../models/author/author.entity"
import { Quote } from "../models/quote/quote.entity"
import { Session } from "../models/session/session.entity"
import { User } from "../models/user/user.entity"
import { Init1674556899386 } from "../../migrations/1674556899386-init"

config()

const configService = new ConfigService()

export default new DataSource({
  type: "postgres",
  host: configService.get("PG_HOST"),
  port: configService.get("PG_PORT"),
  username: configService.get("PG_USER"),
  password: configService.get("PG_PASSWORD"),
  database: configService.get("PG_DATABASE"),
  entities: [Author, Quote, Session, User],
  migrations: [Init1674556899386]
})
