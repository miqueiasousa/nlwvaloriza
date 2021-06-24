import { Router } from 'express'

import { CreateTagController } from './controller/CreateTagController'
import { CreateUserController } from './controller/CreateUserController'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { ensureAdmin } from './middleware/ensureAdmin'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()

router.post('/', authenticateUserController.handle)
router.post('/users', ensureAdmin, createUserController.handle)
router.post('/tags', createTagController.handle)

export { router }
