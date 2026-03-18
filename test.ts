import { abrarSDK } from "@abrar/sdk"

const client = new abrarSDK({
    apiKey: "sk-or-v1oXshkkZ38mcYB7C1nqpc",
})

const response = await client.chat({
    model: 'google/gemini-3-flash-preview',
    messages: [{
        "role": "user",
        "content": "What is 2+2"
    }],
})


console.log(response.completions.choices[0].message)