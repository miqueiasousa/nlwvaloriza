import { EntityRepository, Repository, DeepPartial } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Compliment } from '../entity/Compliment'

@EntityRepository(Compliment)
export class ComplimentsRepository extends Repository<Compliment> {
  createAndGenUUID (entity: DeepPartial<Compliment>) {
    entity.id = uuid()

    return this.create(entity)
  }
}
