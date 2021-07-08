import { Tag } from '../model/Tag'
import { Conflict } from '../core/ApiError'

export class CreateTagService {
  async execute (name: string) {
    const isTagAlreadyExists = !!await Tag.findOne({ name })

    if (isTagAlreadyExists) {
      throw new Conflict()
    }

    const tag = new Tag()

    tag.name = name

    await tag.save()

    return tag
  }
}
