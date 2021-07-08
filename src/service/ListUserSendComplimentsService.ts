import { Compliment } from '../model/Compliment'

export class ListUserSendComplimentsService {
  async execute (userId: string) {
    const compliments = await Compliment.find({
      where: {
        user_sender: userId
      }
    })

    return compliments
  }
}
