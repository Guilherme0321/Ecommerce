import { Pool, PoolClient, QueryResult } from "pg";
import db_config from "./dbconfig";
import { Variant } from "../models/Variant";

// Agora você pode usar a constante db_config normalmente.


class VariantService {

    private pool: Pool;

    constructor(dbconfig: any){
        this.pool = new Pool(db_config);
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
     * Recupera todos os usuários da tabela "variants" no banco de dados.
     * @returns Promise<Variant[]> Um array de objetos do tipo Variant.
     */
    public async getAllVariants (): Promise<Variant[]> {
        return (await this.executeQuery('SELECT * FROM variants', [])).rows.flat();
    }
    /**
     * Recupera um usuário específico com base no ID fornecido da tabela "variants" no banco de dados.
     * @param variant_id - O ID do usuário a ser recuperado.
     * @returns Promise<Variant> Um objeto do tipo Variant correspondente ao ID fornecido.
     */
    public async getVariantById (product_id: number | string): Promise<Variant> {
        return (await this.executeQuery('SELECT * FROM variants WHERE product_id = $1', [product_id])).rows[0];
    }
    /**
     * Atualiza as informações de um usuário específico com base no ID fornecido na tabela "variants" no banco de dados.
     * @param variant_id - O ID do usuário a ser atualizado.
     * @param newVariant - Um objeto contendo as propriedades do usuário a serem atualizadas.
     * @returns Promise<boolean> Um booleano indicando se a atualização foi bem-sucedida ou não.
     */
    public async updateVariantById (variant_id: number | string, newVariant: Partial<Variant>): Promise<boolean> {
        return (await this.executeQuery(`UPDATE variants SET 
        product_id = $1,
        size = $2,
        color = $3
        WHERE variant_id = $4
        ;`,
        [
            newVariant.product_id, newVariant.size, newVariant.color, variant_id
        ])).rowCount !== 0;
    }
    /**
     * Exclui um usuário específico com base no ID fornecido da tabela "variants" no banco de dados.
     * @param variant_id - O ID do usuário a ser excluído.
     * @returns Promise<boolean> Um booleano indicando se a exclusão foi bem-sucedida ou não.
     */
    public async deleteVariantById (variant_id: number | string): Promise<boolean> {
        return (await this.executeQuery('DELETE FROM variants WHERE product_id = $1', [variant_id])).rowCount !== 0;
    }
     /**
     * Insere um novo usuário na tabela "variants" no banco de dados.
     * @param variant - Um objeto contendo as propriedades do novo usuário a ser inserido.
     * @returns Promise<boolean> Um booleano indicando se a inserção foi bem-sucedida ou não.
     */
    public async insertVariant (variant: Partial<Variant>): Promise<boolean> {
        return (await this.executeQuery(`INSERT INTO variants (product_id, size, color) VALUES ($1, $2, $3);
      `, [
            variant.product_id, variant.size, variant.color
        ])).rowCount !== 0;
    }
}

const variantService: VariantService = new VariantService(db_config);
export default variantService;