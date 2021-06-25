import { Router } from 'express'

import { CreateTagController } from './controller/CreateTagController'
import { CreateUserController } from './controller/CreateUserController'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { CreateComplimentController } from './controller/CreateComplimentController'
import { ensureAdmin } from './middleware/ensureAdmin'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

router.post('/', authenticateUserController.handle)

router.use(ensureAuthenticated)

router.post('/users', ensureAdmin, createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }
