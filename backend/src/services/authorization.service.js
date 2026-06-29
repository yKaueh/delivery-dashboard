import pool from "../config/database.js";
import responses from "../utils/responses.js";

export async function userOwnsWorkDay(userId, workDayId) {
    const [rows] = await pool.query(`
        SELECT id
        FROM workdays
        WHERE id = ? AND user_id = ?
        `, [workDayId, userId])
    
    return rows.length > 0
}

export async function userOwnsWorkPeriod(userId, workPeriodId) {
    const [rows] = await pool.query(`
        SELECT wp.id
        FROM workperiods wp
        JOIN workdays wd
        ON wd.id = wp.workday_id
        WHERE
            wp.id = ?
        AND wd.user_id = ?
        `, [workPeriodId, userId])

        return rows.length > 0
}