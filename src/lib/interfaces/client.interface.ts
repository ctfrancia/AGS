export interface Client {
    id: string,
    name: string,
    email: string,
    role: string,
}

export interface ClientResponse {
    clients: Client[]
}