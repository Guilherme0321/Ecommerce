import { Product } from "./product";

// Item do Carrinho
export type CartItem = {
    product_id?: number;
    product?: Product;             // Produto no carrinho
    quantity: number;             // Quantidade do produto no carrinho
};
