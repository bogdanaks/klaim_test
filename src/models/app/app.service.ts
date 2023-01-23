import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getInfo(): string {
    return "Some information about the <b>company</b>."
  }
}
