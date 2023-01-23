import { BadRequestException, Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config"

import { User } from "../user/user.entity"
import { UserService } from "../user/user.service"
import { SessionService } from "../session/session.service"

@Injectable()
export class AuthService {
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
