import { getCustomRepository } from 'typeorm'
import { hash } from 'bcrypt'

import { UsersRepository } from '../repository/UsersRepository'
import { Conflict } from '../core/ApiError'

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, password, admin = false }: IUserRequest) {
    const SALT_ROUNDS = 8

    const usersRepository = getCustomRepository(UsersRepository)

    const isUserAlreadyExists = !!await usersRepository.findOne({ email })

    if (isUserAlreadyExists) {
      throw new Conflict()
    }

    const passwordHash = await hash(password, SALT_ROUNDS)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    })

    await usersRepository.save(user)

    return user
  }
}
