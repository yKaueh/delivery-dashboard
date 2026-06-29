import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { 
    createWorkPeriodController,
    deleteWorkPeriodController
 } from '../controllers/workperiod.controller.js'

const router = Router()

router.post('/', authMiddleware, createWorkPeriodController)
router.delete('/:id', authMiddleware, deleteWorkPeriodController)

export default router