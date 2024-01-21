import axios from 'axios';
const openaiApiKey = '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';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiApiKey}`,
};


export const generateResponseGPT = async (input) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are an assistant who answers questions." },
                    { role: 'user', content: `${input}` }],
            },
            { headers }
        );
        const chatGptResponse = response.data.choices[0].message;
        return chatGptResponse
    } catch (err) {
        console.log('Error: ' + err);
    }
};