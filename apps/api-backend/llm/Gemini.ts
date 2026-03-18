import { type Messages } from "../types.js";
import { BaseLlm, type LlmResponse } from "./base.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


export class Gemini extends BaseLlm {
    static override async chat(model: string, messages: Messages): Promise<LlmResponse> {
        const response = await ai.models.generateContent({
            model: model,
            contents: messages.map(message => ({
                text: message.content,
                role: message.role
            }))
        });

        return {
            outputTokensConsumed: response.usageMetadata?.candidatesTokenCount!,
            inputTokensConsumed: response.usageMetadata?.promptTokenCount!,
            completions: {
                choices: [{
                    message: {
                        content: response.text!
                    }
                }]
            }
        }
    }
}