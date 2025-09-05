import {Request, Response, NextFunction} from "express"

import Auth from "../utils/Auth"

const AutenticateMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
    const tolken = req.headers.authorization || "" //o tolken vem na requisição no cabeçalho que esta dentro de authorization
    const auth = new Auth()
    auth.AuthenticateToken(tolken)

    next()
}

export default AutenticateMiddleware