import { Pool, PoolClient, QueryResult } from "pg";
import { Order } from "../models/Order";
import db_config from "./dbconfig";

class OrderService {

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
     * Recupera todos os produtos da tabela "orders" no banco de dados.
     * @returns Promise<Order[]> Um array de objetos do tipo Order.
     */
    public async getAllOrders (): Promise<Order[]> {
        return (await this.executeQuery('SELECT * FROM orders', [])).rows.flat();
    }
    /**
     * Recupera um produto específico com base no ID fornecido da tabela "orders" no banco de dados.
     * @param OrderId - O ID do produto a ser recuperado.
     * @returns Promise<Order> Um objeto do tipo Order correspondente ao ID fornecido.
     */
    public async getOrderById (userId: number | string): Promise<Order> {
        return (await this.executeQuery('SELECT * FROM orders WHERE order_id = $1', [userId])).rows[0];
    }
    /**
     * Atualiza as informações de um produto específico com base no ID fornecido na tabela "orders" no banco de dados.
     * @param OrderId - O ID do produto a ser atualizado.
     * @param newOrder - Um objeto contendo as propriedades do produto a serem atualizadas.
     * @returns Promise<boolean> Um booleano indicando se a atualização foi bem-sucedida ou não.
     */
    public async updateOrderById (OrderId: number | string, newOrder: Partial<Order>): Promise<boolean> {
        return (await this.executeQuery(`UPDATE orders set customer_id = $1, shipping_address = $2, status = $3 WHERE order_id = $4`,
        [
            newOrder.customer_id?.user_id, newOrder.shipping_address, newOrder.status, OrderId
        ])).rowCount !== 0;
    }
    /**
     * Exclui um produto específico com base no ID fornecido da tabela "orders" no banco de dados.
     * @param OrderId - O ID do produto a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteOrderById (OrderId: number | string): Promise<boolean> {
        return (await this.executeQuery('DELETE FROM orders WHERE order_id = $1', [OrderId])).rowCount !== 0;
    }
    /**
     * Insere um novo produto na tabela "orders" no banco de dados.
     * @param order - Um objeto contendo as propriedades do novo produto a ser inserido.
     * @returns Promise<boolean> Um booleano indicando se a inserção foi bem-sucedida ou não.
     */
    public async insertOrder (order: Partial<Order>): Promise<boolean> {
        return (await this.executeQuery(`
        INSERT INTO orders (customer_id, shipping_address, status)
        VALUES ($1, $2, $3)`, 
        [
            order.customer_id?.user_id, order.shipping_address, order.status,
        ])).rowCount !== 0;
    }
}

const orderService: OrderService = new OrderService(db_config);
export default orderService;