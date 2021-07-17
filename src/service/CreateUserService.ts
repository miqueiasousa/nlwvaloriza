import { hash } from 'bcrypt'

import { User } from '../model/User'
import { Conflict } from '../core/ApiError'

interface IUserRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute ({ name, email, password }: IUserRequest) {
    const SALT_ROUNDS = 8

    const isUserAlreadyExists = !!await User.findOne({ email })

    if (isUserAlreadyExists) {
      throw new Conflict()
    }

    const passwordHash = await hash(password, SALT_ROUNDS)

    const user = new User()

    user.name = name
    user.email = email
    user.password = passwordHash
    user.admin = false

    await user.save()

    return user
  }
}
