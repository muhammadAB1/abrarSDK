import { type Messages, type ChatResponse } from "./types";

export class abrarSDK {
    private apiKey: string;
    private baseURL: string;

    constructor({ apiKey, baseUrl = "http://localhost:4000" }: {
        apiKey: string
        baseUrl?: string
    }) {
        this.apiKey = apiKey
        this.baseURL = baseUrl
    }

    async chat({ model, messages }: { model: string, messages: Messages }): Promise<ChatResponse> {
        const res = await fetch(`${this.baseURL}/conversation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
            }),
        });
        if (!res.ok) {
            const err: any = await res.json();
            throw new Error(err.message || "Request failed");
        }

        return res.json() as Promise<ChatResponse>;
    }
}