const fs = require('fs');
const path = require('path');

const API_KEY = 'your-openai-api-key-here';
const fileName = 'Zadanie dla JJunior AI Developera - tresc artykulu.txt';
const outputFileName = 'artykul.html';
const templateFileName = 'szablon.html';
const previewFileName = 'podglad.html';

// Generowanie szablonu HTML
function generateTemplate() {
    const templateContent = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podgląd artykułu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 10px 0;
            display: block;
        }
        p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <!-- Wygenerowany artykuł -->
</body>
</html>
`;
    fs.writeFileSync(path.join(__dirname, templateFileName), templateContent, 'utf8');
    console.log(`Szablon zapisany w pliku: ${templateFileName}`);
}

// Procesowanie pliku i generowanie artykułu
async function processFile() {
    try {
        // 1. Odczyt pliku wejściowego
        const filePath = path.join(__dirname, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // 2. Przygotowanie prompta
        const prompt = `
Wygeneruj kod HTML na podstawie dostarczonej treści artykułu. Kod HTML powinien spełniać poniższe wytyczne:

1. **Strukturyzacja treści**:  
   - Użyj odpowiednich tagów HTML, takich jak <h1>, <h2>, <p>, <ul>, <li>, aby poprawnie zorganizować treść artykułu.

2. **Obrazki**:  
   - Zidentyfikuj miejsca, gdzie warto dodać grafiki w artykule.  
   - Wstaw tagi <img> z atrybutem src="image_placeholder.jpg" w tych miejscach.  
   - Każdy tag <img> powinien zawierać atrybut alt z dokładnym opisem obrazu w formie promptu, który można użyć do wygenerowania obrazu w przyszłości (np. "Ilustracja przedstawiająca schemat działania Node.js").  
   - Dodaj podpis pod każdą grafiką, korzystając z odpowiedniego tagu HTML (np. <figcaption>).

3. **Brak dodatkowych elementów**:  
   - Kod powinien zawierać wyłącznie zawartość przeznaczoną do wstawienia pomiędzy tagi <body> i </body>.  
   - Nie dołączaj znaczników <html>, <head>, ani <body>.  
   - Nie używaj CSS ani JavaScript.

4. **Output**:  
   - Kod powinien być gotowy do zapisania w pliku artykul.html.  
   - Ważne: wygenerowany HTML może nie być walidowalny bez sekcji <html> i <head>, ale nie jest to istotne.

### Treść artykułu do przetworzenia:  
${fileContent}
    `;
        // 3. Wysyłanie żądania do OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const htmlContent = data.choices[0].message.content;

        // 4. Zapisanie wygenerowanego artykułu
        const outputPath = path.join(__dirname, outputFileName);
        fs.writeFileSync(outputPath, htmlContent, 'utf8');
        console.log(`Treść została zapisana do pliku: ${outputFileName}`);

        // 5. Generowanie podglądu artykułu
        const previewContent = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podgląd artykułu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 10px 0;
            display: block;
        }
        p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>
`;
        const previewPath = path.join(__dirname, previewFileName);
        fs.writeFileSync(previewPath, previewContent, 'utf8');
        console.log(`Podgląd zapisany w pliku: ${previewFileName}`);
    } catch (error) {
        console.error('Wystąpił błąd:', error.message);
    }
}

// Uruchomienie funkcji
generateTemplate();
processFile();
