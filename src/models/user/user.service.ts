import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsWhere, Repository } from "typeorm"

import { User } from "./user.entity"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser({
    email,
    hashPass,
    fullname
  }: {
    email: string
    hashPass: string
    fullname: string
  }): Promise<User> {
    return await this.userRepository.save({
      password: hashPass,
      email,
      fullname
    })
  }

  getProfileBy(where: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOneBy(where)
  }
}
