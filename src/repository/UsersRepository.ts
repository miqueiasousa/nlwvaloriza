import { EntityRepository, Repository, DeepPartial } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { User } from '../entity/User'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createAndGenUUID (entity: DeepPartial<User>) {
    entity.id = uuid()

    return this.create(entity)
  }
}
