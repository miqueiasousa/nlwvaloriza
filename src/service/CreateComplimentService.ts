import { Compliment } from '../model/Compliment'
import { Tag } from '../model/Tag'
import { User } from '../model/User'
import { BadRequest, NotFound } from '../core/ApiError'

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

export class CreateComplimentService {
  async execute ({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    if (user_sender === user_receiver) {
      throw new BadRequest()
    }

    const isTagExists = !!await Tag.findOne(tag_id)
    const isUserReceiverExists = !!await User.findOne(user_receiver)

    if (!isTagExists || !isUserReceiverExists) {
      throw new NotFound()
    }

    const compliment = new Compliment()

    Object.assign(compliment, { tag_id, user_sender, user_receiver, message })

    await compliment.save()

    return compliment
  }
}
