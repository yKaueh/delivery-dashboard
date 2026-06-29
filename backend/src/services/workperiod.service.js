import pool from "../config/database.js";
import { userOwnsWorkDay, userOwnsWorkPeriod } from "./authorization.service.js";

export async function createWorkPeriodService(userId, workday_id, start_time, end_time) {
    if(!(userOwnsWorkDay(userId, workday_id))){
        return null
    }

    const [result] = await pool.query(`
        INSERT INTO workperiods
        (workday_id, start_time, end_time)
        VALUES (?, ?, ?)
        `, [workday_id, start_time, end_time])

    return {
        workday_id,
        start_time,
        end_time
    }
}
export async function deleteWorkPeriodService(userId, id) {
    if(!(await userOwnsWorkPeriod(userId, id))){
        return null
    }

    const [result] = await pool.query("DELETE FROM workperiods WHERE id = ?", [id])

    if(result.affectedRows === 0){
        return null
    }

    return true
}