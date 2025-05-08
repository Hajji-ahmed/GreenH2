"use client";
import { useState } from "react";
import Navbar from "./Navbar";

export default function HydrogenCalculator() {
  const [hydrogenKg, setHydrogenKg] = useState("");
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");

  // Facteurs de conversion
  const CONVERSION_FACTORS = {
    volume: 11.2,        // m³/kg
    co2: 33,            // kg/kg
    energy: 39.4,       // kWh/kg
    gasoline: 3,        // L/kg
    diesel: 2.7,       // L/kg
    aviationFuel: 2.5,  // L/kg
    methane: 2.75,      // kg/kg
    coal: 4.2          // kg/kg
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const hydrogen = parseFloat(hydrogenKg);
    if (isNaN(hydrogen) || hydrogen <= 0) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      setResults({
        volumeM3: hydrogen * CONVERSION_FACTORS.volume,
        co2AvoidedKg: hydrogen * CONVERSION_FACTORS.co2,
        energyKWh: hydrogen * CONVERSION_FACTORS.energy,
        gasolineSavedL: hydrogen * CONVERSION_FACTORS.gasoline,
        dieselSavedL: hydrogen * CONVERSION_FACTORS.diesel,
        aviationFuelSavedL: hydrogen * CONVERSION_FACTORS.aviationFuel,
        methaneEquivalentKg: hydrogen * CONVERSION_FACTORS.methane,
        coalEquivalentKg: hydrogen * CONVERSION_FACTORS.coal,
        hydrogenInput: hydrogen
      });
      setIsCalculating(false);
    }, 800);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR', { 
      maximumFractionDigits: 2 
    }).format(num);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              Calculateur Hydrogène Vert
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Visualisez l'impact environnemental de l'hydrogène propre avec notre outil haute précision
          </p>
        </div>

        {/* Calculator Container */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header with Glass Effect */}
          <div className="bg-gradient-to-r from-teal-700 to-cyan-700 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center justify-center bg-white/20 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Simulateur d'Énergie Propre
              </h2>
              <p className="text-teal-100 font-light">Transformez les kg d'hydrogène en équivalences concrètes</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-white">
            {["calculator", "comparisons", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-1 text-sm md:text-base font-medium relative transition-colors duration-300 ${
                  activeTab === tab 
                    ? "text-teal-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "calculator" && "Calculateur"}
                {tab === "comparisons" && "Comparaisons"}
                {tab === "about" && "Informations"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8 bg-white">
            {activeTab === "calculator" && (
              <>
                <form onSubmit={handleCalculate} className="mb-8">
                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-medium mb-3 uppercase tracking-wider">
                      Quantité d'hydrogène (kg)
                    </label>
                    <div className="relative max-w-md mx-auto">
                      <input
                        type="number"
                        value={hydrogenKg}
                        onChange={(e) => setHydrogenKg(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-center font-medium transition-all shadow-sm hover:shadow-md"
                        placeholder="Ex: 100"
                        required
                        step="0.01"
                        min="0"
                      />
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        kg
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                  >
                    {isCalculating ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg">Calcul en cours...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">CALCULER L'IMPACT</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {results && (
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Résultats pour {results.hydrogenInput} kg H₂
                      </h3>
                      <span className="bg-teal-100 text-teal-800 text-sm font-bold px-4 py-1.5 rounded-full">
                        {new Date().toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    {/* Main Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Volume gazeux */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-teal-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-teal-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-600">Volume gazeux</h4>
                            <p className="text-3xl font-bold text-gray-800">
                              {formatNumber(results.volumeM3)} <span className="text-sm text-gray-500">m³</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Équivalent en hydrogène gazeux à température ambiante</p>
                      </div>

                      {/* CO2 évité */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-blue-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-600">CO₂ évité</h4>
                            <p className="text-3xl font-bold text-gray-800">
                              {formatNumber(results.co2AvoidedKg)} <span className="text-sm text-gray-500">kg</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Émissions de CO₂ évitées par rapport aux énergies fossiles</p>
                      </div>

                      {/* Énergie équivalente */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-amber-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-amber-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-600">Énergie équivalente</h4>
                            <p className="text-3xl font-bold text-gray-800">
                              {formatNumber(results.energyKWh)} <span className="text-sm text-gray-500">kWh</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Potentiel énergétique de l'hydrogène</p>
                      </div>

                      {/* Essence économisée */}
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-red-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-red-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-600">Essence économisée</h4>
                            <p className="text-3xl font-bold text-gray-800">
                              {formatNumber(results.gasolineSavedL)} <span className="text-sm text-gray-500">litres</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Équivalent en carburant essence</p>
                      </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-cyan-300">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Diesel économisé</h4>
                        <p className="text-2xl font-bold text-cyan-600">
                          {formatNumber(results.dieselSavedL)} <span className="text-sm text-gray-400">L</span>
                        </p>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-purple-300">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Kérosène aviation</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatNumber(results.aviationFuelSavedL)} <span className="text-sm text-gray-400">L</span>
                        </p>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-amber-300">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Équivalent charbon</h4>
                        <p className="text-2xl font-bold text-amber-600">
                          {formatNumber(results.coalEquivalentKg)} <span className="text-sm text-gray-400">kg</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "comparisons" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Comparaisons énergétiques</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Équivalences pour 1 kg d'hydrogène
                  </h4>
                  
                  <div className="space-y-3">
                    {Object.entries({
                      "⚡ Électricité": `${CONVERSION_FACTORS.energy} kWh`,
                      "⛽ Essence": `${CONVERSION_FACTORS.gasoline} litres`,
                      "🚛 Diesel": `${CONVERSION_FACTORS.diesel} litres`,
                      "✈️ Kérosène": `${CONVERSION_FACTORS.aviationFuel} litres`,
                      "🔥 Gaz naturel": `${CONVERSION_FACTORS.methane} kg`,
                      "⚫ Charbon": `${CONVERSION_FACTORS.coal} kg`
                    }).map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-medium text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Impact environnemental
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    L'utilisation de {results ? results.hydrogenInput : '1'} kg d'hydrogène vert permet d'éviter l'émission de {results ? formatNumber(results.co2AvoidedKg) : CONVERSION_FACTORS.co2} kg de CO₂, équivalent à:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200 text-center hover:border-teal-300 transition-all">
                      <span className="block text-4xl mb-2">🌳</span>
                      <span className="block text-xs text-teal-700 font-medium">{results ? Math.round(results.co2AvoidedKg / 21.77) : Math.round(CONVERSION_FACTORS.co2 / 21.77)} arbres</span>
                      <span className="block text-xs text-gray-500 mt-1">année de croissance</span>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 text-center hover:border-blue-300 transition-all">
                      <span className="block text-4xl mb-2">🚗</span>
                      <span className="block text-xs text-blue-700 font-medium">{results ? formatNumber(results.co2AvoidedKg / 2.31) : formatNumber(CONVERSION_FACTORS.co2 / 2.31)} km</span>
                      <span className="block text-xs text-gray-500 mt-1">voiture moyenne</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6 text-gray-600">
                <h3 className="text-xl font-bold text-gray-800 mb-4">À propos de l'hydrogène vert</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Production durable
                  </h4>
                  <p className="text-sm mb-4">
                    L'hydrogène vert est produit par électrolyse de l'eau en utilisant de l'électricité renouvelable, sans émission de gaz à effet de serre.
                  </p>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Facteurs basés sur les dernières données scientifiques</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Méthodologie
                  </h4>
                  <p className="text-sm mb-2">
                    Nos calculs utilisent les facteurs de conversion standards de l'industrie:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>1 kg H₂ = 33-39.4 kWh (PCI-PCS)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Émissions évitées: 33 kg CO₂/kg H₂</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Densité H₂ gazeux: 0.08988 kg/m³</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      <span>Pouvoirs calorifiques comparés</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Certification Premium
                  </h4>
                  <p className="text-sm">
                    Ce calculateur répond aux standards les plus élevés de précision et est régulièrement mis à jour avec les dernières données de recherche.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Calculateur Hydrogène Vert • Données techniques certifiées
          </div>
        </div>
      </div>
    </>
  );
}