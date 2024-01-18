export type Product = {
    product_id: number,
    name: string,
    description: string,
    images: string[],
    price: number,
    stock: number,
    categories: string[],
    variants: any[]
}