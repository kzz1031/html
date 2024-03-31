async function translateText(text) {
    const apiKey = 'YOUR_API_KEY'; // 用你的 Google 翻译 API 密钥替换
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            source: 'en', // 源语言（英语）
            target: 'zh-CN' // 目标语言（简体中文）
        })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

async function translateAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    const translatedText = await translateText(inputText);
    document.getElementById('translatedText').innerText = translatedText;
}
