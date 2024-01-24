import { NextFunction, Request, Response } from "express";

export const isValidInsertionOrder = (req: Request, res: Response, next: NextFunction) => {
    req.body.customer_id = req.body.user_id;
    const { customer_id, shipping_address, status } = req.body;
    if(customer_id === undefined) {
        res.json({ok: false, error: 'Id do usuário é nulo!'});
    }else if(shipping_address === undefined) {
        res.json({ok: false, error: 'Endereço é nulo!'})
    }else if(!['pending', 'paid', 'shipped', 'delivered'].includes(status)) {
        res.json({ok: false, error: 'status só pode ser pending or paid or shipped or delivered'});
    }else if(!status === undefined) {
        res.json({ok: false, error: 'status não pode ser nulo!'});
    }else {
        try {
            next();
        }catch(error) {
            res.json(error);
        }
    }
}

export const validOrderId = (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.body;    
    if(order_id === undefined) {
        res.json({ok: false, error: 'order_id não pode ser nulo!'});
    }else {
        try {
            next();
        }catch(error) {
            res.json(error);
        }
    }
    
}