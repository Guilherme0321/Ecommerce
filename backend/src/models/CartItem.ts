import { Product } from "./Product";

// Item do Carrinho
export type CartItem = {
    user_id?: number | string;
    product_id?: number | string;
    product?: Product;             // Produto no carrinho
    quantity: number;             // Quantidade do produto no carrinho
};
