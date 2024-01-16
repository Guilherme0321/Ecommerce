import { NextFunction, Request, Response } from "express"
import { authName } from "../utils/utils";

export const authProductQuery = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, images, price, stock, categories } = req.body;
    if(name !== undefined && description !== undefined && images !== undefined && price !== undefined && stock !== undefined && categories !== undefined){
            const isValidName: boolean =             authName(name.toString());
            const isValidDescription: boolean =      description.toString().length >= 50;
            const isValidImages: boolean =           images.toString().split(',').length > 0;
            const isValidPrice: boolean =            parseFloat(price.toString()) > 0;
            const isValidCategories: boolean =       categories.toString().split(',').length > 0;            
            const isValidStock: boolean =            parseInt(stock.toString()) >= 0;
            if(!isValidName) res.json({
                error: `Nome invalido!`,
                details: 'Nome deve ter apenas letras!'
            });
            else if(!isValidDescription) res.json({
                error: `Description invalida!`,
                details: 'A descrição deve ter pelo menos 50 caracteres!'
            })
            else if(!isValidImages) res.json({
                error: `Imagem invalida!`,
                details: 'Deve haver pelo menos uma imagem!'
            })
            else if(!isValidPrice) res.json({
                error: `Preço invalido!`,
                details: 'Preço deve ser maior que 0!'
            })
            else if(!isValidCategories) res.json({
                error: `Categoria invalida`,
                details: 'Deve haver ao menos uma categoria'
            })
            else if(!isValidStock) res.json({
                error: `Quantidade de estoque invalida!`,
                details: 'Quantidade de estoque deve ser maior ou igual a 0'
            })
            else{
                next();
            }
    }else {
        res.json({error: 'Os atributos "name", "description", "images", "price", "stock", "categories" não podem ser nulos!'})
    }
}