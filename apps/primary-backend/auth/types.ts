import * as z from 'zod'

export namespace AuthModelSignin {
    export const signinSchema = z.object({
        email: z.email(),
        password: z.string()
    })

    export const signInInvalid = z.literal('Invalid username or password')
}

export const AuthModelSignup = {
    signupSchema: z.object({
        email: z.email(),
        password: z.string(),
    }),
    signUpResponseSchema: z.object({
        id: z.number()
    }),
}