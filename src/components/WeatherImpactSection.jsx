"use client"
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import chatbot from "./chatbot-1";
const API_KEY = "15a5eea15b1afbe9da9212419dd9cfbb";

export default function HydrogenProductionImpact() {
  const [city, setCity] = useState("Casablanca");
  const [customCity, setCustomCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mise à jour de l'heure en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const moroccanCities = [
    "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
    "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan",
    "Safi", "El Jadida", "Béni Mellal", "Nador", "Taza",
    "Khémisset", "Larache", "Ksar El Kebir", "Asilah", "Dakhla"
  ];

  const fetchWeatherData = async (cityToFetch) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch},MA&appid=${API_KEY}&units=metric&lang=fr`
      );

      if (!response.ok) throw new Error("Ville non trouvée. Veuillez vérifier le nom.");

      const data = await response.json();
      
      const productionAnalysis = calculateProductionPotential(data);
      
      const weather = {
        city: data.name,
        date: currentTime.toLocaleDateString('fr-FR'),
        time: currentTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: degToCompass(data.wind.deg),
        pressure: data.main.pressure,
        cloudCover: data.clouds.all,
        visibility: data.visibility / 1000,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}),
        weatherIcon: data.weather[0].icon,
        description: data.weather[0].description,
        ...productionAnalysis
      };

      setWeatherData(weather);
    } catch (err) {
      setError(err.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  const degToCompass = (deg) => {
    const val = Math.floor((deg / 22.5) + 0.5);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
    return directions[(val % 16)];
  };

  const calculateProductionPotential = (data) => {
    const daylightHours = calculateDaylightHours(data.sys.sunrise, data.sys.sunset);
    const solarRadiation = Math.round((100 - data.clouds.all) * 8 * daylightHours / 24);
    const windPotential = Math.min(data.wind.speed * 10, 100);
    const tempEfficiency = 100 - Math.abs(data.main.temp - 25) * 2;
    const humidityEfficiency = 100 - Math.abs(data.main.humidity - 50) / 2;
    const pressureEfficiency = data.main.pressure > 1010 ? 100 : 80 + (data.main.pressure - 970) / 2;
    
    const productionIndex = Math.round(
      solarRadiation * 0.4 + 
      windPotential * 0.3 + 
      tempEfficiency * 0.15 + 
      humidityEfficiency * 0.1 + 
      pressureEfficiency * 0.05
    );

    return {
      solarRadiation,
      windPotential,
      tempEfficiency,
      humidityEfficiency,
      pressureEfficiency,
      productionIndex,
      productionStatus: getProductionStatus(productionIndex),
      daylightHours,
      electrolysisEfficiency: calculateElectrolysisEfficiency(data)
    };
  };

  const calculateDaylightHours = (sunrise, sunset) => {
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    return (sunsetDate - sunriseDate) / (1000 * 60 * 60);
  };

  const calculateElectrolysisEfficiency = (data) => {
    const baseEfficiency = 75;
    const tempEffect = 0.2 * (25 - data.main.temp);
    const pressureEffect = (data.main.pressure - 1013) * 0.05;
    return Math.max(50, Math.min(90, baseEfficiency + tempEffect + pressureEffect));
  };

  const getProductionStatus = (index) => {
    if (index >= 85) return "Excellent";
    if (index >= 70) return "Très bon";
    if (index >= 55) return "Bon";
    if (index >= 40) return "Moyen";
    return "Faible";
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(useCustomCity ? customCity : city);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  return (
    <>
    <Navbar />
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <section className="py-12 px-4 max-w-7xl mx-auto font-roboto bg-gradient-to-b from-sky-50 to-white min-h-screen">
        <div className="animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-teal-600 mb-2 text-center animate__animated animate__fadeInDown">
            Analyse de Production d'Hydrogène Vert
          </h1>
          <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-teal-500 mb-8 text-center animate__animated animate__fadeInDown animate__delay-1s">
            Impact des Conditions Météorologiques au Maroc
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12 animate__animated animate__fadeIn animate__delay-1s">
            <div className="bg-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-[1.01] hover:shadow-2xl">
              <form onSubmit={handleCitySubmit} className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!useCustomCity}
                      onChange={() => setUseCustomCity(false)}
                      className="form-radio text-sky-600 focus:ring-sky-500 h-4 w-4 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Ville prédéfinie</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={useCustomCity}
                      onChange={() => setUseCustomCity(true)}
                      className="form-radio text-sky-600 focus:ring-sky-500 h-4 w-4 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Saisie manuelle</span>
                  </label>
                </div>

                {!useCustomCity ? (
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Sélectionnez une ville :
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out"
                    >
                      {moroccanCities.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Nom de la ville :
                    </label>
                    <input
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Ex: Errachidia, Ifrane..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-700 hover:to-teal-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyse en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-chart-line mr-2"></i>
                      Analyser la production
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 animate__animated animate__fadeIn animate__delay-1s">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="fas fa-chart-pie text-sky-500 mr-2"></i>
                  Indicateurs clés :
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <IndicatorBadge color="yellow" label="Solaire" icon="sun" />
                  <IndicatorBadge color="blue" label="Éolien" icon="wind" />
                  <IndicatorBadge color="orange" label="Température" icon="thermometer-half" />
                  <IndicatorBadge color="purple" label="Humidité" icon="tint" />
                  <IndicatorBadge color="green" label="Pression" icon="tachometer-alt" />
                  <IndicatorBadge color="red" label="Heures jour" icon="clock" />
                </div>
              </div>
            </div>

            {weatherData ? (
              <div className="bg-white p-6 rounded-2xl shadow-xl transform transition-all hover:scale-[1.01] hover:shadow-2xl animate__animated animate__fadeIn">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{weatherData.city}</h2>
                    <p className="text-gray-600">
                      {weatherData.date} à <span className="font-medium">{weatherData.time}</span>
                    </p>
                    <p className="text-lg capitalize mt-1">{weatherData.description}</p>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}@4x.png`}
                    alt="Conditions météo"
                    className="w-24 h-24 animate__animated animate__pulse"
                  />
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-green-50 p-4 rounded-xl mb-6 border border-sky-100 animate__animated animate__fadeInUp">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Indice de production</h3>
                      <p className="text-3xl font-bold text-gray-800">
                        {weatherData.productionIndex}/100
                      </p>
                      <p className={`text-lg font-semibold ${
                        weatherData.productionStatus === "Excellent" ? "text-green-600" :
                        weatherData.productionStatus === "Très bon" ? "text-blue-600" :
                        weatherData.productionStatus === "Bon" ? "text-sky-600" :
                        weatherData.productionStatus === "Moyen" ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {weatherData.productionStatus}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Efficacité électrolyse</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {weatherData.electrolysisEfficiency}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <WeatherCard
                    icon="sun"
                    label="Ensoleillement"
                    value={`${weatherData.solarRadiation} W/m²`}
                    quality={Math.min(100, weatherData.solarRadiation / 8)}
                    color="yellow"
                  />
                  <WeatherCard
                    icon="wind"
                    label="Potentiel éolien"
                    value={`${weatherData.windSpeed} m/s (${weatherData.windDirection})`}
                    quality={weatherData.windPotential}
                    color="blue"
                  />
                  <WeatherCard
                    icon="thermometer"
                    label="Température"
                    value={`${weatherData.temperature}°C`}
                    quality={weatherData.tempEfficiency}
                    color="orange"
                  />
                  <WeatherCard
                    icon="droplet"
                    label="Humidité"
                    value={`${weatherData.humidity}%`}
                    quality={weatherData.humidityEfficiency}
                    color="purple"
                  />
                  <WeatherCard
                    icon="barometer"
                    label="Pression atm."
                    value={`${weatherData.pressure} hPa`}
                    quality={weatherData.pressureEfficiency}
                    color="green"
                  />
                  <WeatherCard
                    icon="clock"
                    label="Heures de jour"
                    value={`${weatherData.daylightHours.toFixed(1)} h`}
                    quality={(weatherData.daylightHours / 12) * 100}
                    color="red"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-center animate__animated animate__fadeIn">
                {loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des données météo...</p>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-600 animate__animated animate__shakeX">
                    <p className="mb-4">{error}</p>
                    <button
                      onClick={() => fetchWeatherData(useCustomCity ? customCity : city)}
                      className="text-sky-600 hover:underline"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Sélectionnez une ville pour voir les données de production</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {weatherData && (
            <div className="bg-white p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn animate__delay-1s">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-microscope text-sky-500 mr-3"></i>
                Analyse Technique de la Production
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-800 flex items-center">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                    Potentiel Solaire
                  </h4>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 transform transition-all hover:scale-[1.01]">
                    <p className="mb-3">
                      Rayonnement solaire: <strong>{weatherData.solarRadiation} W/m²</strong> 
                      ({weatherData.solarRadiation > 600 ? "Élevé" : "Moyen"})
                    </p>
                    <ProgressBar 
                      value={weatherData.solarRadiation} 
                      max={1000}
                      color="yellow"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      {weatherData.solarRadiation > 700 ? (
                        "Conditions excellentes pour la production photovoltaïque"
                      ) : weatherData.solarRadiation > 400 ? (
                        "Conditions favorables pour l'énergie solaire"
                      ) : (
                        "Production solaire limitée - envisager un mix énergétique"
                      )}
                    </p>
                  </div>

                  <h4 className="text-lg font-medium text-gray-800 flex items-center">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Potentiel Éolien
                  </h4>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 transform transition-all hover:scale-[1.01]">
                    <p className="mb-3">
                      Vitesse du vent: <strong>{weatherData.windSpeed} m/s</strong> 
                      (direction {weatherData.windDirection})
                    </p>
                    <ProgressBar 
                      value={weatherData.windSpeed} 
                      max={15}
                      color="blue"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      {weatherData.windSpeed > 8 ? (
                        "Vents forts - excellent pour l'éolien"
                      ) : weatherData.windSpeed > 5 ? (
                        "Vents modérés - production éolienne possible"
                      ) : (
                        "Vents faibles - production éolienne limitée"
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-800 flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                    Efficacité de l'Électrolyse
                  </h4>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 transform transition-all hover:scale-[1.01]">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm">Température</p>
                        <p className="font-bold">{weatherData.temperature}°C</p>
                        <p className="text-xs text-gray-600">
                          {weatherData.tempEfficiency > 80 ? "Idéale" : "Acceptable"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Pression</p>
                        <p className="font-bold">{weatherData.pressure} hPa</p>
                        <p className="text-xs text-gray-600">
                          {weatherData.pressure > 1010 ? "Optimale" : "Normale"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Efficacité estimée: <strong>{weatherData.electrolysisEfficiency}%</strong>
                    </p>
                    <ProgressBar 
                      value={weatherData.electrolysisEfficiency} 
                      max={100}
                      color="orange"
                    />
                  </div>

                  <h4 className="text-lg font-medium text-gray-800 flex items-center">
                    <span className="w-4 h-4 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                    Disponibilité en Eau
                  </h4>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400 transform transition-all hover:scale-[1.01]">
                    <p className="mb-3">
                      Humidité relative: <strong>{weatherData.humidity}%</strong>
                    </p>
                    <ProgressBar 
                      value={weatherData.humidity} 
                      max={100}
                      color="purple"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      {weatherData.humidity > 70 ? (
                        "Humidité élevée - bonne disponibilité en eau"
                      ) : weatherData.humidity > 40 ? (
                        "Humidité normale - conditions standard"
                      ) : (
                        "Air sec - surveiller l'approvisionnement en eau"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-sky-50 to-teal-50 border-l-4 border-sky-400 rounded-xl p-5 transform transition-all hover:scale-[1.005]">
                <h4 className="text-lg font-semibold text-sky-800 mb-3 flex items-center">
                  <i className="fas fa-lightbulb text-sky-500 mr-2"></i>
                  Recommandations pour la Production
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {weatherData.productionStatus === "Excellent" && (
                    <li className="animate__animated animate__fadeInRight">Conditions optimales - production maximale recommandée</li>
                  )}
                  {weatherData.solarRadiation > 600 && (
                    <li className="animate__animated animate__fadeInRight animate__delay-1s">Privilégier l'électrolyse alimentée par énergie solaire</li>
                  )}
                  {weatherData.windSpeed > 7 && (
                    <li className="animate__animated animate__fadeInRight animate__delay-2s">Intégrer l'énergie éolienne dans le mix énergétique</li>
                  )}
                  {weatherData.temperature > 30 && (
                    <li className="animate__animated animate__fadeInRight">Refroidissement des électrolyseurs recommandé</li>
                  )}
                  {weatherData.humidity < 40 && (
                    <li className="animate__animated animate__fadeInRight animate__delay-1s">Surveiller les ressources en eau pour l'électrolyse</li>
                  )}
                  {weatherData.daylightHours < 10 && (
                    <li className="animate__animated animate__fadeInRight animate__delay-2s">Prévoir un stockage d'énergie pour la nuit</li>
                  )}
                  <li className="animate__animated animate__fadeInRight">Efficacité globale du système estimée à {weatherData.electrolysisEfficiency}%</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <chatbot-1/>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #f8fafc;
        }
        
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .progress-bar {
          transition: width 1s ease-in-out;
        }
      `}</style>
    </>
  );
}

