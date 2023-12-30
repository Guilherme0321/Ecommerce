import { CartItem } from "../models/CartItem";
import { Pool, PoolClient, QueryResult } from 'pg';
import db_config from "./dbconfig";
import { Product } from "../models/Product";

class CartItemService {

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
     * Recupera todos os produtos da tabela "cartItems" no banco de dados.
     * @returns Promise<CartItem[]> Um array de objetos do tipo CartItem.
     */
    public async getAllCartItems (): Promise<CartItem[]> {
        return (await this.executeQuery('SELECT * FROM cart_items', [])).rows.flat();
    }
    /**
     * Recupera um produto específico com base no ID fornecido da tabela "cartItems" no banco de dados.
     * @param CartItemId - O ID do produto a ser recuperado.
     * @returns Promise<CartItem> Um objeto do tipo CartItem correspondente ao ID fornecido.
     */
    public async getCartItemById (userId: number | string): Promise<CartItem> {
        return (await this.executeQuery('SELECT * FROM cart_items WHERE cart_item_id = $1', [userId])).rows[0];
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
            newCartItem.user_id, newCartItem.product?.product_id, newCartItem.quantity, CartItemId
        ])).rowCount !== 0;
    }
    /**
     * Exclui um produto específico com base no ID fornecido da tabela "cartItems" no banco de dados.
     * @param CartItemId - O ID do produto a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteCartItemById (CartItemId: number | string): Promise<boolean> {
        return (await this.executeQuery('DELETE FROM cart_items WHERE cart_item_id = $1', [CartItemId])).rowCount !== 0;
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
            cartItem.user_id, cartItem.product?.product_id, cartItem.quantity,
        ])).rowCount !== 0;
    }
}

const cartItemsService: CartItemService = new CartItemService(db_config);
export default cartItemsService;