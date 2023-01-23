import { Module } from "@nestjs/common"
import { AuthModule } from "../auth/auth.module"
import { AuthorModule } from "../author/author.module"
import { QuoteModule } from "../quote/quote.module"
import { UserModule } from "../user/user.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [AuthModule, UserModule, AuthorModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
