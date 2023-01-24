import { VersioningType } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { TypeormStore } from "connect-typeorm"
import * as session from "express-session"
import * as passport from "passport"

import { AppModule } from "./models/app/app.module"
import { SessionService } from "./models/session/session.service"

const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const dataSource = app.get<SessionService>(SessionService)

  app.enableCors({
    origin: "*"
  })

  app.enableVersioning({
    type: VersioningType.URI
  })
  app.setGlobalPrefix("api")

  app.use(
    session({
      secret: configService.get("SECRET_KEY"),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400
      }).connect(dataSource.sessionRepository)
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT)
}
bootstrap()
