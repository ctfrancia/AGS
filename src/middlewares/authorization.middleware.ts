import { Context, Next } from "koa"
import { JWT } from "../lib/interfaces/jwt.interface"
import * as jwt from "jsonwebtoken"

const authorizationHeaderMissing = "Authorization header missing"
const wrongStrategy = "Wrong authorization strategy" 
const permissionDenied = "Permission denied"

// roleRequired is the desired permission level in order to gain access, it can be:
// "users" and/or "admin"
const authorize = (roleRequired: string[]) => async (ctx: Context, next: Next): Promise<void> => {
    if (typeof ctx.headers.authorization === "undefined") {
        ctx.status = 403
        ctx.response.body = {
            errors: [authorizationHeaderMissing]
        }
        return
    }
    const [strategy, token] = ctx.headers.authorization.split(" ")
    if (strategy !== "Bearer") {
        ctx.response.status = 401
        ctx.response.body = {
            errors: [wrongStrategy]
        }
        return
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET) as JWT
        const hasPermission: boolean = roleRequired.includes(tokenDecoded.role)
        if (hasPermission) {
            ctx.clientData = tokenDecoded
            await next()
        } else {
            ctx.set("Content-Type", "application/json")
			ctx.status = 403
			ctx.response.body = {
				errors:[permissionDenied]
			}
			return
        }
    } catch(e) {
        console.log("Error in authorize", JSON.stringify(e))
    }
  };
  
  export default authorize;