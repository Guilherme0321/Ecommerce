export type User = {
    name?: string,
    email?: string,
    username?: string,
    password?: string,
    phone?: string,
    address?: string
}

export type StatusUser = {
    name?: boolean,
    email?: boolean,
    username?: boolean,
    address?: {
        city: boolean,
        number: boolean,
        street: boolean
    }
}