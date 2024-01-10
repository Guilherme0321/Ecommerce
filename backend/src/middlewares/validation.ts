import { NextFunction, Request, Response } from "express"
import { authAddress, authEmail, authName, isJustNumbers } from "../utils/utils";
import { UserService } from "../services/UserService";
import dbConfig from "../services/dbconfig";

const userService: UserService = new UserService(dbConfig);

export const authId = (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        res.json({error: 'Nenhum parametro <id> foi passado em ...user/<id>'})
    } else if(isJustNumbers(req.params.id)){
        next();
    }else{
        res.status(422).json({ errors: 'Somente números!' });
    }
}

export const authUserName = async (req: Request, res: Response) => {
    if(req.body.username !== undefined){
        if(await userService.validUserName(req.body.username?.toString())){
            res.json({ok: true});
        }else{
            res.json({error: `${req.body.username} já existe!`});
        }
    }else {
        res.json({error: 'UserName é nulo!'});
    }
}

export const authUser = async (req: Request, res: Response) => {
    if(req.body.username !== undefined && req.body.password !== undefined){
        const user = await userService.validUser(req.body.username.toString(), req.body.password.toString());
        if(user !== undefined){
            res.json(user);
        }else{
            res.json({error: `Nome de usuário ou senha são invalidos!`});
        }
    }else {
        res.json({error: 'Nome de usuario ou senha são nulo!'});
    }
}

export const authUserQuery = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.name !== undefined && req.body.address !== undefined && req.body.email !== undefined && req.body.username !== undefined && req.body.password !== undefined){
        const isValidAddress: boolean = authAddress(req.body.address.toString().split(','));
        const isValidEmail: boolean = authEmail(req.body.email.toString());
        const isValidName: boolean = authName(req.body.name.toString());
        const isValidUsername: boolean = await userService.validUserName(req.body.username.toString());

        if(!isValidAddress) res.json({error:'Endereço invalido!', details:'O endereço deve ser Rua, Número, Cidade'});
        else if(!isValidEmail) res.json({error:'Email invalido!'});
        else if(!isValidName) res.json({error:'Nome invalido!', details:'Não pode haver números no nome!'});
        else if(!isValidUsername) res.json({error:'Já existe um usuário com esse username!'})
        else next();
        

    }else {
        res.json({error: 'Os atributos "name", "email", "address", "username", "password" não podem ser nulos e "username" não pode se repetir!'})
    }
}

export const authProductQuery = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.name !== undefined && req.body.description !== undefined && req.body.images !== undefined && req.body.price !== undefined && req.body.stock !== undefined && req.body.categories !== undefined){
            const isValidName: boolean =             authName(req.body.name.toString());
            const isValidDescription: boolean =      req.body.description.toString().length >= 50;
            const isValidImages: boolean =           req.body.images.toString().split(',').length > 0;
            const isValidPrice: boolean =            parseFloat(req.body.price.toString()) > 0;
            const isValidCategories: boolean =       req.body.categories.toString().split(',').length > 0;            
            const isValidStock: boolean =            parseInt(req.body.stock.toString()) >= 0;
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