import { Product } from "../models/Product";
import { ProductService } from "../services/ProductService";
import { Request, Response } from "express";

export class ProductController {

    private productService: ProductService;

    constructor(db_config: any){
        this.productService = new ProductService(db_config);

    }

    getAllProducts = async (req: Request, res: Response) => {
        const products: Product[] = ( await this.productService.getAllProducts() );
        if(products.length > 0){
            res.json(products);
        }else{
            res.json({error: 'Nenhum produto cadastrado!'})
        }
    };

    getProductById = async (req: Request, res: Response) => {   
        const product:Product[] = await this.productService.getProductById(req.body.product_id);
        if(product.length > 0){
            res.json(product);
        }else{
            res.json({error: 'Esse produto não existe!'});
        }
    }

    deleteProductById = async (req: Request, res: Response) => {
        const deletedProduct: boolean = await this.productService.deleteProductById(req.body.product_id);
        if(deletedProduct){
            res.json({ok: true})
        }else{
            res.json({error: 'Produto não encontrado, ou não existe!'});
        }
    }

    insertProduct = async (req: Request, res: Response) => {
        const insertedProduct: boolean = await this.productService.insertProduct(req.body);
        if(insertedProduct){
            res.json({ok: true});
        }else{
            res.json({error: 'Não foi possivel inserir esse produto!'});
        }
    }

    updateProductById = async (req: Request, res: Response) => {
        const updatedProduct: boolean = await this.productService.updateProductById(req.body.product_id, req.body);
        if(updatedProduct){
            res.json({ok: true});
        }else{
            res.json({error: 'Não foi possivel atualizar esse produto!'});
        }
    }
}
