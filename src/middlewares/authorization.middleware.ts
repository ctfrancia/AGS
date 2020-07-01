import { Context, Next } from "koa"
import { JWT } from "../lib/interfaces/jwt.interface"
import * as jwt from "jsonwebtoken"

// roleRequired is the desired permission level in order to gain access, it can be:
// "users" and/or "admin"
const authorize = (roleRequired: string[]) => async (ctx: Context, next: Next): Promise<void> => {
    const [strategy, token] = ctx.headers.authorization.split(" ")
    if (strategy !== "Bearer") {
        ctx.response.status = 401
        ctx.response.body = {
            errors: ["Wrong authorization strategy."]
        }
        return
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET) as JWT
        const hasPermission: boolean = roleRequired.includes(tokenDecoded.role)
        if (hasPermission) {
            next()
        } else {
		    ctx.set("Content-Type", "application/json")
			ctx.status = 403
			ctx.response.body = {
				errors:["Permission denied"]
			}
			return
        }
    } catch(e) {
        console.log("Error in authorize", JSON.stringify(e))
    }
  };
  
  export default authorize;