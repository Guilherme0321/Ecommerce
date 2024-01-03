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
            res.json(users);
        }else{
            res.json({error: 'Nenhum usuário cadastrado!'})
        }
    };

    getUserById = async (req: Request, res: Response) => {   
        const user:User[] = await this.userService.getUserById(req.params.id)
        if(user.length > 0){
            res.json(user);
        }else{
            res.json({error: 'Esse usuário não existe!'})
        }
    }
}
