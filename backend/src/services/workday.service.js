import pool from "../config/database.js"

export async function getAllWorkDaysService(userId) {
    const [rows] = await pool.query("SELECT * FROM workdays WHERE user_id = ?", [userId])

    return rows
}

export async function getWorkDayService(userId, id) {
    const [rows] = await pool.query("SELECT * FROM workdays WHERE user_id = ? AND id = ?", [userId, id])

    return rows[0] || null
}

export async function createWorkDayService(userId, date, tips, kilometers, weather_conditions, rating, notes, vehicle_type) {
    const [result] = await pool.query(`
        INSERT INTO workdays
        (user_id, date, tips, kilometers, weather_conditions, rating, notes, vehicle_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [userId, date, tips, kilometers, weather_conditions, rating, notes, vehicle_type])

    return {
        id: result.insertId,
        date,
        tips,
        kilometers,
        weather_conditions,
        rating,
        notes,
        vehicle_type
    }
}

export async function deleteWorkDayService(userId, id) {
    const [result] = await pool.query("DELETE FROM workdays WHERE user_id = ? AND id = ?", [userId, id])

    if(result.affectedRows === 0){
        return null
    }

    return true
}

export async function updateWorkDayService(userId, id, date, tips, kilometers, weather_conditions, rating, notes, vehicle_type) {
    const [result] = await pool.query(`
        UPDATE workdays
        SET
        date = ?,
        tips = ?,
        kilometers = ?,
        weather_conditions = ?,
        rating = ?,
        notes = ?,
        vehicle_type = ?
        WHERE user_id = ? AND id = ?
        `, [date, tips, kilometers, weather_conditions, rating, notes, vehicle_type, userId, id])

    if(result.affectedRows === 0){
        return null
    }

    return {
            id,
            date,
            tips,
            kilometers,
            weather_conditions,
            rating,
            notes,
            vehicle_type
        }
}