import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"

import { SessionService } from "../session/session.service"
import { User } from "../user/user.entity"
import { UserService } from "../user/user.service"

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private configService: ConfigService
  ) {}

  async register({
    email,
    password,
    fullname
  }: {
    email: string
    password: string
    fullname: string
  }): Promise<User> {
    const emailLow = email.toLowerCase()
    const hashPass = await bcrypt.hash(
      password,
      Number(this.configService.get("SALT_ROUNDS"))
    )

    return this.userService.createUser({ email: emailLow, hashPass, fullname })
  }

  async logout({ token }: { token: string }): Promise<void> {
    await this.sessionService.deleteUserSessionByToken(token)
  }

  async validateUser({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<any> {
    const user = await this.userService.getProfileBy({ email })
    if (!user) {
      this.logger.log(`User ${email} isn't exist`)
      throw new BadRequestException()
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) return null

    return {
      user_id: user.id,
      email: user.email
    }
  }
}
