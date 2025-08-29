import {Request, Response, NextFunction} from "express"
import ErrorExtension from "../utils/ErrorExtensions"

const httpErrorMiddleware =  (err:Error, req: Request, res: Response, next: NextFunction)=>{
    const { status, message} = err as ErrorExtension; //as ErrorExtension pra forçar o compilador a acreditar que err também pode ter um status.sso não cria nem altera o objeto — só “engana” o TypeScript.

    res.status(status || 500).json({message})
}

export default httpErrorMiddleware
