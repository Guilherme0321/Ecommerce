import { Router } from "express";
import { UserController } from "./controllers/UserController";
import dbConfig from "./services/dbconfig";
import { authId, authUser, authUserName, authUserQuery, authUserEmail } from "./middlewares/validationUser";
import { ProductController } from "./controllers/ProductController";
import { OrderService } from "./services/OrderService";
import { authProductQuery } from "./middlewares/validationProduct";
import { OrderController } from "./controllers/OrderController";
import { isValidInsertionOrder, validOrderId } from "./middlewares/validationOrder";

export const Routes = Router();
const usercontroller = new UserController(dbConfig);
const productcontroller = new ProductController(dbConfig);
const orderController = new OrderController(dbConfig);

Routes.get('/users', usercontroller.getAllUsers);
Routes.get('/user/:id', authId, usercontroller.getUserById);
Routes.delete('/user/delete/:id', authId, usercontroller.deleteUserById);
Routes.post('/user/insert/', authUserQuery, usercontroller.insertUser);
Routes.put('/user/update/:id/', authId, authUserQuery, usercontroller.updateUserById);
Routes.post('/user/valid/username', authUserName);
Routes.post('/user/authenticate', authUser);
Routes.post('/user/valid/email', authUserEmail);

Routes.get('/products', productcontroller.getAllProducts);
Routes.get('/product/:id', authId, productcontroller.getProductById);
Routes.delete('/product', authId, productcontroller.deleteProductById);
Routes.post('/product', authProductQuery, productcontroller.insertProduct);
Routes.put('/product', authId, authProductQuery, productcontroller.updateProductById);

Routes.post('/orders', isValidInsertionOrder, orderController.insertOrder);
Routes.delete('/orders', validOrderId, orderController.deleteOrderById);