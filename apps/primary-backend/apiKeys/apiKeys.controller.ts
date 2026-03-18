import { type Request, type Response } from 'express'
import { prisma } from 'db'
import { apiKeyModel } from './types';

const API_KEY_LENGTH = 20
const ALPHABET_SET = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIUOPASDFGHJKLZXCVBNM12346789'

function createrRandomApiKey() {
    let suffixKey = '';
    for (let i = 0; i < API_KEY_LENGTH; i++) {
        suffixKey += ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)]
    }
    return suffixKey
}

export const createApiKey = async (req: Request, res: Response) => {
    const userId = parseInt(req.user);

    const { name } = apiKeyModel.createApiKeySchema.parse(req.body)

    const apiKey = createrRandomApiKey();

    const apiKeyDb = await prisma.apiKey.create({
        data: {
            name,
            apiKey: `sk-or-v1${apiKey}`,
            userId,
        }
    })

    res.status(201).send(apiKeyModel.createApiKeyResponse.parse({ id: apiKeyDb.id, apiKey: `sk-or-v1${apiKey}` }))

}

export const getApiKey = async (req: Request, res: Response) => {
    const userId = parseInt(req.user);

    const apiKeys = await prisma.apiKey.findMany({
        where: {
            userId,
            deleted: false
        }
    })

    res.status(201).send(
        apiKeys.map((apiKey): apiKeyModel.GetApiKeyResponse => ({
            id: apiKey.id,
            name: apiKey.name,
            apiKey: apiKey.apiKey,
            lastUsed: apiKey.lastUsed,
            creditConsumed: apiKey.creditsConsumed,
            disabled: apiKey.disabled,
        }))
    )

}

export const updateApiKey = async (req: Request, res: Response) => {
    const userId = parseInt(req.user);

    const { id, disabled } = apiKeyModel.updateApiKeySchema.parse(req.body)

    await prisma.apiKey.update({
        where: {
            id: id,
            userId,
            deleted: false
        },
        data: {
            disabled,
        }
    })

    res.status(200).send(apiKeyModel.updateApiKeyResponseSchema.parse({ message: 'Api key status updated' }))

}

export const deleteApiKey = async (req: Request, res: Response) => {
    const userId = parseInt(req.user)

    const { id } = apiKeyModel.deleteApiKey.parse(req.params)

    await prisma.apiKey.update({
        where: {
            id: parseInt(id),
            userId
        },
        data: {
            deleted: true
        }
    })

    res.status(200).send(apiKeyModel.deleteApiKeyResponseSchema.parse({ message: 'Api Key Deleted Successfully' }))
}