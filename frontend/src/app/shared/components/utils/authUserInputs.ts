import { StatusUser, User } from "../../types/user";

export const isJustLettes = (name: string | undefined): boolean => {
    return (name !== undefined) ? /^[a-zA-Z ]+$/.test(name) : false;
}

export const isJustNumbers = (str: string | undefined): boolean => {
    return (str !== undefined) ? /^[0-9]+$/.test(str) : false;
}

export const authEmail = (email: string | undefined): boolean => {
    return (email !== undefined) ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
}

export const authUser = (user: User | undefined): StatusUser | undefined => {
    const address : string[] | undefined = user?.address?.split(',');
    return (user !== undefined) ? ({
            name: isJustLettes(user.name),
            email: authEmail(user.email),
            username: user.username !== undefined,
            address: {
                street: (address !== undefined),
                number: (address !== undefined) ? isJustNumbers(address[1]) : false,
                city: (address !== undefined)
            }
        })
        : undefined;
}