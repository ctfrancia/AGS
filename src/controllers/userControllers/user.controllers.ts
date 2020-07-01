import { Context } from "koa"
// import { UserId, NameId } from "../../lib/interfaces/userId.interface"
// import { getUserDataById, getUserDataByName } from "../../models/user.db" 
import { Client } from "../../lib/interfaces/client.interface"

export const getUserById = async (ctx: Context): Promise<void> => {
    /*
    const c: UserId = ctx.params
    ctx.set("Content-Type", "application/json")

    if (typeof c.id !== "string" || typeof c.id === "undefined") {
        ctx.response.status = 400
        ctx.response.body = {
            errors: ["invalid userID"]
        }
        return
    }
    const client: Client = await getUserDataById(c.id)
    if (client !== null) {
        ctx.response.body = client
    } else {
        ctx.status = 404
        ctx.response.body = {
            errors: ["User not found"]
        }
    }
    */
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