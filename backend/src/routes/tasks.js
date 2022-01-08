import { Router } from 'express'

import * as tasksCtrl from '../controllers/tasks'
import * as middlewares from '../middlewares'

const router = Router()

router.post('/', [
    middlewares.validateToken
], tasksCtrl.createTask)
router.post('/get-all', [
    middlewares.validateToken
], tasksCtrl.getAllTasks)
router.get('/:id', [
    middlewares.validateToken
], tasksCtrl.getOneTask)
router.delete('/:id', [
    middlewares.validateToken
], tasksCtrl.deleteTask)
router.put('/:id', [
    middlewares.validateToken
], tasksCtrl.updateTask)

export default router