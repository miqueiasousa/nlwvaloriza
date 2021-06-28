import { getCustomRepository } from 'typeorm'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { UsersRepository } from '../repository/UsersRepository'

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const isPasswordSame = await compare(password, user.password)

    if (!isPasswordSame) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign(
      {
        email: user.email
      },
      'DOGECOIN',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return { user, token }
  }
}
