import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


export class UserController {

    private userService: UserService;

    constructor(db_config: any){
        this.userService = new UserService(db_config);

    }

    logout = (req: Request, res: Response) => {
        res.clearCookie('token')
        res.json({ ok: true, message: 'Logout bem-sucedido' });
    }

    getAllUsers = async (req: Request, res: Response) => {
        const users: User[] = ( await this.userService.getAllUsers() );
        if(users.length > 0){
            
            res.json(users.map(({ user_id, password, ...user }) => user));
        }else{
            res.json({error: 'Nenhum usuário cadastrado!'})
        }
    };

    getUserById = async (req: Request, res: Response) => {   
        const user:User[] = await this.userService.getUserById(req.body.user_id);
        if(user.length > 0){
            res.json(user.map(({ user_id, password, ...user }) => user));
        }else{
            res.json({error: 'Esse usuário não existe!'});
        }
    }

    deleteUserById = async (req: Request, res: Response) => {
        const deletedUser: boolean = await this.userService.deleteUserById(req.body.user_id);
        if(deletedUser){
            res.json({ok: true})
        }else{
            res.json({error: 'Usuário não encontrado, ou não existe!'});
        }
    }

    insertUser = async (req: Request, res: Response) => {
        const userData: User = req.body;
        //userData.password = await bcrypt.hash(userData.password, 10);
        const insertedUser: boolean = await this.userService.insertUser(userData);
        
        const user_id: number = await this.userService.getUserIdByUsername(req.body.username);
        if(insertedUser){
            const token = jwt.sign({user_id: user_id}, 'user_id', {expiresIn: '1d'});
            res.json({ok: true, token});
        }else{
            res.json({error: 'Não foi possivel inserir esse usuário!'});
        }
    }

    updateUserById = async (req: Request, res: Response) => {
        const updatedUser: boolean = await this.userService.updateUserById(req.body.user_id, req.body);
        if(updatedUser){
            res.json({ok: true});
        }else{
            res.json({error: 'Não foi possivel atualizar esse usuário!'});
        }
    }
}
