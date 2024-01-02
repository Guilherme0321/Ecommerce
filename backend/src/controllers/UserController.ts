import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {

    private userService: UserService;

    constructor(db_config: any){
        this.userService = new UserService(db_config);

    }

    private justNum = (x: string): boolean => {
        return /^[0-9]+$/.test(x);;
    }

    getAllUsers = async (req: Request, res: Response) => {
        res.json( await this.userService.getAllUsers() );
    };

    getUserById = async (req: Request, res: Response) => {
        if(this.justNum(req.params.id)){
            res.json(await this.userService.getUserById(req.params.id));
        }else{
            res.json({error: 'Somente números'})
        }
    }
}
