import { CartItem } from "./CartItem";
import { Product } from "./Product";
import { User } from "./User";

// Pedido
export type Order = {
    order_Id?: string | number;              // Número do pedido
    products: Product[];          // Produtos no pedido
    customer_id: User;           // Informações do cliente
    shipping_address: string;      // Endereço de entrega
    status: 'pending' | 'paid' | 'shipped' | 'delivered'; // Status do pedido
};
