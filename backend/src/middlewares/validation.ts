import { NextFunction, Request, Response } from "express"
import { authAddress, authEmail, authName, isJustNumbers } from "../utils/utils";

export const authId = (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        res.json({error: 'Nenhum parametro <id> foi passado em ...user/<id>'})
    } else if(isJustNumbers(req.params.id)){
        next();
    }else{
        res.status(422).json({ errors: 'Somente números!' });
    }
}

export const authUserQuery = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.name !== undefined && req.query.address !== undefined && req.query.email !== undefined && req.query.username !== undefined && req.query.password !== undefined){
        if(authAddress(req.query.address.toString().split(',')) && authEmail(req.query.email.toString()) && authName(req.query.name.toString())){
            next();
        }else{
            res.json({error: 'User invalido!'})
        }

    }else {
        res.json({error: 'Os atributos "name", "email", "address", "username", "password" não podem ser nulos!'})
    }
}

export const authProductQuery = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.name !== undefined && req.query.description !== undefined && req.query.images !== undefined && req.query.price !== undefined && req.query.stock !== undefined && req.query.categories !== undefined){
            const isValidName: boolean =             authName(req.query.name.toString());
            const isValidDescription: boolean =      req.query.description.toString().length >= 50;
            const isValidImages: boolean =           req.query.images.toString().split(',').length > 0;
            const isValidPrice: boolean =            parseFloat(req.query.price.toString()) > 0;
            const isValidCategories: boolean =       req.query.categories.toString().split(',').length > 0;            
            const isValidStock: boolean =            parseInt(req.query.stock.toString()) >= 0;
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