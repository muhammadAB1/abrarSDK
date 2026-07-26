import type { NextFunction, Request, Response } from "express"
import { jwt as key } from "./types";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { setAuthCookie } from './auth/session'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = key.parse(req.cookies.auth);

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        )

        const userId = (decoded as JwtPayload).userId as string
        req.user = userId

        // Sliding session: extend cookie + JWT on every authenticated request
        setAuthCookie(res, userId)

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth token invalid',
            success: false
        })
    }
}