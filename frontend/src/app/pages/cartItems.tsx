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
                <div className="bg-light rounded-4 p-4">
                <div className="table-container" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    <table className="table table-hover">
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
                            <div className="d-flex flex-row gap-2">
                                <img src={cart.product?.images[0]} alt="cartImage" className="product-image" />
                                <div className="d-flex flex-column align-items-start">
                                <h6>{cart.product?.name}</h6>
                                <div className="d-flex flex-row gap-1">
                                    {cart.product?.categories.map(category => (
                                    <p key={category}>{category}</p>
                                    ))}
                                </div>
                                </div>
                            </div>
                            </td>
                            <td className="align-middle">${cart.product?.price}</td>
                            <td className="align-middle">{cart.quantity}</td>
                            <td className="align-middle">${(cart.product?.price) ? (cart.quantity * cart.product?.price).toFixed(2) : cart.product?.price.toFixed(2)}</td>
                            <td className="align-middle">
                            <button className="btn btn-link" onClick={() => { handleClick(cart.product_id, cart.quantity) }}>
                                <img src={trash} className="rounded-circle" height="25" alt="" loading="lazy" />
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </section>
            <section className="my-5">
                <div className="bg-primary text-light rounded-4 p-4">
                <h2 className="mb-4">Finalizar Pedido</h2>
                <div className="d-flex flex-column align-items-start">
                    <p>1. Verifique seus itens no carrinho.</p>
                    <p>2. Clique em "Finalizar Pedido".</p>
                    <p>3. Preencha as informações de entrega.</p>
                    <p>4. Escolha o método de pagamento.</p>
                    <a className="btn btn-light mt-3" href="/cartItems/checkout">Finalizar Pedido</a>
                </div>
                </div>
            </section>
        </>
    )
}