import { Injectable } from "@nestjs/common"

@Injectable()
export class UserService {
  getProfile(): { fullname: string; email: string } {
    return { fullname: "Test", email: "Test" }
  }
}
