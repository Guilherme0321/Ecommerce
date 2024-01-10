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