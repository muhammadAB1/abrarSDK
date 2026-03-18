export type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export type Messages = Message[];

export type ChatResponse = {
    completions: {
        choices: {
            message: {
                content: string;
            };
        }[];
    };
    inputTokensConsumed: number;
    outputTokensConsumed: number;
};