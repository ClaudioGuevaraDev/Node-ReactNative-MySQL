import { Router } from 'express'

import * as usersCtrl from '../controllers/users'
import * as middlewares from '../middlewares'

const router = Router()

router.get('/', [
    middlewares.validateToken
], usersCtrl.getAllUsers)

export default router