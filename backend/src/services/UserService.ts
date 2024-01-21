import { Pool, PoolClient, QueryResult } from "pg";
import { User } from "../models/User";
import { OrderService } from "./OrderService";
import { CartItemService } from "./CartItemService";
// Agora você pode usar a constante db_config normalmente.


export class UserService {

    private pool: Pool;
    private orderService: OrderService;
    private cartService: CartItemService;

    constructor(dbconfig: any){
        this.pool = new Pool(dbconfig);
        this.orderService = new OrderService(dbconfig);
        this.cartService = new CartItemService(dbconfig);
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
    private setOrders = async (users: User[]): Promise<User[]> => {
        await Promise.all(users.map(async (user) => {
            user.orders = await this.orderService.getOrderByUserId(user.user_id);
        }))
        return users;
    }

    private setCart_Items = async (users: User[]): Promise<User[]> => {
        await Promise.all(users.map(async (user) => {
            user.cart = await this.cartService.getCartItemByUserId(user.user_id);
        }));
        return users;
    }
    public async validEmail(email: string): Promise<boolean> {
        const result = (await this.executeQuery('SELECT COUNT(email) FROM users WHERE email = $1', [email]));        
        return result.rows[0].count == 0;
    }
    public async validUserName(username: string): Promise<boolean> {
        const result = (await this.executeQuery('SELECT COUNT(username) FROM users WHERE username = $1', [username]));        
        return result.rows[0].count == 0;
    }
    public async validUser(username: string, password: string): Promise<User> {
        return (await this.executeQuery('SELECT user_id FROM users WHERE username = $1 AND password = $2',[username, password])).rows[0];
    }
    /**
     * Recupera todos os usuários da tabela "users" no banco de dados.
     * @returns Promise<User[]> Um array de objetos do tipo User.
     */
    public async getAllUsers (): Promise<User[]> {
        return (await this.setCart_Items((await this.setOrders((await this.executeQuery('SELECT * FROM users', [])).rows.flat())).flat())).flat();
    }
    public async getUserIdByUsername (username: string): Promise<number> {
        return (await this.executeQuery('SELECT user_id FROM users WHERE username = $1',[username])).rows[0].user_id;
    }
    /**
     * Recupera um usuário específico com base no ID fornecido da tabela "users" no banco de dados.
     * @param userId - O ID do usuário a ser recuperado.
     * @returns Promise<User> Um objeto do tipo User correspondente ao ID fornecido.
     */
    public async getUserById (userId: number | string): Promise<User[]> {
        return  (await this.setCart_Items((await this.setOrders((await this.executeQuery('SELECT * FROM users WHERE user_id = $1', [userId])).rows.flat())).flat())).flat();;
    }
    /**
     * Atualiza as informações de um usuário específico com base no ID fornecido na tabela "users" no banco de dados.
     * @param userId - O ID do usuário a ser atualizado.
     * @param newUser - Um objeto contendo as propriedades do usuário a serem atualizadas.
     * @returns Promise<boolean> Um booleano indicando se a atualização foi bem-sucedida ou não.
     */
    public async updateUserById (userId: number | string, newUser: Partial<User>): Promise<boolean> {
        return (await this.executeQuery(`UPDATE users SET 
          name = $1,
          address = $2,
          email = $3,
          phone = $4,
          username = $5
        WHERE user_id = $6
        ;`,
        [
            newUser.name, newUser.address, newUser.email, newUser.phone, newUser.username, userId
        ])).rowCount !== 0;
    }
    /**
     * Exclui um usuário específico com base no ID fornecido da tabela "users" no banco de dados.
     * @param userId - O ID do usuário a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteUserById (userId: number | string): Promise<boolean> {
        return (await this.executeQuery('DELETE FROM users WHERE user_id = $1', [userId])).rowCount !== 0;
    }
     /**
     * Insere um novo usuário na tabela "users" no banco de dados.
     * @param user - Um objeto contendo as propriedades do novo usuário a ser inserido.
     * @returns Promise<boolean> Um booleano indicando se a inserção foi bem-sucedida ou não.
     */
    public async insertUser (user: Partial<User>): Promise<boolean> {
        return (await this.executeQuery(`INSERT INTO users (name, address, email, phone, username, password)
        VALUES ($1, $2, $3, $4, $5, $6);
      `, [
            user.name, user.address, user.email, user.phone, user.username, user.password,
        ])).rowCount !== 0;
    }
}