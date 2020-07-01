import * as jwt from "jsonwebtoken"

const secret: string = process.env.HASH_SECRET || "dev"

export const jwtChecker = (t: string): string => {
    const token = jwt.verify(t, secret)
    console.log(token)
    console.log(token.valueOf)
    return token.toString()
}