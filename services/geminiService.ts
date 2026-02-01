
import { GoogleGenAI } from "@google/genai";

// Funkcja pomocnicza do pobierania świeżej instancji AI
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callGeminiWithRetry(fn: (ai: GoogleGenAI) => Promise<any>, maxRetries = 2): Promise<any> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const ai = getAI();
      return await fn(ai);
    } catch (error: any) {
      lastError = error;
      // Obsługa błędu 429 - Resource Exhausted
      if (error?.message?.includes('429') || error?.status === 429 || error?.code === 429) {
        const waitTime = Math.pow(2, i) * 1500 + Math.random() * 1000;
        console.warn(`Limit API wyczerpany. Próba za ${Math.round(waitTime)}ms...`);
        await sleep(waitTime);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const generateServiceDescription = async (serviceName: string) => {
  try {
    const response = await callGeminiWithRetry((ai) => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś ekspertem w dziedzinie hydrauliki siłowej. Napisz profesjonalny, krótki opis usługi: "${serviceName}". Maksymalnie 3 zdania w języku polskim.`,
    }));
    return response.text;
  } catch (error) {
    console.error("Gemini Quota/Error:", error);
    const fallbacks: Record<string, string> = {
      "Zakuwanie węży": "Precyzyjne zakuwanie węży hydraulicznych z użyciem atestowanych komponentów.",
      "Naprawa siłowników": "Regeneracja i naprawa siłowników hydraulicznych wszystkich typów.",
      "Serwis pomp": "Profesjonalna diagnostyka i naprawa pomp hydraulicznych różnych producentów.",
      "Diagnostyka maszyn": "Kompleksowe sprawdzanie układów hydraulicznych u klienta.",
      "Druk 3D": "Wytwarzanie nietypowych części i prototypów z wytrzymałych materiałów.",
      "Sprzedaż komponentów": "Szeroki wybór części zamiennych dostępnych od ręki."
    };
    return fallbacks[serviceName] || "Profesjonalne usługi techniczne oparte na doświadczeniu.";
  }
};

export const analyzeIndustrialPhoto = async (base64Image: string) => {
  try {
    const response = await callGeminiWithRetry((ai) => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Co jest na zdjęciu (hydraulika/mechanika)? Max 3 słowa po polsku." }
        ]
      }
    }));
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Quota/Error:", error);
    return "Realizacja Danmar";
  }
};
