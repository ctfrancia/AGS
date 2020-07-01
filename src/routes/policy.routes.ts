import * as Router from "koa-router"
import { getPoliciesByName, getUserOfPolicyNumber } from "../controllers/policyControllers/policy.controllers"
import router from "./user.routes"

router.get("/client-name/:name", getPoliciesByName)
router.get("/policy-number/:id", getUserOfPolicyNumber)

export default router