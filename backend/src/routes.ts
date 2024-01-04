import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import dbConfig from "./services/dbconfig";
import { authId, authProductQuery, authUserQuery } from "./middlewares/validation";
import { ProductController } from "./controllers/ProductController";

export const Routes = Router();
const usercontroller = new UserController(dbConfig);
const productcontroller = new ProductController(dbConfig);

Routes.get('/users', usercontroller.getAllUsers);
Routes.get('/user/:id', authId, usercontroller.getUserById);
Routes.delete('/user/delete/:id', authId, usercontroller.deleteUserById);
Routes.post('/user/insert/', authUserQuery, usercontroller.insertUser);
Routes.put('/user/update/:id/', authId, authUserQuery, usercontroller.updateUserById);

Routes.get('/products', productcontroller.getAllProducts);
Routes.get('/product/:id', authId, productcontroller.getProductById);
Routes.delete('/product/delete/:id', authId, productcontroller.deleteProductById);
Routes.post('/product/insert/', authProductQuery, productcontroller.insertProduct);
Routes.put('/product/update/:id', authId, authProductQuery, productcontroller.updateProductById);