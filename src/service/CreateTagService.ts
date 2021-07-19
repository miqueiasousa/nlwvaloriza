import { Tag } from '../model/Tag'
import { Conflict } from '../core/ApiError'

export class CreateTagService {
  async execute (name: string) {
    const isTagAlreadyExists = !!await Tag.findOne({ name })

    if (isTagAlreadyExists) {
      throw new Conflict()
    }

    const tag = new Tag()

    Object.assign(tag, { name })

    await tag.save()

    return tag
  }
}
