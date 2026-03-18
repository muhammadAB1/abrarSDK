import type { NextFunction, Request, Response } from "express"
import { jwt as key } from "./types";
import jwt, { type JwtPayload } from 'jsonwebtoken'

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

        req.user = (decoded as JwtPayload).userId as string

        next()
    } catch (error) {
        res.send({
            message: 'Auth token invalid',
            success: false
        })
    }
}