export const isJustNumbers = (str: string): boolean => {
    return /^[0-9]+$/.test(str)
}

export const isJustLettes = (str: string): boolean => {
    return /^[a-zA-Z ]+$/.test(str);
}

export const authAddress = (str: string[]): boolean => {
    return isJustLettes(str[0]) && isJustLettes(str[2]) && isJustNumbers(str[1]);
}

export const authName = (str: string): boolean => {
    return isJustLettes(str);
}

export const authEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}