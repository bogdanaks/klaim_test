import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "../auth/auth.module"
import { AuthorModule } from "../author/author.module"
import { QuoteModule } from "../quote/quote.module"
import { SessionModule } from "../session/session.module"
import { UserModule } from "../user/user.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("PG_HOST"),
        port: configService.get("PG_PORT"),
        username: configService.get("PG_USER"),
        password: configService.get("PG_PASSWORD"),
        database: configService.get("PG_DATABASE"),
        synchronize: false,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    AuthorModule,
    QuoteModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
