import { CartItem } from "./CartItem";
import { Order } from "./Order";
import { Product } from "./Product";

// Usuário
export type User = {
    user_id: string | number,
    name: string;                 // Nome do usuário
    address: string;              // Endereço do usuário
    email: string;                // E-mail do usuário
    phone: string;                // Número de telefone do usuário
    username: string;         // Nome de usuário
    password: string;         // Senha segura
    orders?: Order[];              // Histórico de pedidos
    wishlist?: Product[];          // Lista de desejos
    cart?: CartItem[];             // Carrinho de compras
};
