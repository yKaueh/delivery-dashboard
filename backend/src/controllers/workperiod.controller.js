import { 
    createWorkPeriodService, 
    deleteWorkPeriodService
 } from "../services/workperiod.service.js";
import responses from "../utils/responses.js";

export async function createWorkPeriodController(req, res) {
    try {
        const { userId } = req
        const {
                workday_id,
                start_time,
                end_time
            } = req.body

        const workDayId = Number(workday_id)
        const cleanStartTime = start_time?.trim()
        const cleanEndTime = end_time?.trim()

        if(Number.isNaN(workDayId) || workDayId <= 0){
            return responses.badRequest(res, "ID inválido")
        }

        if(!cleanStartTime || !cleanEndTime){
            return responses.badRequest(res, "Dados inválidos")
        }
        
        const workperiod = await createWorkPeriodService(userId, workDayId, cleanStartTime, cleanEndTime)

        if(!workperiod){
            return responses.notFound(res, "Dia não encontrado")
        }

        return responses.created(res, workperiod)
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function deleteWorkPeriodController(req, res) {
    try {
        const { userId } = req
        const { id } = req.params

        const workPeriodId = Number(id)

        if(Number.isNaN(workPeriodId)){
            return responses.badRequest(res, "ID inválido")
        }

        const deleted = await deleteWorkPeriodService(userId, workPeriodId)

        if(!deleted){
            return responses.notFound(res, "Período não encontrado")
        }

        return responses.ok(res, "Período deletado")
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}