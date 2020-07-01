import * as Router from "koa-router";
import userRoutes from "./user.routes"
import policyRoutes from "./policy.routes"
import authorize  from "../middlewares/authorization.middleware"

const router = new Router()
const roleAdmin = "admin"
const roleUser = "user"

router.use("/user", authorize([roleAdmin, roleUser]), userRoutes.routes())
router.use("/policy", authorize([roleAdmin]), policyRoutes.routes())

export default router