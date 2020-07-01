import { Context } from "koa"
// import { UserId, NameId } from "../../lib/interfaces/userId.interface"
import { getUserDataById, getUserDataByName } from "../../models/user.db" 
import { Client } from "../../lib/interfaces/client.interface"

export const getUserById = async (ctx: Context): Promise<void> => {
    const client: Client = await getUserDataById(ctx.clientData.id)
    ctx.set("Content-Type", "application/json")

    console.log("client", client)
    if (client !== null) {
        ctx.status = 200

        console.log("client before sent", client)
        
        ctx.body = client
        return
    } else {
        ctx.status = 404
        ctx.response.body = {
            errors: ["User not found"]
        }
    }
}

export const getUserByName = async (ctx: Context): Promise<void> => {
    /*
   const c: NameId = ctx.params
   ctx.set("Content-Type", "application/json")

   if (typeof c.name !== "string" || typeof c.name === "undefined") {
        ctx.response.status = 400
        ctx.response.body = {
            errors: ["invalid name paramenter"]
        }
        return
   }
   const client: Client = await getUserDataByName(c.name)

   if (client !== null) {
       ctx.response.body = client
   } else {
       ctx.response.body = {
            errors: ["User not found"]
       }
   }
   */
}