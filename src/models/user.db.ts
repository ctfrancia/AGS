import { Client } from "../lib/interfaces/client.interface"

const cache = new Map<string, Client>()
const clientUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"

export const getUserDataById = async (id: string): Promise<Client> => {
    try {
        /*
        const inCache: Client = cache.get(id)
        if (typeof inCache !== "undefined") {
            return inCache
        }
        const client: Client = clientsList.clients.find((c: Client): boolean => c.id === id)
        if (typeof client !== "undefined"){
            cache.set(client.id, client)
            return client
        } else {
            return null
        }
        */
       return
    } catch(e) {
        console.error("error in getUserDataById", JSON.stringify(e))
    }
}