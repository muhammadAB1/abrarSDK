import type { CookieOptions, Response } from 'express'
import jwt from 'jsonwebtoken'

export const SESSION_DAYS = 15
export const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000
export const SESSION_JWT_EXPIRES = `${SESSION_DAYS}d` as const

/** Cross-site cookies (frontend + API on different Vercel domains) need None + Secure. */
const isProd = process.env.NODE_ENV === 'production'

const cookieBase: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    // CHIPS: required as browsers phase out third-party cookies
    ...(isProd ? { partitioned: true } : {}),
}

export const authCookieOptions: CookieOptions = {
    ...cookieBase,
    maxAge: SESSION_MS,
}

/** Same attrs as set, but without maxAge — Express clearCookie + maxAge re-sets expiry instead of clearing. */
export const clearAuthCookieOptions: CookieOptions = cookieBase

export function setAuthCookie(res: Response, userId: string) {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET as string,
        { expiresIn: SESSION_JWT_EXPIRES },
    )

    res.cookie('auth', token, authCookieOptions)
}
