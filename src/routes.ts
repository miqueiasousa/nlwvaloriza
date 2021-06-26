import { Router } from 'express'

import { CreateTagController } from './controller/CreateTagController'
import { CreateUserController } from './controller/CreateUserController'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { CreateComplimentController } from './controller/CreateComplimentController'
import { ListTagsController } from './controller/ListTagsController'
import { ListUserSendComplimentsController } from './controller/ListUserSendComplimentsController'
import { ensureAdmin } from './middleware/ensureAdmin'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listTagsController = new ListTagsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()

router.post('/', authenticateUserController.handle)

router.get('/tags', listTagsController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)

router.get('/user/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)

router.use(ensureAuthenticated)

router.post('/users', ensureAdmin, createUserController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }
