import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

import { SessionService } from "../session/session.service"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = request.query.token

    if (!token) return false

    const userSession = await this.sessionService.getUserSessionByToken(token)
    if (!userSession) return false

    if (new Date(userSession.expiredAt).valueOf() >= new Date().valueOf()) {
      await this.sessionService.deleteUserSessionByToken(token)
      return false
    }

    request.user = JSON.parse(userSession.json).passport.user

    return true
  }
}
