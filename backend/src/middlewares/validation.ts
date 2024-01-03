import { NextFunction, Request, Response } from "express"
import { User } from "../models/User";

export const validarUserId = (req: Request, res: Response, next: NextFunction) => {
    if(/^[0-9]+$/.test(req.params.id)){
        next();
    }else{
        res.status(422).json({ errors: 'Somente números!' });
    }
}