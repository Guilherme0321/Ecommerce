import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import dbConfig from "./services/dbconfig";

export const Routes = Router();
const service = new UserController(dbConfig);

Routes.get('/users', service.getAllUsers);
Routes.get('/user/:id', service.getUserById);
