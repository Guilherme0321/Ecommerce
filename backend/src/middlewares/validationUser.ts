import { NextFunction, Request, Response } from "express"
import { authAddress, authEmail, authName, isJustNumbers } from "../utils/utils";
import { UserService } from "../services/UserService";
import dbConfig from "../services/dbconfig";
import * as jwt from 'jsonwebtoken';

const userService: UserService = new UserService(dbConfig);

export const authId = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;
    if(!user_id){
        res.json({error: 'Nenhum parametro <user_id> foi passado em ...user'})
    } else if(isJustNumbers(user_id)){
        next();
    }else{
        res.status(422).json({ errors: 'Somente números!' });
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acesso não autorizado' });
    try {
        jwt.verify(token, 'user_id', (err, decoded) => {
            req.body.user_id = decoded.user_id;
            
            next();
        });        
    } catch (error) {
        res.json({erro: 'Token inválido!'})
    }
};

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
    if(username && password){
        const user = await userService.validUser(username.toString(), password.toString());
        if(user){
            const token = jwt.sign({user_id: user.user_id}, 'user_id', {expiresIn: '1d'});            
            res.json({ok: true, token, username: req.body.username});
        }else{
            res.json({ok: false, error: `Nome de usuário ou senha são invalidos!`});
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

