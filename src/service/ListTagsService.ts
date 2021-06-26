import { getCustomRepository } from 'typeorm'

import { TagsRepository } from '../repository/TagsRepository'

export class ListTagsService {
  async execute () {
    const tagsRepository = getCustomRepository(TagsRepository)

    const tags = await tagsRepository.find()

    return tags
  }
}
