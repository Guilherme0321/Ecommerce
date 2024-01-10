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