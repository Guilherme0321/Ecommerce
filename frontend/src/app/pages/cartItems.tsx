import { useEffect, useState } from "react";
import { NavBar } from "../shared/components/navBar"
import { CartItem } from "../shared/types/cartItems"
import { getCookie } from "../shared/components/utils/cookies";
import { getInfoPerfil } from "../service/userService";
import trash from '../shared/images/trash.svg';
import { removeCart } from "../service/cartItemsService";

export const CartItems = () => {
    const [data, setData] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [reloadTable, setReloadTable] = useState(false);

    const token: string | null = getCookie('token');

    useEffect(() => {
        const getInfoUser = async () => {
            setLoading(true);
            try {
                if (token !== null) {
                    const res = (await getInfoPerfil(token))[0];         
                    setData(res.cart);
                } else {
                    console.log('Token inválido!');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        getInfoUser();
    },[token, reloadTable]);

    const handleClick = async (product_id: number | undefined, quantity: number) => {
        try {
            if( token !== null && product_id) {
                const res = await removeCart(product_id, quantity, token);
                if(res) {
                    window.location.reload();
                }else {
                    console.log('Erro ao tentar remover cart!');
                    
                }
            }else {
                console.log('Token invalido!');
            }
        }catch(error) {
             console.error(error);
        }finally {
            if(reloadTable) {
                setReloadTable(false);
            }else {
                setReloadTable(true);
            }
        }
    }

    return (
        <>
            <NavBar />
            <section className="my-5">
                <div className="bg-white rounded-4 d-flex flex-wrap flex-column align-items-center">
                    <div className="" style={{height:'93vh', overflowY: 'scroll'}}>
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={4}>Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && data.map(cart => (
                                    <tr key={cart.product_id}>
                                        <td className="align-middle" colSpan={4}>
                                            <div className="d-flex flex-row gap-1">
                                                <img src={cart.product?.images[0]} alt="cartImage" />
                                                <div className="d-flex flex-column align-items-center">
                                                    <h5>{cart.product?.name}</h5>
                                                    <div className="d-flex flex-row gap-1">    
                                                        {cart.product?.categories.map(category => (
                                                            <p key={category}>{category}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{cart.product?.price}</td>
                                        <td className="align-middle">{cart.quantity}</td>
                                        <td className="align-middle">{(cart.product?.price) ? cart.quantity * cart.product?.price : cart.product?.price}</td>
                                        <td className="align-middle">
                                            <button className="border-0 bg-transparent" onClick={() => {handleClick(cart.product_id, cart.quantity)}}>
                                                <img src={trash} className="rounded-circle" height="35" alt="" loading="lazy" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}