import { Policy, PolicyResponse } from "../lib/interfaces/policy.interface"
import { Client } from "../lib/interfaces/client.interface"
import fetch from "node-fetch"
import { getUserDataById, getUserDataByName } from "./user.db"

const cache = new Map<string, Policy[] | Client>()
const policyUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5"

export const getPolicies = async (n: string): Promise<Policy[]> => {
    try {
        const clientData: Client = await getUserDataByName(n)
        if (clientData === null) {
            return null
        }
        const inCache: Policy[] = cache.get(n) as Policy[]
        if (typeof inCache !== "undefined") {
            return inCache
        }

        const resp = await fetch(policyUrl)
        const body: string = await resp.text()

        const policyResponse: PolicyResponse = JSON.parse(body)
        const policies = policyResponse.policies.filter((p: Policy): boolean => p.clientId === clientData.id)
        cache.set(n, policies)    
        return policies.length > 0 ? policies : null

    } catch(e) {
        console.log("error getting policies", JSON.stringify(e))
        return null
    }
}

export const getUserByPolicy = async (id: string): Promise<Client> => {
    try {
        const inCache = cache.get(id) as Client
        if (typeof inCache !== "undefined") {
            return inCache
        }
        const resp = await fetch(policyUrl)
        const body: string = await resp.text()
        const policyResponse: PolicyResponse = JSON.parse(body)
        
        const policy: Policy = policyResponse.policies.find((p: Policy): boolean => p.id === id)
        if (typeof policy === "undefined") {
            return null
        }
        
        const client: Client = await getUserDataById(policy.clientId)
        if (client === null) {
            return null
        }

        return client

    } catch(e) {
        console.error("Error in get user by policy", JSON.stringify(e))
        return null
    }
   return
}