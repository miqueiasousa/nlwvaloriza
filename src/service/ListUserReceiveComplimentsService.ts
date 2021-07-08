import { Compliment } from '../model/Compliment'

export class ListUserReceiveComplimentsService {
  async execute (userId: string) {
    const compliments = await Compliment.find({
      where: {
        user_receiver: userId
      }
    })

    return compliments
  }
}