function IndicatorBadge({ color, label, icon }) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`${colorClasses[color]} text-xs font-medium px-3 py-1 rounded-full border flex items-center animate__animated animate__fadeIn`}>
      <i className={`fas fa-${icon} mr-2`}></i>
      {label}
    </span>
  );
}

function WeatherCard({ icon, label, value, quality, color }) {
  const iconMap = {
    sun: 'fa-sun',
    wind: 'fa-wind',
    thermometer: 'fa-thermometer-half',
    droplet: 'fa-tint',
    barometer: 'fa-tachometer-alt',
    clock: 'fa-clock'
  };

  const colorClasses = {
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
    red: 'text-red-500'
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 transform transition-all hover:scale-105 hover:shadow-md animate__animated animate__fadeIn">
      <div className="flex items-center mb-2">
        <i className={`fas ${iconMap[icon]} ${colorClasses[color]} mr-2 animate-pulse`}></i>
        <h3 className="text-sm font-medium text-gray-700">{label}</h3>
      </div>
      <p className="text-lg font-bold text-gray-800 mb-2">{value}</p>
      <ProgressBar value={quality} max={100} color={color} small />
    </div>
  );
}

function ProgressBar({ value, max, color, small = false }) {
  const colorClasses = {
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    sky: 'bg-sky-500'
  };

  const width = Math.min((value / max) * 100, 100);

  return (
    <div className={`bg-gray-200 rounded-full ${small ? 'h-1.5' : 'h-2'} overflow-hidden`}>
      <div
        className={`${colorClasses[color]} h-full rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}