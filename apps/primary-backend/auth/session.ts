import type { Response } from 'express'
import jwt from 'jsonwebtoken'

export const SESSION_DAYS = 15
export const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000
export const SESSION_JWT_EXPIRES = `${SESSION_DAYS}d` as const

export function setAuthCookie(res: Response, userId: string) {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET as string,
        { expiresIn: SESSION_JWT_EXPIRES },
    )

    res.cookie('auth', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: SESSION_MS,
    })
}
