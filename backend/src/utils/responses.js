function ok(res, data){
    return res.status(200).json(data)
}

function created(res, data){
    return res.status(201).json(data)
}

function badRequest(res, message){
    return res.status(400).json({message})
}

function unauthorized(res, message){
    return res.status(401).json({message})
}

function notFound(res, message){
    return res.status(404).json({message})
}

function conflict(res, message){
    return res.status(409).json({message})
}

function internalError(res, message="Erro interno"){
    return res.status(500).json({message})
}


export default{
    ok,
    created,
    badRequest,
    unauthorized,
    notFound,
    conflict,
    internalError
}