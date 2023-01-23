import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
  register({
    email,
    password,
    fullname
  }: {
    email: string
    password: string
    fullname: string
  }): string {
    return "Hello World!"
  }

  login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      resolve({ token: "test token" })
    })
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}
