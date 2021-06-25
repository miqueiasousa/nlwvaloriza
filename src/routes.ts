import { Router } from 'express'

import { CreateTagController } from './controller/CreateTagController'
import { CreateUserController } from './controller/CreateUserController'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { ensureAdmin } from './middleware/ensureAdmin'
import { CreateComplimentController } from './controller/CreateComplimentController'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

router.post('/', authenticateUserController.handle)
router.post('/users', ensureAdmin, createUserController.handle)
router.post('/tags', createTagController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }
