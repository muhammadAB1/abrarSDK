import express, { type Request, type Response } from 'express'
import type { Messages } from './types.js';
import { Gemini } from './llm/Gemini.js';
// import { OpenAi } from './llm/OpenAi';
// import { Claude } from './llm/Claude';
import { prisma } from 'db'
import type { LlmResponse } from './llm/base.js';

const app = express();
app.use(express.json())


app.post('/conversation', async (req: Request, res: Response) => {
    const { model, messages }: { model: string, messages: Messages } = req.body;
    const [companyName, provideModelName] = model.split('/');

    // Get apiKey from incoming headers using 'authorization'
    const apiKey = req.headers['authorization']?.split(' ')[1];

    const apiKeyDb = await prisma.apiKey.findFirst({
        where: {
            apiKey,
            deleted: false,
            disabled: false,
        },
        include: {
            user: true
        }
    })

    if (!apiKeyDb) {
        return res.status(403).json({
            message: "Invalid api key"
        })
    }

    if (apiKeyDb.user.credits <= 0) {
        return res.status(403).json({
            message: "You dont have enough credits in your db"
        })
    }

    const modelDb = await prisma.model.findFirst({
        where: {
            slug: model
        }
    })

    if (!modelDb) {
        return res.status(403).json({
            message: "This is an invalid model we dont support"
        })
    }

    const providers = await prisma.modelProviderMapping.findMany({
        where: {
            modelId: modelDb.id
        },
        include: {
            provider: true
        }
    })

    const provider = providers[Math.floor(Math.random() * providers.length)]

    let response: LlmResponse | null = null

    if (provider?.provider.name === 'Google API') {
        const response = await Gemini.chat(provideModelName!, messages)
        res.status(200).json(response)
    }
    if (provider?.provider.name === "Google Vertex") {
        response = await Gemini.chat(provideModelName!, messages)
    }

    // if (companyName === 'OpenAI') {
    //     const response = await OpenAi.chat(provideModelName!, messages)
    //     res.status(200).json(response)
    // }
    // if (companyName === 'Claude API') {
    //     const response = await Claude.chat(provideModelName!, messages)
    //     res.status(200).json(response)
    // }

    if (!response) {
        return res.status(403).json({
            message: "No provider found for this model"
        })
    }

    const creditsUsed = (response.inputTokensConsumed * provider!.inputTokenCost + response.outputTokensConsumed * provider!.outputTokenCost) / 10;

    await prisma.user.update({
        where: {
            id: apiKeyDb.user.id
        },
        data: {
            credits: {
                decrement: creditsUsed
            }
        }
    });

    await prisma.apiKey.update({
        where: {
            apiKey: apiKey
        },
        data: {
            creditsConsumed: {
                increment: creditsUsed
            }
        }
    })

    return res.json(response);
})

// app.listen(4000, () => { console.log('app listening on port 4000') });
export default app;
