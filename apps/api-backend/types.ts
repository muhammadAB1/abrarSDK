export type Messages = {
    role: 'user' | 'assistant';
    content: string;
}[];

export type Conversation = {
    model: string;
    messages: Messages[];
};