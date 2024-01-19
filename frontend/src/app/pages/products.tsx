import { useEffect, useState } from "react"
import { NavBar } from "../shared/components/navBar"
import { getAllProduct } from "../service/productService";
import { Product } from "../shared/types/product";
import { Card } from "../shared/components/card";

export const Products = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Product[]>([{
        name: "",
        categories: [],
        images: [],
        description: "",
        price: 0,
        product_id: 0,
        stock: 0,
        variants: []
    }]);
    
    useEffect(() => {        
        const getProducts = async () => {
            try {
                const res = await getAllProduct();
                if(res !== undefined){
                    setData(res);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            } 
        }
        getProducts();
    }, []);

    return (
        <>
            <NavBar />
            <section className="row row-cols-1 row-cols-md-3 g-4 my-5">
                {loading ? (
                    <h1>Loading</h1>
                ) : (
                    data.map( data => (<Card 
                        key={data.product_id} 
                        product_id={data.product_id}
                        image={data.images[0]}
                        name={data.name}
                        description={data.description}
                        price={data.price}
                        stock={data.stock}
                        categories={data.categories}
                    />))
                )}
            </section>
        </>
    )
}