"use client";
import React from "react";
import {useState, useEffect, useCallback} from "react";
import { useHandleStreamResponse } from "../utilities/runtime-helpers";
import Hero from "../components/Hero";
import AnimatedCard from "../components/animated-card";
import Chatbot1 from "../components/chatbot-1";
import HydrogenPredictor from "../components/HydrogenPredictor";
import HydrogenCalculator from "../components/HydrogenCalculator";
import WeatherImpactSection from "../components/WeatherImpactSection";
import Objectif from '../components/Objectif';
import HydrogenAssistant from'../components/HydrogenAssistant';
import Partie2 from '../components/partie2';
import Marketplace from '../components/Marketplace';
import Navbar from '../components/Navbar';
import "@fortawesome/fontawesome-free/css/all.min.css";

function MainComponent() {
  const [city, setCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    definition: false,
    cycle: false,
    advantages: false,
    applications: false,
    perspectives: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      setParallaxOffset(scrolled * 0.1);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/get-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la récupération des données météo"
        );
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError(
        err.message || "Erreur lors de la récupération des données météo"
      );
      console.error("Erreur météo:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const handleChatSubmit = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    setUserMessage("");

    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, newMessage],
        stream: true,
      }),
    });
    handleStreamResponse(response);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const productionData = [
    { date: "2025-01", value: 75 },
    { date: "2025-02", value: 82 },
    { date: "2025-03", value: 88 },
    { date: "2025-04", value: 95 },
  ];
  const efficiencyData = [
    { date: "2025-01", value: 65 },
    { date: "2025-02", value: 70 },
    { date: "2025-03", value: 75 },
    { date: "2025-04", value: 80 },
  ];

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-green-200 via-green-400 to-green-600">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <Navbar />
      <main>
        <Hero />
      </main>
      
      <main className="w-full mx-auto px-4">
        <div className="App">
          <Objectif />
        </div>

        {/* Section Structure Moléculaire (inchangée) */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Structure Moléculaire H₂ (Échelle Agrandie)
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Représentation visuelle agrandie de la liaison covalente hydrogène-hydrogène
              </p>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
              <div className="absolute w-[500px] h-[500px] rounded-full bg-green-400/20 animate-pulse-slow blur-xl"></div>
              
              <div className="absolute left-2/2 top-1/2 -translate-x-40 -translate-y-1/2 z-10">
                <div className="w-64 h-64 rounded-full bg-green-400/70 border-4 border-yellow-500 shadow-2xl shadow-yellow-400/40 flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-red-600 shadow-inner shadow-red-800 flex items-center justify-center text-white font-bold text-2xl">
                    +
                  </div>
                </div>
              </div>

              <div className="absolute right-2/2 top-1/2 translate-x-40 -translate-y-1/2 z-10">
                <div className="w-64 h-64 rounded-full bg-green-400/70 border-4 border-yellow-500 shadow-2xl shadow-yellow-400/40 flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-red-600 shadow-inner shadow-red-800 flex items-center justify-center text-white font-bold text-2xl">
                    +
                  </div>
                </div>
              </div>

              <div className="absolute w-48 h-48 rounded-full bg-yellow-300/60 blur-md"></div>

              <div className="absolute left-2/2 top-1/2 -translate-x-8 -translate-y-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-blue-600 shadow-xl shadow-blue-500/50 animate-bounce flex items-center justify-center text-white font-bold text-lg">
                  -
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 translate-x-8 -translate-y-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-blue-600 shadow-xl shadow-blue-500/50 animate-bounce flex items-center justify-center text-white font-bold text-lg" style={{ animationDelay: '0.3s' }}>
                  -
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 w-72 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-3/4 -translate-x-1/2 text-blue-600 dark:text-blue-400 font-bold bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full text-lg shadow-md">
                Liaison covalente simple (longueur : 74 pm)
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-lg mr-3">+</span>
                  <span>Noyau Protonique</span>
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Chaque atome d'hydrogène possède un seul proton dans son noyau, 
                  chargé positivement, représenté ici en rouge vif.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg mr-3">-</span>
                  <span>Doublet Électronique</span>
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Les deux électrons (bleus) forment un nuage partagé entre les atomes, 
                  créant une liaison covalente de type sigma (σ).
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 text-lg mr-3">☁️</span>
                  <span>Orbitale 1s</span>
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Le nuage jaune représente l'orbitale sphérique 1s où les électrons 
                  ont 90% de probabilité de se trouver selon le modèle quantique.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg mr-3">✓</span>
                  <span>Configuration Stable</span>
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Le partage électronique permet à chaque H d'atteindre la configuration 
                  électronique stable de l'hélium (duet électronique).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Info avec affichage conditionnel */}
        <section id="info" className="py-20 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-sky-200/10 dark:bg-sky-500/10 animate-float"
                style={{
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-green-700 dark:text-green-400 mb-16 animate-fade-in-up tracking-tight leading-tight drop-shadow-lg">
  Comprendre l'Hydrogène Vert
</h1>

            <section className="py-12 relative mb-20">
  <div 
    className="bg-green-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
    onClick={() => toggleSection('cycle')}
  >
    <div className="flex justify-between items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c4a6e] dark:text-sky-300 tracking-wide leading-tight">
        Cycle de l'Hydrogène Vert
      </h2>
      <span className="text-2xl transform transition-transform duration-300">
        {expandedSections.cycle ? '−' : '+'}
      </span>
    </div>

    {expandedSections.cycle && (
      <div className="mt-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed my-6">
          Le cycle complet de l'hydrogène vert comprend production, stockage et distribution, 
          formant une chaîne d'énergie propre et durable.
        </p>

        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          {[
            { 
              title: "Production", 
              text: "Électrolyse de l'eau utilisant de l'énergie renouvelable (éolien, solaire, hydraulique)", 
              img: "https://i.ibb.co/5g13tsrn/t-l-chargement-9.jpg" 
            },
            { 
              title: "Stockage", 
              text: "Solutions innovantes pour le stockage sécurisé sous forme gazeuse ou liquide", 
              img: "https://i.ibb.co/TMH4HD08/t-l-chargement-6.jpg" 
            },
            { 
              title: "Distribution", 
              text: "Réseau de distribution intelligent via pipelines ou transport spécialisé", 
              img: "https://i.ibb.co/VctxWqzX/t-l-chargement-1.jpg" 
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-sky-800 dark:text-sky-300 mb-4">
                {item.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {item.text}
              </p>
              <div className="rounded-lg overflow-hidden hover:scale-105 transition-transform duration-500">
                <img 
                  src={item.img}  
                  alt={item.title} 
                  className="w-full h-48 object-cover rounded-lg" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>
            {/* Section Définition */}
            <div className="mb-20">
              <div 
                className="bg-green-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => toggleSection('definition')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-sky-800 dark:text-sky-300">
                    Qu'est-ce que l'Hydrogène Vert ?
                  </h3>
                  <span className="text-2xl">
                    {expandedSections.definition ? '−' : '+'}
                  </span>
                </div>
                
                {expandedSections.definition && (
                  <>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed my-6">
                      L'hydrogène vert est produit par électrolyse de l'eau en utilisant de l'électricité 100% renouvelable.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      {[
                        { value: "100%", label: "Énergie Renouvelable", img: "https://i.ibb.co/dwqVFV2V/image.jpg" },
                        { value: "0", label: "Émission CO2", img: "https://i.ibb.co/BHCSQP2S/images.jpg" },
                        { value: "2050", label: "Objectif Neutralité", img: "https://i.ibb.co/8LnCMtjF/t-l-chargement-4.jpg" }
                      ].map((item, index) => (
                        <div key={index} className="text-center p-4 bg-sky-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg">
                          <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2 hover:scale-110 transition-transform duration-500">
                            {item.value}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 mb-4">
                            {item.label}
                          </div>
                          <div className="aspect-video relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-500">
                            <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

        

            {/* Section Avantages */}
            <div className="mb-20">
              <div 
                className="bg-green-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => toggleSection('advantages')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-sky-800 dark:text-sky-300 text-center">
                    Avantages de l'Hydrogène Vert
                  </h3>
                  <span className="text-2xl">
                    {expandedSections.advantages ? '−' : '+'}
                  </span>
                </div>

                {expandedSections.advantages && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {[
                      {
                        icon: "fas fa-bolt",
                        title: "Source d'Énergie Propre",
                        text: "Aucune émission de gaz à effet de serre lors de sa production et de son utilisation.",
                        img: "https://i.ibb.co/Ps3Fr1CK/t-l-chargement-5.jpg"
                      },
                      {
                        icon: "fas fa-database",
                        title: "Stockage d'Énergie",
                        text: "Excellent moyen de stocker l'énergie renouvelable excédentaire pour une utilisation ultérieure.",
                        img: "https://i.ibb.co/5xfRDdfz/t-l-chargement-6.jpg"
                      },
                      {
                        icon: "fas fa-recycle",
                        title: "Versatilité",
                        text: "Utilisable dans l'industrie, les transports et le stockage d'énergie résidentiel.",
                        img: "https://i.ibb.co/ycyWbqjM/t-l-chargement-7.jpg"
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mb-4 hover:rotate-12 hover:scale-110 transition-transform duration-500">
                          <i className={`${item.icon} text-sky-600 dark:text-sky-400 text-xl`}></i>
                        </div>
                        <h4 className="text-xl font-semibold text-sky-800 dark:text-sky-300 mb-3">
                          {item.title}
                        </h4>
                        <div className="aspect-video relative mb-4 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-500">
                          <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section Applications */}
            <div className="mb-20">
              <div 
                className="bg-green-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => toggleSection('applications')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-sky-800 dark:text-sky-300 text-center">
                    Applications Principales
                  </h3>
                  <span className="text-2xl">
                    {expandedSections.applications ? '−' : '+'}
                  </span>
                </div>

                {expandedSections.applications && (
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {[
                      {
                        title: "Transport",
                        items: [
                          "Véhicules à pile à combustible",
                          "Transport maritime",
                          "Aviation",
                        ],
                        img: "https://i.ibb.co/bR86GPXd/quels-usages-hydrogene-vert-transport-logistique-2.jpg",
                      },
                      {
                        title: "Industrie",
                        items: [
                          "Production d'acier vert",
                          "Industrie chimique",
                          "Raffineries",
                        ],
                        img: "https://i.ibb.co/yBNDFxQr/quelle-utilisation-hydrogene-vert-industrie-1-1.jpg",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                        <div className="aspect-video relative overflow-hidden group">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-sky-800 dark:text-sky-300 mb-4">
                            {item.title}
                          </h4>
                          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            {item.items.map((listItem, i) => (
                              <li key={i} className="flex items-center">
                                <i className="fas fa-check text-green-500 mr-3 hover:rotate-12 transition-transform duration-500"></i>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section Perspectives */}
            <div className="mb-20">
              <div 
                className="bg-green-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => toggleSection('perspectives')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-sky-800 dark:text-sky-300 text-center">
                    Perspectives d'Avenir
                  </h3>
                  <span className="text-2xl">
                    {expandedSections.perspectives ? '−' : '+'}
                  </span>
                </div>

                {expandedSections.perspectives && (
                  <div className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl p-1 mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-semibold text-sky-800 dark:text-sky-300 mb-4">
                            Objectifs 2030
                          </h4>
                          <div className="space-y-4">
                            {[
                              { label: "Capacité de Production", value: "40 GW", width: "40%" },
                              { label: "Réduction des Coûts", value: "-60%", width: "60%" }
                            ].map((item, i) => (
                              <div key={i}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {item.label}
                                  </span>
                                  <span className="text-sky-600 dark:text-sky-400">
                                    {item.value}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-sky-600 h-2 rounded-full"
                                    style={{ width: item.width }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-sky-800 dark:text-sky-300 mb-4">
                            Investissements Prévus
                          </h4>
                          <div className="space-y-4">
                            {[
                              { label: "Europe", value: "470 Mrd €", width: "75%" },
                              { label: "Monde", value: "1500 Mrd €", width: "90%" }
                            ].map((item, i) => (
                              <div key={i}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {item.label}
                                  </span>
                                  <span className="text-sky-600 dark:text-sky-400">
                                    {item.value}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-emerald-600 h-2 rounded-full"
                                    style={{ width: item.width }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Autres sections inchangées */}
        <div className="App">
         
          <Partie2 darkMode={darkMode} />
          <HydrogenAssistant />
        </div>
        <section className="bg-gray-50 py-8 border-t border-gray-200">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Notre Équipe</h3>
        <ul className="space-y-1 text-gray-600">
          <li>Mohamed khalifa - Chef de projet</li>
          <li>Hajji Ahmed - Développeur Frontend</li>
          <li>Mouad Rahoui- Expert H2 </li>
          <li>Belga Abdelmalek - Designer UI/UX</li>
        </ul>
      </div>

      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
        <ul className="space-y-1 text-gray-600">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@benisnassen.com
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +212 6 12 34 56 78
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Suivez-nous</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-emerald-600 hover:text-emerald-800">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-emerald-600 hover:text-emerald-800">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-emerald-600 hover:text-emerald-800">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Projet GeenH2Smart. Tous droits réservés.</p>
    </div>
  </div>
</section>
      </main>

      {/* Chatbot (inchangé) */}
      <Chatbot1
        isOpen={showChatbot}
        onToggle={() => setShowChatbot(!showChatbot)}
        onSendMessage={handleChatSubmit}
        messages={messages}
        streamingMessage={streamingMessage}
        loading={loading}
        darkMode={darkMode}
        position="bottom-right"
      />

      {/* Section Prédicteur (inchangée) */}
      <section>
        <HydrogenPredictor />
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes animateIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .parallax {
          transform: translateY(var(--scroll-offset));
          transition: transform 0.1s ease-out;
        }

        .animate-in {
          animation: animateIn 0.6s ease-out forwards;
        }

        .dark {
          --primary-color: #4ade80;
          --secondary-color: #22c55e;
          --background: var(--background-dark);
          --text: var(--text-dark);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;