import {Request, Response, NextFunction} from "express"
import ErrorExtension from "../utils/ErrorExtensions"

const httpErrorMiddleware =  (err:Error, req: Request, res: Response, next: NextFunction)=>{
    const { status, message} = err as ErrorExtension;

    res.status(status || 500).json({message})
}

export default httpErrorMiddleware
