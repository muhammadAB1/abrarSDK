import { type Request, type Response } from 'express'
import { prisma } from 'db'

const ONRAMP_AMOUNT = 1000;

export const credits = async (req: Request, res: Response) => {

    const userId = parseInt(req.user);

    try {
        const [user] = await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: {
                    credits: {
                        increment: ONRAMP_AMOUNT
                    }
                }
            }),
            prisma.onrampTransaction.create({
                data: {
                    userId,
                    amount: ONRAMP_AMOUNT,
                    status: "completed"
                }
            })
        ])

        res.status(200).json(user.credits)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Transaction failed" })
    }
}