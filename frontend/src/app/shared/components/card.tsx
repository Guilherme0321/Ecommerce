import { useState } from "react";
import { getCookie } from "./utils/cookies"

export const Card = (
    {
        product_id,image, name, description, price, stock, categories
    }:{
        product_id: number,
        image: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        categories?: string[]
    }
) => {
    let [quantity, setQuantity] = useState<number>(0);
    const token =  getCookie('token');
    return (
        <div className="d-flex flex-column justify-content-center g-3 align-items-center" style={{width: '25%'}} id="card">
            <img src={image} alt={name} className="img-thumbnail rounded-0"/>
            <div className="d-flex flex-column justify-content-center align-items-center" id="informations">
                <h3 className="text-center p-1">{name}</h3>
                <p className="text-center">{description}</p>
                <p className="fw-bold">R$ <b className=".text-success">{price}</b></p>
                <div className="d-flex flex-row flex-wrap justify-content-center g-1 align-items-center">
                    <button onClick={() => {if(quantity > 0) setQuantity(--quantity)}}>-</button>
                    <p className="text-center">{quantity}</p>
                    <button onClick={() => setQuantity(++quantity)}>+</button>
                </div>
                <p>Stock: {stock}</p>
                <div className="categories">
                    {categories?.map((h) => (
                        <p>{h}</p>
                    ))}
                </div>
                <button onClick={() => console.log({product_id: product_id, quantity: quantity, token: token})}>Add to cart</button>
            </div>
        </div>
    )
}