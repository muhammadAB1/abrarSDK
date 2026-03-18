import * as z from 'zod'

export namespace apiKeyModel {
    export const createApiKeySchema = z.object({
        name: z.string(),
    })


    export const createApiKeyResponse = z.object({
        id: z.number(),
        apiKey: z.string(),
    })

    export const updateApiKeySchema = z.object({
        id: z.number(),
        disabled: z.boolean(),
    })

    export const updateApiKeyResponseSchema = z.object({
        message: z.literal('Api key status updated')
    })

    export const getApiKeyResponseSchema = z.object({
        id: z.number(),
        name: z.string(),
        apiKey: z.string(),
        lastUsed: z.date().nullable(),
        creditConsumed: z.number(),
        disabled: z.boolean()
    })

    export type GetApiKeyResponse =
        z.infer<typeof getApiKeyResponseSchema>

    export const deleteApiKey = z.object({
        id: z.string(),
    })

    export const deleteApiKeyResponseSchema = z.object({
        message: z.literal('Api Key Deleted Successfully'),
    })
}
