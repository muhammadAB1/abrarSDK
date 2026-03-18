import * as z from 'zod'

export namespace modelsModel {
    export const getModelsSchema = z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        company: z.object({
            id: z.number(),
            name: z.string(),
            website: z.string(),
        })
    })


    export type getModels =
        z.infer<typeof getModelsSchema>

    export const getProvidersSchema = z.object({
        id: z.number(),
        name: z.string(),
        website: z.string(),
    })

    export type getProviders =
        z.infer<typeof getProvidersSchema>

    export const getModelProvidersRequestSchema = z.object({
        modelId: z.string(),
    })

    export const getModelProvidersResponseSchema = z.object({
        id: z.number(),
        providerId: z.number(),
        providerName: z.string(),
        providerWebsite: z.string(),
        inputTokenCost: z.number(),
        outputTokenCost: z.number()

    })

    export type getModelProvidersResponseSchema =
        z.infer<typeof getModelProvidersResponseSchema>

}
