async function handler({ city = "Paris", useCache = true }) {
  const apiKey = "15a5eea15b1afbe9da9212419dd9cfbb";
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cacheExpiry = 1800000;

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

  try {
    const [currentWeather, forecastResponse] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=fr`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=fr`
      ),
    ]);

    if (!currentWeather.ok || !forecastResponse.ok) {
      if (currentWeather.status === 404 || forecastResponse.status === 404) {
        return { error: "Ville non trouvée" };
      }
      return { error: "Service météo indisponible" };
    }

    const [weatherData, forecastData] = await Promise.all([
      currentWeather.json(),
      forecastResponse.json(),
    ]);

    const production = calculateProduction(weatherData, forecastData);
    const impact = analyzeImpact(production, weatherData);

    const result = {
      current: {
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        cloudCover: weatherData.clouds.all,
        icon: weatherData.weather[0].icon,
        feelsLike: Math.round(weatherData.main.feels_like),
        city: weatherData.name,
        country: weatherData.sys.country,
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
          "fr-FR"
        ),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
          "fr-FR"
        ),
      },
      forecast: forecastData.list.slice(0, 8).map((item) => ({
        timestamp: item.dt * 1000,
        temperature: Math.round(item.main.temp),
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
      production: {
        current: production.current,
        forecast: production.forecast,
        efficiency: production.efficiency,
      },
      impact: {
        environmentalScore: impact.environmentalScore,
        co2Reduction: impact.co2Reduction,
        recommendation: impact.recommendation,
      },
      timestamp: Date.now(),
    };

    if (useCache) {
      await fetch("/api/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: cacheKey,
          data: result,
          timestamp: Date.now(),
        }),
      });
    }

    return result;
  } catch (error) {
    return { error: "Impossible de récupérer les données météo" };
  }
}

function calculateProduction(weather, forecastData) {
  const baseEfficiency = 0.7;
  const optimalTemp = 25;
  const optimalWindSpeed = 5;
  const optimalHumidity = 50;

  const calculateEfficiencyScore = (temp, wind, humidity) => {
    const tempScore = 1 - Math.abs(temp - optimalTemp) / 50;
    const windScore = Math.min(wind / optimalWindSpeed, 2);
    const humidityScore = 1 - Math.abs(humidity - optimalHumidity) / 100;
    return ((tempScore + windScore + humidityScore) / 3) * baseEfficiency;
  };

  const current = calculateEfficiencyScore(
    weather.main.temp,
    weather.wind.speed,
    weather.main.humidity
  );

  const forecastEfficiency = forecastData.list.slice(0, 8).map((item) => ({
    timestamp: item.dt * 1000,
    efficiency: calculateEfficiencyScore(
      item.main.temp,
      item.wind.speed,
      item.main.humidity
    ),
  }));

  return {
    current: Math.round(current * 100),
    forecast: forecastEfficiency,
    efficiency: Math.round(current * 100),
  };
}

function analyzeImpact(production, weather) {
  const baselineCO2 = 0.5;
  const co2Reduction = (production.current / 100) * baselineCO2;

  const getRecommendation = (efficiency, weather) => {
    if (efficiency < 50) {
      if (weather.main.temp > 30)
        return "Considérer le refroidissement des installations";
      if (weather.wind.speed < 2)
        return "Production sous-optimale due au vent faible";
      if (weather.main.humidity > 70)
        return "Humidité élevée affectant l'efficacité";
      return "Conditions générales sous-optimales";
    }
    return "Conditions favorables pour la production";
  };

  return {
    environmentalScore: Math.round(production.current),
    co2Reduction: Math.round(co2Reduction * 100) / 100,
    recommendation: getRecommendation(production.current, weather),
  };
}