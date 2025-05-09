async function handler({
  language = "fr",
  category = "all",
  maxAge = 7,
  useCache = true,
}) {
  try {
    const cacheKey = `news_${language}_${category}_${maxAge}`;
    const cacheExpiry = 3600000; // 1 hour in milliseconds

    if (useCache) {
      const cachedData = await fetch("/api/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: cacheKey }),
      });

      const cachedResult = await cachedData.json();
      if (cachedResult && cachedResult.timestamp > Date.now() - cacheExpiry) {
        return cachedResult.data;
      }
    }

    const languagePrompts = {
      fr: "Générez 5 actualités récentes sur l'hydrogène vert",
      en: "Generate 5 recent news items about green hydrogen",
      de: "Generieren Sie 5 aktuelle Nachrichten über grünen Wasserstoff",
      es: "Genere 5 noticias recientes sobre hidrógeno verde",
    };

    const categoryFilters = {
      technology: "focusing on technological innovations",
      projects: "focusing on new projects and implementations",
      policy: "focusing on government policies and regulations",
      market: "focusing on market trends and investments",
      all: "covering various aspects",
    };

    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a specialized news curator focused on green hydrogen technology. Generate news from the last ${maxAge} days, ${categoryFilters[category]}. Include real-time market data and trends when relevant.`,
          },
          {
            role: "user",
            content: languagePrompts[language] || languagePrompts.en,
          },
        ],
        json_schema: {
          name: "green_hydrogen_news",
          schema: {
            type: "object",
            properties: {
              news: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    date: { type: "string" },
                    category: { type: "string" },
                    relevanceScore: { type: "number" },
                    marketImpact: { type: "string" },
                    language: { type: "string" },
                  },
                  required: [
                    "title",
                    "description",
                    "date",
                    "category",
                    "relevanceScore",
                    "marketImpact",
                    "language",
                  ],
                  additionalProperties: false,
                },
              },
              marketMetrics: {
                type: "object",
                properties: {
                  averageInvestment: { type: "number" },
                  trendDirection: { type: "string" },
                  confidenceScore: { type: "number" },
                },
                required: [
                  "averageInvestment",
                  "trendDirection",
                  "confidenceScore",
                ],
                additionalProperties: false,
              },
            },
            required: ["news", "marketMetrics"],
            additionalProperties: false,
          },
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return {
        error: `Erreur lors de la récupération des actualités: ${data.error}`,
      };
    }

    const newsData = JSON.parse(data.choices[0].message.content);

    if (useCache) {
      await fetch("/api/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: cacheKey,
          data: newsData,
          timestamp: Date.now(),
        }),
      });
    }

    return newsData;
  } catch (error) {
    return {
      error: "Erreur lors de la récupération des actualités",
      details: error.message,
    };
  }
}