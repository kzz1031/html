async function translateText() {
    const inputText = document.getElementById('inputText').value;
    const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9'; // 用你的 ChatGPT API 密钥替换
    const apiUrl = "https://api.132006.xyz/v1/chat/completions ";
    console.log("translateText() 函数被调用了！");
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: 'user',
                        content: '请将下面这段话翻译成英文' + inputText
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const translatedText = data.choices[0].message.content; // 获取助手的回复内容
        document.getElementById('translatedText').innerText = translatedText;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function increaseFontSize() {
    var inputText = document.getElementById("inputText");
    var translatedText = document.getElementById("translatedText");
    var currentFontSize = window.getComputedStyle(inputText).fontSize;
    var currentFontSizeValue = parseFloat(currentFontSize); // 解析当前字体大小的值
    inputText.style.fontSize = (currentFontSizeValue + 2) + "px"; // 增加2像素
    translatedText.style.fontSize = (currentFontSizeValue + 2) + "px"; // 增加2像素
}

function decreaseFontSize() {
    var inputText = document.getElementById("inputText");
    var translatedText = document.getElementById("translatedText");
    var currentFontSize = window.getComputedStyle(inputText).fontSize;
    var currentFontSizeValue = parseFloat(currentFontSize); // 解析当前字体大小的值
    inputText.style.fontSize = (currentFontSizeValue - 2) + "px"; // 减小2像素
    translatedText.style.fontSize = (currentFontSizeValue - 2) + "px"; // 减小2像素
}