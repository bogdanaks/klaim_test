import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Session } from "./session.entity"

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    public sessionRepository: Repository<Session>
  ) {}

  getUserSessionByToken(token: string): Promise<Session> {
    return this.sessionRepository.findOne({ where: { id: token } })
  }

  async deleteUserSessionByToken(token: string): Promise<void> {
    await this.sessionRepository.delete({ id: token })
  }
}
