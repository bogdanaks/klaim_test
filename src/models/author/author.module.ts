import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SessionModule } from "../session/session.module"
import { AuthorController } from "./author.controller"
import { Author } from "./author.entity"
import { AuthorService } from "./author.service"

@Module({
  imports: [TypeOrmModule.forFeature([Author]), ConfigModule, SessionModule],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
