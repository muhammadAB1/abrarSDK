import { type Request, type Response } from 'express'
import { AuthModelSignin, AuthModelSignup } from './types'
import { prisma } from 'db'
import { clearAuthCookieOptions, setAuthCookie } from './session'

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = AuthModelSignin.signinSchema.parse(req.body)
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            })
        }

        const matched = await Bun.password.verify(password, user.password)

        if (!matched) {
            return res.status(401).json({
                message: 'incorrect credentials'
            })
        }

        setAuthCookie(res, user.id.toString())
        res.status(200).send({ message: 'Signed in successfully' })


    } catch (error) {
        res.status(500).json(error)
    }

}

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = AuthModelSignup.signupSchema.parse(req.body)
        const user = await prisma.user.create({
            data: {
                email,
                password: await Bun.password.hash(password)
            }
        })



        res.status(201).send(AuthModelSignup.signUpResponseSchema.parse({ id: user.id }))


    } catch (error) {
        res.status(500).send(
            error
        )
    }

}

export const me = async (req: Request, res: Response) => {
    const userId = parseInt(req.user);

    const user = await prisma.user.findFirst({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            credits: true,
        },
    })

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    res.status(200).json(user)
}

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('auth', clearAuthCookieOptions)
    res.status(200).json({ message: 'Signed out successfully' })
}

export const credits = async (req: Request, res: Response) => {

    const userId = parseInt(req.user);

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            credits: true,
        }
    })

    res.status(200).send(user?.credits)
}