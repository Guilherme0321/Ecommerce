import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCookie } from '../shared/components/utils/cookies';
import { CartItem } from '../shared/types/cartItems';
import { getInfoPerfil } from '../service/userService';

export const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const [data, setData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const token: string | null = getCookie('token');

  useEffect(() => {
      const getInfoUser = async () => {
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
  },[token]);

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <div className="bg-light rounded-4 p-4">
            <h2 className="mb-4">Finalizar Pedido</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Nome Completo</label>
                <input type="text" className="form-control" id="fullName" placeholder="Seu Nome Completo" />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Endereço de Entrega</label>
                <input type="text" className="form-control" id="address" placeholder="Seu Endereço" />
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
                    <input type="text" className="form-control" id="cardNumber" placeholder="Número do Cartão" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">Data de Expiração</label>
                    <input type="text" className="form-control" id="expiryDate" placeholder="MM/AA" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cvv" placeholder="CVV" />
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