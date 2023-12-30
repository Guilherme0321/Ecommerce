// Produto
export type Product = {
    product_id: string | number,
    name: string,                 // Nome do produto
    description: string,          // Descrição do produto
    images: string[],             // URLs das imagens
    price: number,                // Preço do produto
    stock: number,                // Estoque disponível
    categories: string[],         // Categorias ou tags relacionadas
    variants?: Variant[],         // Informações sobre variantes (por exemplo, tamanhos, cores)
};

// Variante do Produto
export type Variant = {
    size?: string,                // Tamanho da variante
    color?: string,               // Cor da variante
};
