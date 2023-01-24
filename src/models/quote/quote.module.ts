import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SessionModule } from "../session/session.module"
import { QuoteController } from "./quote.controller"
import { Quote } from "./quote.entity"
import { QuoteService } from "./quote.service"

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), ConfigModule, SessionModule],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
