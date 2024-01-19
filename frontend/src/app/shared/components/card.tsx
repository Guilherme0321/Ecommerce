import { useState } from "react";
import { getCookie } from "./utils/cookies"
import { insertToCart } from "../../service/cartItemsService";

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

    const addToCartItems = async () => {
        if(token === null) {
            console.log('token invalido!');
        }else {
            const res = await insertToCart(product_id, quantity, token);
            console.log(res);
        }
    }
    return (
        <div className="col">
            <div className="card" id="card">
                <img src={image} alt={name} className="card-img-top"/>
                <div className="card-body" id="informations">
                    <h3 className="card-title text-center p-1">{name}</h3>
                    <p className="card-text text-center">{description}</p>
                    <p className="card-text fw-bold">R$ <b className=".text-success">{price}</b></p>
                    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                        <button className="bg-white border-1 rounded-3 text-center" onClick={() => {if(quantity > 0) setQuantity(--quantity)}}>-</button>
                        <p className="text-center my-0 mx-3">{quantity}</p>
                        <button className="bg-white border-1 rounded-3 text-center" onClick={() => setQuantity(++quantity)}>+</button>
                    </div>
                    <p>Stock: {stock}</p>
                    <div className="d-flex flex-row flex-wrap gap-1">
                        {categories?.map((h) => (
                            <p key={h}>{h}</p>
                        ))}
                    </div>
                    <div className="card-footer">
                        <button style={{width: '100%'}} className="bg-danger border-0" onClick={addToCartItems}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}