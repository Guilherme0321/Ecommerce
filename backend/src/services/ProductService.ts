import { PoolClient, Pool, QueryResult } from "pg";
import { Product } from "../models/Product";
import dbConfig from "./dbconfig";

export class ProductService {

    private pool: Pool;

    constructor(dbconfig: any){
        this.pool = new Pool(dbconfig);
    }
    private async executeQuery(query: string, values?: any[]): Promise<QueryResult> {
        let client: PoolClient | undefined;
        try {
            client = await this.pool.connect();
            return await client.query(query, values);
        } finally {
            if (client) client.release();
        }
    }
    /**
     * Recupera todos os produtos da tabela "products" no banco de dados.
     * @returns Promise<Product[]> Um array de objetos do tipo Product.
     */
    public async getAllProducts (): Promise<Product[]> {
        return (await this.executeQuery('SELECT * FROM products', [])).rows.flat();
    }
    /**
     * Recupera um produto específico com base no ID fornecido da tabela "products" no banco de dados.
     * @param productId - O ID do produto a ser recuperado.
     * @returns Promise<Product> Um objeto do tipo Product correspondente ao ID fornecido.
     */
    public async getProductById (product_id: number | string): Promise<Product> {
        return (await this.executeQuery('SELECT name, description, images, price, stock, categories FROM products WHERE product_id = $1', [product_id])).rows[0];
    }
    /**
     * Atualiza as informações de um produto específico com base no ID fornecido na tabela "products" no banco de dados.
     * @param productId - O ID do produto a ser atualizado.
     * @param newProduct - Um objeto contendo as propriedades do produto a serem atualizadas.
     * @returns Promise<boolean> Um booleano indicando se a atualização foi bem-sucedida ou não.
     */
    public async updateProductById (productId: number | string, newProduct: Partial<Product>): Promise<boolean> {
        return (await this.executeQuery(`UPDATE products SET description = $1, images = $2, price = $3, stock = $4, categories = $5, name = $6 WHERE product_id = $7`,
        [
            newProduct.description, newProduct.images, newProduct.price, newProduct.stock, newProduct.categories, newProduct.name, productId
        ])).rowCount !== 0;
    }
    /**
     * Exclui um produto específico com base no ID fornecido da tabela "products" no banco de dados.
     * @param productId - O ID do produto a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteProductById (productId: number | string): Promise<boolean> {
        return (await this.executeQuery('DELETE FROM products WHERE product_id = $1', [productId])).rowCount !== 0;
    }
    /**
     * Insere um novo produto na tabela "products" no banco de dados.
     * @param product - Um objeto contendo as propriedades do novo produto a ser inserido.
     * @returns Promise<boolean> Um booleano indicando se a inserção foi bem-sucedida ou não.
     */
    public async insertProduct (product: Partial<Product>): Promise<boolean> {
        return (await this.executeQuery(`INSERT INTO products (name, description, images, price, stock, categories)
        VALUES ($1, $2, $3, $4, $5, $6)`, 
        [
            product.name, product.description, product.images, product.price, product.stock, product.categories,
        ])).rowCount !== 0;
    }
}
