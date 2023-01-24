import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthorController } from "./author.controller"
import { Author } from "./author.entity"
import { AuthorService } from "./author.service"

@Module({
  imports: [TypeOrmModule.forFeature([Author]), ConfigModule],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
