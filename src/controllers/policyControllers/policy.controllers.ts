import { Context } from "koa"
import { NameId, UserId } from "../../lib/interfaces/client.interface"
import { Policy } from "../../lib/interfaces/policy.interface"
import { Client } from "../../lib/interfaces/client.interface"
import { getPolicies, getUserByPolicy } from "../../models/policy.db"

export const getPoliciesByName = async (ctx: Context): Promise<void> => {
   const n: NameId = ctx.params 
   ctx.set("Content-Type", "application/json")

   const policies: Policy[] = await getPolicies(n.name)

   if (policies !== null) {
       ctx.status = 200
       ctx.response.body = JSON.stringify(policies)
   } else {
       ctx.status = 404
       ctx.body = {
           errors: ["No policies found"]
       }
   }
}

export const getUserOfPolicyNumber = async (ctx: Context): Promise<void> => {
    const p: UserId = ctx.params

   const user: Client = await getUserByPolicy(p.id)
   if (user !== null) {
       ctx.status = 200
       ctx.response.body = user
    } else {
       ctx.status = 404
       ctx.response.body = {
           errors: ["No policy found"]
       }
    }
}