import { User } from '../model/User'
import { BadRequest } from '../core/ApiError'

export class SetAUserAsAdminService {
  async execute (id: string) {
    const user = await User.findOne({ id })

    if (!user) {
      throw new BadRequest()
    }

    user.admin = true

    await user.save()

    return user
  }
}
