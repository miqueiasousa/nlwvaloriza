import { getCustomRepository } from 'typeorm'

import { UsersRepository } from '../repository/UsersRepository'

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)
    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = usersRepository.createWithUUID({ name, email, admin })

    await usersRepository.save(user)

    return user
  }
}
