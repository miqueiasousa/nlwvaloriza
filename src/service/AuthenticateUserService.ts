import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { User } from '../model/User'
import { Unauthorized } from '../core/ApiError'

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateRequest) {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Unauthorized('Bad Credentials')
    }

    const isPasswordSame = await compare(password, user.password)

    if (!isPasswordSame) {
      throw new Unauthorized('Bad Credentials')
    }

    const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    const token = sign({
      sub: user.id,
      exp: expiresIn
    }, 'DOGECOIN')

    return { user, token }
  }
}
