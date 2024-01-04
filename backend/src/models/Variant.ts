// Variante do Produto
export type Variant = {
    variant_id?: string | number,
    product_id: string | number,
    size?: string,                // Tamanho da variante
    color?: string,               // Cor da variante
};
