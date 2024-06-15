import { translateText } from './translate.js';

document.getElementById('translate-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const word = document.getElementById('word').value;
    const language = document.getElementById('language').value;

    const translatedWord = await translateText(word, language);

    document.getElementById('outputWord').innerText = translatedWord;

    let languageName;
    let imagePath;

    switch (language) {
        case 'en':
            languageName = 'İngilizce';
            imagePath = 'images/en.png';
            break;
        case 'de':
            languageName = 'Almanca';
            imagePath = 'images/de.png';
            break;
        case 'es':
            languageName = 'İspanyolca';
            imagePath = 'images/es.png';
            break;
        default:
            languageName = 'Bilinmeyen Dil';
            imagePath = 'images/default.png';
            break;
    }

    document.getElementById('outputLanguage').innerText = languageName;
    document.getElementById('outputImage').src = imagePath;
});
