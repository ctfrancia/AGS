import { Client } from "../lib/interfaces/client.interface"
import fetch from "node-fetch"
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
export const roleCheck = async (id: string): Promise<Client> => {
    const inCache: Client = cache.get(id)
    if (typeof inCache !== "undefined") {
        return inCache
    } else {
        const resp = await fetch(clientUrl)
        console.log(await resp.text())
        // const resp = fetch(clientUrl, { method: "GET"}).then(res => console.log(res.body))
        //console.log("inside rolecheck", resp.body)
        //const data = resp.json()
        // console.log(data)
        /*
        const client: Client = await fetch(clientUrl)
        if (typeof client !== "undefined") {
            cache.set(id, client)
            return client
        }
        return null
        */
    }
}