import { 
    getAllWorkDaysService,
    getWorkDayService,
    createWorkDayService,
    deleteWorkDayService,
    updateWorkDayService
 } from "../services/workday.service.js";
import responses from "../utils/responses.js";

export async function getAllWorkDaysController(req, res) {
    try {
        const { userId } = req

        const workdays = await getAllWorkDaysService(userId)

        return responses.ok(res, workdays)
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function getWorkDayController(req, res){
    try {
        const { userId } = req
        const { id } = req.params

        const workdayId = Number(id)

        if(Number.isNaN(workdayId) || workdayId <= 0){
            return responses.badRequest(res, "ID inválido")
        }

        const workday = await getWorkDayService(userId, workdayId)

        if(!workday){
            return responses.notFound(res, "Dia não encontrado")
        }

        return responses.ok(res, workday)
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function createWorkDayController(req, res) {
    try {
        const { userId } = req
        const {
            date,
            tips,
            kilometers,
            weather_conditions,
            rating,
            notes,
            vehicle_type
        } = req.body

        const cleanDate = date?.trim()
        const cleanWeatherConditions = weather_conditions?.trim()
        const cleanNotes = notes?.trim()
        const cleanVehicleType = vehicle_type?.trim()

        if(!cleanDate){
            return responses.badRequest(res, "Data obrigatória")
        }
        if(!cleanVehicleType){
            return responses.badRequest(res, "Veículo obrigatório")
        }

        const workday = await createWorkDayService(
            userId,
            cleanDate,
            tips,
            kilometers,
            cleanWeatherConditions,
            rating,
            cleanNotes,
            cleanVehicleType
        )

        return responses.created(res, workday)
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function deleteWorkDayController(req, res) {
    try {
        const { userId } = req
        const { id } = req.params

        const workdayId = Number(id)

        if(Number.isNaN(workdayId) || workdayId <= 0){
            return responses.badRequest(res, "ID inválido")
        }

        const deleted = await deleteWorkDayService(userId, workdayId)

        if(!deleted){
            return responses.notFound(res, "Dia não encontrado")
        }

        return responses.ok(res, "Dia deletado")    
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}

export async function updateWorkDayController(req, res) {
    try {
        const { userId } = req
        const { id } = req.params
        const {
            date,
            tips,
            kilometers,
            weather_conditions,
            rating,
            notes,
            vehicle_type
        } = req.body

        const workdayId = Number(id)

        if(Number.isNaN(workdayId) || workdayId <= 0){
            return responses.badRequest(res, "ID inválido")
        }

        const cleanDate = date?.trim()
        const cleanWeatherConditions = weather_conditions?.trim()
        const cleanNotes = notes?.trim()
        const cleanVehicleType = vehicle_type?.trim()

        if(!cleanDate){
            return responses.badRequest(res, "Data obrigatória")
        }
        if(!cleanVehicleType){
            return responses.badRequest(res, "Veículo obrigatório")
        }

        const updated = await updateWorkDayService(
            userId,
            workdayId,
            cleanDate,
            tips,
            kilometers,
            cleanWeatherConditions,
            rating,
            cleanNotes,
            cleanVehicleType
        )

        if(!updated){
            return responses.notFound(res, "Dia não encontrado")
        }

        return responses.ok(res, updated)
    } catch (error) {
        console.log(error)
        return responses.internalError(res)
    }
}