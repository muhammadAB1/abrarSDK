import { type Request, type Response } from 'express'
import { prisma } from 'db'
import { modelsModel } from './types';


export const getModels = async (req: Request, res: Response) => {
    const models = await prisma.model.findMany({
        include: {
            company: true
        },
    })

    res.status(200).send(
        models.map((model): modelsModel.getModels => ({
            id: model.id,
            name: model.name,
            slug: model.slug,
            company: {
                id: model.company.id,
                name: model.company.name,
                website: model.company.website
            }
        }))
    )

}


export const getProviders = async (req: Request, res: Response) => {
    const providers = await prisma.provider.findMany()

    res.status(200).send(
        providers.map((provider): modelsModel.getProviders => ({
            id: provider.id,
            name: provider.name,
            website: provider.website
        }))
    )
}

export const getModelProviders = async (req: Request, res: Response) => {

    const { modelId } = modelsModel.getModelProvidersRequestSchema.parse(req.params)

    const mappings = await prisma.modelProviderMapping.findMany({
        where: {
            modelId: parseInt(modelId),
        },
        include: {
            provider: true
        }
    })

    res.status(200).send(
        mappings.map((mapping): modelsModel.getModelProvidersResponseSchema => ({
            id: mapping.id,
            providerId: mapping.provider.id,
            providerName: mapping.provider.name,
            providerWebsite: mapping.provider.website,
            inputTokenCost: mapping.inputTokenCost,
            outputTokenCost: mapping.outputTokenCost
        }))
    )
}