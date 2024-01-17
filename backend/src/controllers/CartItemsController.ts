import { Request, Response } from "express"
import { CartItemService } from "../services/CartItemService";
export class CartItemController {

    private cartItemService: CartItemService;

    constructor(db_config: any){
        this.cartItemService = new CartItemService(db_config);
    }

    deleteCartItemById = async (req: Request, res: Response) => {                
        const deletedCartItem: boolean = await this.cartItemService.deleteCartItemById(req.body);
        if(deletedCartItem){
            res.json({ok: true})
        }else{
            res.json({ok: false, error: 'CartItem não encontrado, ou não existe!'});
        }
    }

    insertCartItem = async (req: Request, res: Response) => {
        const insertedCartItem: boolean = await this.cartItemService.insertCartItem(req.body);
        if(insertedCartItem){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: 'Não foi possivel inserir esse cartItem!'});
        }
    }

    updateCartItemById = async (req: Request, res: Response) => {
        const updatedCartItem: boolean = await this.cartItemService.updateCartItemById(req.body.cartItem_id, req.body);
        if(updatedCartItem){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: 'Não foi possivel atualizar esse cartItem!'});
        }
    }
}