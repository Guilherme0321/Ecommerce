export const insertToCart = async (product_id: number, quantity: number, token: string) => {
    const url: string = 'http://localhost:5000/cart-items';

    try {        
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({product_id: product_id, quantity:quantity})
        });
        if(!res.ok) {
            throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error in userService:', error);
        return error;
    }
}