import { registerService, loginService } from "../services/auth.service.js"
import responses from "../utils/responses.js"


export async function registerController(req, res) {
    try {
        const {email, name, password} = req.body
        const cleanEmail = (email?? "").trim().toLowerCase()
        const cleanName = username?.trim()
        const cleanPassword = password?.trim()
        
        if(!cleanEmail || !cleanName || !cleanPassword){
            return responses.badRequest(res, "Campos obrigatórios")
        }

        if(!cleanEmail.includes("@")){
            return responses.badRequest(res, "Email inválido")
        }

        if(cleanEmail.length > 255){
            return responses.badRequest(res, "Email longo demais")
        }

        if(cleanName.length > 50){
            return responses.badRequest(res, "Nome longo demais")
        }

        if(cleanPassword.length < 8){
            return responses.badRequest(res, "Senha muito curta")
        }

        const user = await registerService(cleanEmail, cleanName, cleanPassword)

        if(!user){
            return responses.conflict(res, "Email já cadastrado")
        }

        return responses.created(res, user)

    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function loginController(req, res) {
    try {
        const {email, password} = req.body
        const cleanEmail = (email ?? "").trim().toLowerCase()
        const cleanPassword = password?.trim()

        if(!cleanEmail || !cleanPassword){
            return responses.badRequest(res, "Campos obrigatórios")
        }

        if(!cleanEmail.includes("@")){
            return responses.badRequest(res, "Email inválido")
        }

        const authData = await loginService(cleanEmail, cleanPassword)

        if(!authData){
            return responses.unauthorized(res, "Email ou senha inválidos")
        }

        return responses.ok(res, authData)

    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
    
}