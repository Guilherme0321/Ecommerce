import { getCookie } from "../shared/components/utils/cookies";
import { Order } from "../shared/types/order";

export const insertOrder = async (order: Order): Promise<boolean | undefined> => {
    const token: string | null = getCookie('token');
    const url: string = 'http://localhost:5000/orders';
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error in userService:', error);
    }
}