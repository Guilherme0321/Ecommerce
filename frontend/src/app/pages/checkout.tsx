import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getCookie } from '../shared/components/utils/cookies';
import { CartItem } from '../shared/types/cartItems';
import { getInfoPerfil } from '../service/userService';
import { User } from '../shared/types/user';
import { insertOrder } from '../service/orderService';

export const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const [user, setUser] = useState<User>({});

    const [data, setData] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');


    const token: string | null = getCookie('token');

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    };
    
    const handleExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setExpiryDate(event.target.value);
    };
    
    const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCvv(event.target.value);
    };
      
    const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(event.target.value);
    };
        
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(user => ({...user, [name]: value}))
    }
    
    const isCardNumberValid = (): boolean => {
        return cardNumber.replace(/\D/g, '').length >= 16;
    };
    
    const isExpiryDateValid = (): boolean => {
        const [month, year] = expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const formattedMonth = parseInt(month, 10);
        const formattedYear = parseInt(year, 10);
        
        return (
            formattedMonth >= 1 &&
            formattedMonth <= 12 &&
            formattedYear >= currentYear &&
            formattedYear <= currentYear + 10
        );
    };
    
    const isCvvValid = (): boolean => {
        return cvv.replace(/\D/g, '').length >= 3;
    };
    
    // adicionar uma forma de pagamento real no futuro
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if(user.address && user.name && isCardNumberValid() && isExpiryDateValid() && isCvvValid()){
            try {
                const res: boolean | undefined = await insertOrder({shipping_address: user.address, status: 'paid'});
                if(res) {
                    window.location.href = '/home';
                }else {
                    console.log('Falha ao realizar pagamento');
                }
            } catch (error) {
                console.error(error);
            }            
        }else { 
            e.preventDefault();
            console.log('Informações do cartão invalidas!');
        }
    }
    
    useEffect(() => {
        const getInfoUser = async () => {
            try {
                if (token !== null) {
                    const { cart, orders, ...res} = (await getInfoPerfil(token))[0];         
                    setData(cart);
                    setUser(res);
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
    },[token]);
        
    return (
        <div className="container my-5">
        <div className="row">
        <div className="col-md-8">
            <div className="bg-light rounded-4 p-4">
            <h2 className="mb-4">Finalizar Pedido</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Nome Completo</label>
                    <input type="text" name='name' value={user.name} className="form-control" id="fullName" onChange={handleInput} placeholder="Seu Nome Completo" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Endereço de Entrega</label>
                    <input type="text" name='address' value={user.address} className="form-control" id="address" onChange={handleInput} placeholder="Seu Endereço" />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Método de Pagamento</label>
                    <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="creditCard">Cartão de Crédito</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                {paymentMethod === 'creditCard' && (
                <>
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Número do Cartão</label>
                        <input type="text" className="form-control" onChange={handleCardNumberChange} id="cardNumber" placeholder="Número do Cartão" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">Data de Expiração</label>
                        <input type="text" className="form-control" onChange={handleExpiryDateChange} id="expiryDate" placeholder="MM/AA" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" onChange={handleCvvChange} id="cvv" placeholder="CVV" />
                    </div>
                </>
                )}

                {paymentMethod === 'paypal' && (
                <div className="mb-3">
                    <label htmlFor="paypalEmail" className="form-label">E-mail do PayPal</label>
                    <input type="email" className="form-control" id="paypalEmail" placeholder="Seu E-mail do PayPal" />
                </div>
                )}

                <button type="submit" className="btn btn-primary">Finalizar Pedido</button>
            </form>
            </div>
        </div>
        <div className="col-md-4">
            <div className="bg-white rounded-4 p-4">
            <h2 className="mb-4">Resumo do Pedido</h2>
            {!loading && data.map(cart => (
                <p key={cart.product?.name}>{cart.product?.name}</p>
            ))}
            </div>
        </div>
        </div>
    </div>
    );
}