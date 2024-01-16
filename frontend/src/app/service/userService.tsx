import { User } from '../shared/types/user'

export const userService = async (user: User): Promise<any> => {
    const url: string = 'http://localhost:5000/user/insert';
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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

export const authenticateUser = async (user: Partial<User>): Promise<any> => {
    const url: string = 'http://localhost:5000/user/authenticate';
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error in userService:', error);
        return error;
    }
}