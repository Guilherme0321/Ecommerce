export const setCookie = (name: string, value: string, days: number = 1): void => {
    const expires: string = days ? `; expires=${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()}` : "";
    document.cookie = `${name}=${value}${expires}; path=/`;
}

export const getCookie = (name: string): string | null => {
    const nameEQ: string = name + "=";
    const cookies: string[] = document.cookie.split(';');
    for (let i: number = 0; i < cookies.length; i++) {
        let cookie: string = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
    }
    return null;
}