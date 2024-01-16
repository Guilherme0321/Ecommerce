import { Order } from "../models/Order";
import { OrderService } from "../services/OrderService";
import { Request, Response } from "express"
export class OrderController {

    private orderService: OrderService;

    constructor(db_config: any){
        this.orderService = new OrderService(db_config);
    }

    deleteOrderById = async (req: Request, res: Response) => {        
        const deletedOrder: boolean = await this.orderService.deleteOrderById(req.body.order_id);
        if(deletedOrder){
            res.json({ok: true})
        }else{
            res.json({ok: false, error: 'Order não encontrado, ou não existe!'});
        }
    }

    insertOrder = async (req: Request, res: Response) => {
        const insertedOrder: boolean = await this.orderService.insertOrder(req.body);
        if(insertedOrder){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: 'Não foi possivel inserir esse order!'});
        }
    }

    updateOrderById = async (req: Request, res: Response) => {
        const updatedOrder: boolean = await this.orderService.updateOrderById(req.body.order_id, req.body);
        if(updatedOrder){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: 'Não foi possivel atualizar esse order!'});
        }
    }
}