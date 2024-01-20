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
            body: JSON.stringify(user),
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

export const logout = async () => {
    const url: string = 'http://localhost:5000/user/logout';
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const response = await res.json();
        console.log(response);
        
        return response;
    } catch (error) {
        console.error('Error in userService:', error);
        return error;
    }
}

export const validUserEmail = async (email: string): Promise<any> => {
    const url = 'http://localhost:5000/user/valid/email';
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        });

        if(!res.ok) {
            throw Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        return response;
    }catch(error){
        console.error('Error in userService:', error);
        return error;
    }
}

export const validUsername = async (username: string): Promise<any> => {
    const url = 'http://localhost:5000/user/valid/username'
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username})
        });

        if(!res.ok) {
            throw Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        return response;
    }catch(error){
        console.error('Error in userService:', error);
        return error;
    }
}

export const getInfoPerfil = async (token: string): Promise<any> => {
    const url: string = 'http://localhost:5000/user';
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(!res.ok) {
            throw Error(`HTTP error! Status: ${res.status}`);
        }
        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error in userService:', error);
        return error;
    }
}   