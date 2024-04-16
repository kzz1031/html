// server.js

const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/translate', async (req, res) => {
    const { inputText } = req.body;
    const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9';
    const apiUrl = 'https://api.132006.xyz/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: '请将下面这段话直接翻译成英文(直接把英文给我): ' + inputText
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const translatedText = data.choices[0].message.content;
        res.json({ translatedText });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
