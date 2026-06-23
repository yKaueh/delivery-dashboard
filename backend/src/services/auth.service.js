import pool from '../config/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

export async function registerService(email, name, password) {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email])

    if(rows.length > 0){
        return null
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return {
        id: result.insertId,
        name,
        email
    }
}

export async function loginService(email, password) {
    const [rows] = await pool.query(`
        SELECT id, name, email, password
        FROM users
        WHERE email = ?
        `, [email])

    const user = rows[0]

    if(!user){
        return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return null
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}