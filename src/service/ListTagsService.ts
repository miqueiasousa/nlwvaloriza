import { Tag } from '../model/Tag'

export class ListTagsService {
  async execute () {
    const tags = await Tag.find()

    return tags
  }
}
