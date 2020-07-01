import * as Router from "koa-router"
import { getPoliciesByName, getUserOfPolicyNumber } from "../controllers/policyControllers/policy.controllers"
const router = new Router()

router.get("/client-name/:name", getPoliciesByName)
router.get("/policy-number/:id", getUserOfPolicyNumber)

export default router