import jwt from 'jsonwebtoken'
import responses from '../utils/responses'

export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return responses.unauthorized(res, "Token não fornecido")
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id

        next()
    } catch (error) {
        return responses.unauthorized(res, "Token inválido")
    }
}