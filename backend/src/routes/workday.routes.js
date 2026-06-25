import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { 
    getAllWorkDaysController,
    getWorkDayController,
    createWorkDayController,
    deleteWorkDayController,
    updateWorkDayController
 } from "../controllers/workday.controller.js";

const router = Router()

router.get('/', authMiddleware, getAllWorkDaysController)
router.get('/:id', authMiddleware, getWorkDayController)
router.post('/', authMiddleware, createWorkDayController)
router.delete('/:id', authMiddleware, deleteWorkDayController)
router.put('/:id', authMiddleware, updateWorkDayController)

export default router