import { NextFunction, Request, Response } from "express";
import { CartItem } from "../models/CartItem";

export const isValidCartItem = (req: Request, res: Response, next: NextFunction) => {
    const { user_id, product_id, quantity } : CartItem = req.body;
    if(user_id !== undefined && product_id !== undefined && quantity !== undefined) {
        try {
            next();
        } catch (error) {
            res.json(error);
        }
    } else {
        res.json({ok: false, error: 'user_id, product_id, quantiy não podem ser nulos!'})
    }
}