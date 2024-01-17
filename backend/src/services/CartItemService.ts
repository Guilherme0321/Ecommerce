import { CartItem } from "../models/CartItem";
import { Pool, PoolClient, QueryResult } from 'pg';
import { ProductService } from "./ProductService";

export class CartItemService {
    private productService: ProductService;
    private pool: Pool;

    constructor(dbconfig: any){
        this.pool = new Pool(dbconfig);
        this.productService = new ProductService(dbconfig);
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
    private setProduct = async (cartItem: CartItem[]): Promise<CartItem[]> => {

        if(cartItem === undefined){
            return cartItem;
        }
        
        await Promise.all(cartItem.map(async (cart) => {
            if(cart.product_id !== undefined){
                cart.product = (await this.productService.getProductById(cart.product_id))[0];
                delete cart.product_id; // qualquer erro relacionado ao produto retirar isso
            }
        }));
        return cartItem.flat();
    }
    /**
     * Recupera todos os produtos da tabela "cartItems" no banco de dados.
     * @returns Promise<CartItem[]> Um array de objetos do tipo CartItem.
     */
    public async getAllCartItems (): Promise<CartItem[]> {
        return this.setProduct((await this.executeQuery('SELECT * FROM cart_items', [])).rows.flat());
    }
    /**
     * Recupera um produto específico com base no ID fornecido da tabela "cartItems" no banco de dados.
     * @param CartItemId - O ID do produto a ser recuperado.
     * @returns Promise<CartItem> Um objeto do tipo CartItem correspondente ao ID fornecido.
     */
    public async getCartItemByUserId (userId: number | string): Promise<CartItem[]> {
        return this.setProduct((await this.executeQuery('SELECT * FROM cart_items WHERE user_id = $1', [userId])).rows.flat());
    }
    /**
     * Atualiza as informações de um produto específico com base no ID fornecido na tabela "cartItems" no banco de dados.
     * @param CartItemId - O ID do produto a ser atualizado.
     * @param newCartItem - Um objeto contendo as propriedades do produto a serem atualizadas.
     * @returns Promise<boolean> Um booleano indicando se a atualização foi bem-sucedida ou não.
     */
    public async updateCartItemById (CartItemId: number | string, newCartItem: Partial<CartItem>): Promise<boolean> {
        return (await this.executeQuery(`UPDATE cart_items set user_id = $1, product_id = $2, quantity = $3 WHERE cart_item_id = $4`,
        [
            newCartItem.user_id, newCartItem.product_id, newCartItem.quantity, CartItemId
        ])).rowCount !== 0;
    }
    /**
     * Exclui um produto específico com base no ID fornecido da tabela "cartItems" no banco de dados.
     * @param CartItemId - O ID do produto a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteCartItemById (cartItem: CartItem): Promise<boolean> {        
        return (await this.executeQuery(`DELETE FROM cart_items WHERE cart_item_id = ( 
                SELECT cart_item_id FROM cart_items WHERE user_id = $1 AND product_id = $2 AND quantity = $3 LIMIT 1
            )
            
            `, [cartItem.user_id, cartItem.product_id, cartItem.quantity])).rowCount !== 0;
    }
    /**
     * Insere um novo produto na tabela "cartItems" no banco de dados.
     * @param cartItem - Um objeto contendo as propriedades do novo produto a ser inserido.
     * @returns Promise<boolean> Um booleano indicando se a inserção foi bem-sucedida ou não.
     */
    public async insertCartItem (cartItem: Partial<CartItem>): Promise<boolean> {
        return (await this.executeQuery(`
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, $3)`, 
        [
            cartItem.user_id, cartItem.product_id, cartItem.quantity,
        ])).rowCount !== 0;
    }
}
