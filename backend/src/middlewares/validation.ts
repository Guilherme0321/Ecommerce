import { NextFunction, Request, Response } from "express"
import { authAddress, authEmail, authName, isJustNumbers } from "../utils/utils";
import { UserService } from "../services/UserService";
import dbConfig from "../services/dbconfig";

const userService: UserService = new UserService(dbConfig);

export const authId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    if(!id){
        res.json({error: 'Nenhum parametro <id> foi passado em ...user'})
    } else if(isJustNumbers(id)){
        next();
    }else{
        res.status(422).json({ errors: 'Somente números!' });
    }
}

export const authUserName = async (req: Request, res: Response) => {
    const { username } = req.body;
    if(username !== undefined){
        if(await userService.validUserName(username?.toString())){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: `${username} já existe!`});
        }
    }else {
        res.json({error: 'UserName é nulo!'});
    }
}

export const authUserEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    if(email !== undefined){        
        if(await userService.validEmail(email?.toString())){
            res.json({ok: true});
        }else{
            res.json({ok: false, error: `${email} já existe!`});
        }
    }else {
        res.json({error: 'Email é nulo!'});
    }
}

export const authUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(username !== undefined && password !== undefined){
        const user = await userService.validUser(username.toString(), password.toString());
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
    const { name, address, email, username, password } = req.body;
    if(name !== undefined && address !== undefined && email !== undefined && username !== undefined && password !== undefined){
        const isValidAddress: boolean = authAddress(address.toString().split(','));
        const isValidEmail: boolean = authEmail(email.toString());
        const isValidName: boolean = authName(name.toString());
        const isValidUsername: boolean = await userService.validUserName(username.toString());
        const isUniqueEmail: boolean = await userService.validEmail(email.toString());

        if(!isValidAddress) res.json({error:'Endereço invalido!', details:'O endereço deve ser Rua, Número, Cidade'});
        else if(!isValidEmail) res.json({error:'Email invalido!'});
        else if(!isValidName) res.json({error:'Nome invalido!', details:'Não pode haver números no nome!'});
        else if(!isValidUsername) res.json({error:'Já existe um usuário com esse username!'});
        else if(!isUniqueEmail) res.json({error:'Já existe um usuário com esse email!'});
        else next();
        

    }else {
        res.json({error: 'Os atributos "name", "email", "address", "username", "password" não podem ser nulos e "username" não pode se repetir!'})
    }
}

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