import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {

    private userService: UserService;

    constructor(db_config: any){
        this.userService = new UserService(db_config);

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
        const user:User[] = await this.userService.getUserById(req.body.id);
        if(user.length > 0){
            res.json(user.map(({ user_id, password, ...user }) => user));
        }else{
            res.json({error: 'Esse usuário não existe!'});
        }
    }

    deleteUserById = async (req: Request, res: Response) => {
        const deletedUser: boolean = await this.userService.deleteUserById(req.body.id);
        if(deletedUser){
            res.json({ok: true})
        }else{
            res.json({error: 'Usuário não encontrado, ou não existe!'});
        }
    }

    insertUser = async (req: Request, res: Response) => {
        const insertedUser: boolean = await this.userService.insertUser(req.body);
        if(insertedUser){
            res.json({ok: true});
        }else{
            res.json({error: 'Não foi possivel inserir esse usuário!'});
        }
    }

    updateUserById = async (req: Request, res: Response) => {
        const updatedUser: boolean = await this.userService.updateUserById(req.body.id, req.body);
        if(updatedUser){
            res.json({ok: true});
        }else{
            res.json({error: 'Não foi possivel atualizar esse usuário!'});
        }
    }
}
