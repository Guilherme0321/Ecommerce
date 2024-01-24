export type Order = {
    order_Id?: string | number;             
    customer_id?: string | number;          
    shipping_address: string;     
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
};