export interface Client {
    id: string,
    name: string,
    email: string,
    role: string,
}

export interface ClientResponse {
    clients: Client[],
}

export interface UserId {
    id: string,
}

export interface NameId {
    name: string,
}