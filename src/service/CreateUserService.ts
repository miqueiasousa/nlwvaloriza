import { getCustomRepository } from 'typeorm'
import { hash } from 'bcrypt'

import { UsersRepository } from '../repository/UsersRepository'

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, password, admin }: IUserRequest) {
    const SALT_ROUNDS = 8

    const usersRepository = getCustomRepository(UsersRepository)
    const isUserAlreadyExists = !!await usersRepository.findOne({ email })

    if (isUserAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, SALT_ROUNDS)

    const user = usersRepository.createWithUUID({
      name,
      email,
      password: passwordHash,
      admin
    })

    await usersRepository.save(user)

    return user
  }
}
