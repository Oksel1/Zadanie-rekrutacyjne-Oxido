# Node.js HTML Generator

Skrypt w Node.js, który umożliwia przekształcenie treści pliku tekstowego na strukturyzowany dokument HTML, przesyłając treść do API OpenAI. Dodatkowo generuje pusty szablon HTML oraz pełny podgląd wygenerowanego artykułu z gotowymi stylami.

## Funkcje

1. **Przetwarzanie pliku tekstowego**:
    - Odczyt treści pliku `Zadanie dla JJunior AI Developera - tresc artykulu.txt`.
    - Wysyłanie treści do OpenAI w celu strukturyzacji na HTML.
    - Zapisywanie wynikowego HTML do pliku `artykul.html`.

2. **Generowanie szablonu HTML**:
    - Tworzy pusty szablon `szablon.html`, który zawiera:
        - Style CSS dla wizualizacji artykułu.
        - Kod JavaScript informujący o gotowości na wklejenie treści do sekcji `<body>`.

3. **Generowanie podglądu artykułu**:
    - Tworzy plik `podglad.html`, który łączy wygenerowany artykuł z szablonem HTML, umożliwiając natychmiastowy podgląd w przeglądarce.

## Wymagania

- Node.js w wersji 18 lub nowszej (dla wbudowanego `fetch`).
- Konto OpenAI z kluczem API.

## Instalacja

1. Zainstaluj Node.js: [Pobierz Node.js](https://nodejs.org/).
2. Pobierz kod skryptu i umieść go w folderze roboczym.

Jeśli używasz Node.js starszego niż wersja 18, zainstaluj `node-fetch`:
```bash
npm install node-fetch
 ```

## Podmiana klucza API OpenAI

1. Otwórz plik `script.js`.
2. Znajdź linię, w której zadeklarowana jest zmienna `API_KEY`.
3. Wklej swój klucz API OpenAI w miejsce pustego ciągu znaków, tak jak poniżej:

    ```javascript
    const API_KEY = 'your-openai-api-key-here';
    ```

4. Uruchom skrypt za pomocą Node.js:

    ```bash
    node script.js
    ```
