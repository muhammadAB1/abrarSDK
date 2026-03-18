import { type Request, type Response } from 'express'
import { AuthModelSignin, AuthModelSignup } from './types'
import { prisma } from 'db'
import jwt from 'jsonwebtoken'

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = AuthModelSignin.signinSchema.parse(req.body)
        console.log(prisma.apiKey)
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
            throw new Error('incorrect credentials')
        }

        const token = jwt.sign(
            { userId: user.id.toString() },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' },

        )
        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


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