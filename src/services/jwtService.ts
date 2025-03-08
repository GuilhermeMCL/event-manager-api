import jwt from "jsonwebtoken"
import { env } from "../env"



export function generateToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET as string, { expiresIn: "1h" })
}