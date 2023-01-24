import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Session } from "./session.entity"
import { SessionService } from "./session.service"

@Module({
  imports: [TypeOrmModule.forFeature([Session]), ConfigModule],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
