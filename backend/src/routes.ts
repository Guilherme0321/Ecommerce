import { Router } from "express";
import { UserController } from "./controllers/UserController";
import dbConfig from "./services/dbconfig";
import { validarUserId } from "./middlewares/validation";

export const Routes = Router();
const service = new UserController(dbConfig);

Routes.get('/users', service.getAllUsers);
Routes.get('/user/:id', validarUserId, service.getUserById);

