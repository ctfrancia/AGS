import * as jwt from "jsonwebtoken"

const secret: string = process.env.HASH_SECRET || "dev"

export const jwtChecker = async (t: string): Promise<void> => {
    const token = jwt.verify(t, secret)
    console.log(token)
}