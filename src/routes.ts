import { Router } from 'express'

import { CreateTagController } from './controller/CreateTagController'
import { CreateUserController } from './controller/CreateUserController'
import { AuthenticateUserController } from './controller/AuthenticateUserController'
import { CreateComplimentController } from './controller/CreateComplimentController'
import { ListTagsController } from './controller/ListTagsController'
import { ListUserSendComplimentsController } from './controller/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controller/ListUserReceiveComplimentsController'
import { ensureAdmin } from './middleware/ensureAdmin'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'
import { validation } from './middleware/validation'
import authenticateUserSchema from './schema/authenticate-user-schema.json'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listTagsController = new ListTagsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()

router.post('/', validation(authenticateUserSchema), authenticateUserController.handle)

router.get('/tags', listTagsController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)

router.get('/user/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/user/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)

router.post('/users', ensureAuthenticated, ensureAdmin, createUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

export { router }
