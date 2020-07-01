import { Context } from "koa"
import { getUserDataById, getUserDataByName } from "../../models/user.db" 
import { Client, UserId, NameId } from "../../lib/interfaces/client.interface"

const noUser = "User not found"
export const getUserById = async (ctx: Context): Promise<void> => {
    const c: UserId = ctx.params
    const client: Client = await getUserDataById(c.id)
    ctx.set("Content-Type", "application/json")

    if (client !== null) {
        ctx.status = 200
        ctx.body = client
    } else {
        ctx.status = 404
        ctx.response.body = {
            errors: [noUser]
        }
    }
}

export const getUserByName = async (ctx: Context): Promise<void> => {
    const n: NameId = ctx.params
    const client: Client = await getUserDataByName(n.name)
    ctx.set("Content-Type", "application/json")

    if (client !== null) {
        ctx.status = 200
        ctx.response.body = client
    } else {
        ctx.status = 404
        ctx.response.body = {
             errors: [noUser]
        }
    }
}