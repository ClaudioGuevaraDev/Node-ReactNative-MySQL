import { Router } from 'express'

import * as authCtrl from '../controllers/auth'
import * as middlewares from '../middlewares'

const router = Router()

router.post('/sign-up', [
    middlewares.usernameHandler,
    middlewares.emailHandler
], authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)

export default router