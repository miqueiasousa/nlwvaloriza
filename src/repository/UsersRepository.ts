import { EntityRepository, Repository } from 'typeorm'

import { User } from '../entity/User'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
