import { Request, Response, NextFunction} from "express";

export async function authorize(req: Request, res: Response, next: NextFunction){
    if(!req.user){
        return res.status(401).send({message: "Authentication is required"})
    }

    if(req.user.role !== 'admin' && req.user.role !== 'manager'){
        return res.status(404).send({message: "Not Found!"})
    }
    next()
}