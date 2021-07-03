import { getCustomRepository } from 'typeorm'

import { TagsRepository } from '../repository/TagsRepository'
import { BadRequest } from '../core/ApiError'

export class CreateTagService {
  async execute (name: string) {
    const tagsRepository = getCustomRepository(TagsRepository)

    const isTagAlreadyExists = !!await tagsRepository.findOne({ name })

    if (isTagAlreadyExists) {
      throw new BadRequest()
    }

    const tag = tagsRepository.create({ name })

    await tagsRepository.save(tag)

    return tag
  }
}
