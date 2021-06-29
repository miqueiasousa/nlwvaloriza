import { getCustomRepository } from 'typeorm'

import { TagsRepository } from '../repository/TagsRepository'

export class CreateTagService {
  async execute (name: string) {
    const tagsRepository = getCustomRepository(TagsRepository)

    const isTagAlreadyExists = !!await tagsRepository.findOne({ name })

    if (isTagAlreadyExists) {
      throw new Error('Tag already exists')
    }

    const tag = tagsRepository.createAndGenUUID({ name })

    await tagsRepository.save(tag)

    return tag
  }
}
