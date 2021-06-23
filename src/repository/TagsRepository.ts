import { EntityRepository, Repository, DeepPartial } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Tag } from '../entity/Tag'

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  createWithUUID (entity: DeepPartial<Tag>) {
    entity.id = uuid()

    return this.create(entity)
  }
}
