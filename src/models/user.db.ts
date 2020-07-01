import { Client, ClientResponse } from "../lib/interfaces/client.interface"
import fetch from "node-fetch"
const cache = new Map<string, Client>()
const clientUrl = "http://www.mocky.io/v2/5808862710000087232b75ac"

export const getUserDataById = async (id: string): Promise<Client> => {
    try {
        // check if in cache
        const inCache: Client = cache.get(id)
        if (typeof inCache !== "undefined") {
            return inCache
        }
        const resp = await fetch(clientUrl)
        const body = await resp.text()

        const clientResponse: ClientResponse = JSON.parse(body)
        const client: Client = clientResponse.clients.find((c: Client): boolean => c.id === id)

        // if client is found add to cache and return client
        if (typeof client !== "undefined"){
            cache.set(client.id, client)
            return client
        } else {
            return null
        }
    } catch(e) {
        console.error("error in getUserDataById", JSON.stringify(e))
    }
}

export const getUserDataByName = async (n: string): Promise<Client> => {
    try {
        const inCache: Client = cache.get(n)
        if (typeof inCache !== "undefined") {
            return inCache 
        }
        /*
        const client: Client = clientsList.clients.find((c: Client): boolean => c.name === n)
        if (typeof client !== "undefined") {
            cache.set(client.name, client)
            return client
        } else {
            return null
        }
        */
    } catch(e) {
        console.error("error in getUserByName", JSON.stringify(e))
    }
}

export const roleCheck = async (id: string): Promise<Client> => {
    const inCache: Client = cache.get(id)
    if (typeof inCache !== "undefined") {
        return inCache
    } else {
        try {
            const resp = await fetch(clientUrl)
            const body = await resp.text()
        } catch (e) {
            console.log("error in fetching from API", JSON.stringify(e))
        }
    }
}