import { Router } from "express"
import pool from "../config/database.js"

const router = Router()

router.get('/', async(req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT NOW() AS currentTime"
        )

        res.json(rows)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: "Database error"
        })
    }
})

export default router