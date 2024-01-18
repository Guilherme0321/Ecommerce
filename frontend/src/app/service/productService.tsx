export const getAllProduct = async (): Promise<any> => {
    const url: string = 'http://localhost:5000/products';
    
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error in userService:', error);
        return error;
    }
}