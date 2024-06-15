async function translateText(word, language) {
    const apiKey = '';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${word}&lang=${language}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.text[0];
    } catch (error) {
        console.error('Error:', error);
        return 'Çeviri Hatası';
    }
}

export { translateText };
