async function handler({ message, conversationHistory = [], city = "Paris" }) {
  if (!message) {
    return { error: "Le message est requis" };
  }

  try {
    let commandResponse = null;
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("/meteo") || lowerMessage.includes("météo")) {
      const weatherResponse = await fetch("/api/get-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const weatherData = await weatherResponse.json();
      commandResponse = weatherData.error
        ? "Désolé, je n'ai pas pu obtenir les données météo."
        : `Conditions météo à ${city}:\nTempérature: ${weatherData.temperature}°C\nHumidité: ${weatherData.humidity}%\nVent: ${weatherData.windSpeed} m/s`;
    }

    if (
      lowerMessage.includes("/actualites") ||
      lowerMessage.includes("actualités")
    ) {
      const newsResponse = await fetch("/api/get-news", { method: "POST" });
      const newsData = await newsResponse.json();
      if (newsData.news) {
        commandResponse =
          "Voici les dernières actualités sur l'hydrogène vert:\n" +
          newsData.news.map((item) => `- ${item.title}`).join("\n");
      }
    }

    const systemMessage = `Tu es un expert en hydrogène vert qui peut répondre aux questions sur la technologie, les projets, les impacts environnementaux et les développements récents.
    Répondez en français de manière claire et informative.
    
    Commandes disponibles:
    /meteo - Afficher les conditions météorologiques actuelles
    /actualites - Afficher les dernières actualités
    
    Navigation:
    - Si l'utilisateur pose des questions sur la production, suggérez la section "Production" du site
    - Si l'utilisateur pose des questions sur le stockage, suggérez la section "Stockage" du site
    - Si l'utilisateur pose des questions sur la distribution, suggérez la section "Distribution" du site
    
    Format de réponse requis:
    {
      "response": "Votre réponse détaillée ici",
      "suggestion": "Une suggestion d'action pour l'utilisateur", 
      "should_navigate": true/false,
      "navigation_target": "Production/Stockage/Distribution ou vide si pas de navigation"
    }
    
    Contexte actuel: ${
      commandResponse ? `Données en direct obtenues: ${commandResponse}` : ""
    }`;

    const messages = [
      { role: "system", content: systemMessage },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    const [geminiResponse, gptResponse] = await Promise.all([
      fetch("/integrations/google-gemini-1-5/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          json_schema: {
            name: "chatbot_response",
            schema: {
              type: "object",
              properties: {
                response: { type: "string" },
                suggestion: { type: "string" },
                should_navigate: { type: "boolean" },
                navigation_target: { type: "string" },
              },
              required: [
                "response",
                "suggestion",
                "should_navigate",
                "navigation_target",
              ],
              additionalProperties: false,
            },
          },
        }),
      }),
      fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          json_schema: {
            name: "chatbot_response",
            schema: {
              type: "object",
              properties: {
                response: { type: "string" },
                suggestion: { type: "string" },
                should_navigate: { type: "boolean" },
                navigation_target: { type: "string" },
              },
              required: [
                "response",
                "suggestion",
                "should_navigate",
                "navigation_target",
              ],
              additionalProperties: false,
            },
          },
        }),
      }),
    ]);

    const [geminiData, gptData] = await Promise.all([
      geminiResponse.json(),
      gptResponse.json(),
    ]);

    const parsedGeminiResponse = JSON.parse(
      geminiData.choices[0].message.content
    );
    const parsedGPTResponse = JSON.parse(gptData.choices[0].message.content);

    const combinedResponse = {
      reply: parsedGPTResponse.response,
      suggestion: parsedGeminiResponse.suggestion,
      shouldNavigate:
        parsedGPTResponse.should_navigate ||
        parsedGeminiResponse.should_navigate,
      navigationTarget:
        parsedGPTResponse.navigation_target ||
        parsedGeminiResponse.navigation_target,
      role: "assistant",
      commandResponse,
    };

    return combinedResponse;
  } catch (error) {
    return { error: "Erreur lors du traitement de la demande" };
  }
}