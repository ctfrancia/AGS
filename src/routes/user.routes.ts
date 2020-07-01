import * as Router from "koa-router"
import { getUserById, getUserByName } from "../controllers/userControllers/user.controllers"
const router = new Router()

router.get("/id/:id", getUserById)
router.get("/name/:name", getUserByName)

export default router
