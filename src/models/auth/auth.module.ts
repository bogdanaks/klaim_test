import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { SessionModule } from "../session/session.module"

import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { LocalStrategy } from "./local.strategy"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [
    UserModule,
    ConfigModule,
    SessionModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
