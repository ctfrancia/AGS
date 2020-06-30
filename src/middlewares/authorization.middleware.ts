import { Context, Next } from "koa"
import { roleCheck } from "../models/user.db"
import { Client } from "../lib/interfaces/client.interface"

// roleRequired is the desired permission level in order to gain access, it can be:
// "users" and/or "admin"
const authorize = (roleRequired: string[]) => async (ctx: Context, next: Next): Promise<void> => {
	const userID: string = ctx.cookies.get("userID")
	if (userID.length > 0) {
		const user: Client = await roleCheck(userID)
		if (user !== null && roleRequired.includes(user.role)) {
			next()
		} else {
			ctx.status = 403
			ctx.response.body = {
				errors:["Permission denied"]
			}
			return
		}
	} else {
		ctx.status = 403
		ctx.set("Content-Type", "application/json")
		ctx.response.body = {
			errors:["Permission denied"]
		}
		return
	}
  };
  
  export default authorize;