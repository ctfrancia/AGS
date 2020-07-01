import * as Koa from "koa"
import * as logger from "koa-logger"
import * as json from "koa-json"
import * as bodyParser from "koa-bodyparser"
import * as cors from "koa-cors"
import errorHandler from "./middlewares/errorhandler.middleware"
import router from "./routes"
import * as dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const app = new Koa()

app
	.use(logger())
	.use(bodyParser())
	.use(errorHandler)
	.use(cors())
	.use(router.routes())
	.use(router.allowedMethods())
	// .use(json())

	export const server = app.listen(PORT, (): void => console.log(`🌍 Server listening on port ${PORT} - ${ENV} environment`))