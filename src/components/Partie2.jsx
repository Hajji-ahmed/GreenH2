"use client";
import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Partie2 = ({ darkMode }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // Fonction pour basculer entre les vues sans scroll
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  // Contenu résumé (version courte)
  const summaryContent = (
    <div className="text-center py-12" id="partie2-section">
      <button
        onClick={toggleContent}
        className={`relative overflow-hidden group px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 shadow-md ${
          darkMode
            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white"
            : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center">
          En savoir plus sur notre projet
          <i className="fas fa-arrow-down ml-2 transition-transform group-hover:translate-y-1"></i>
        </span>
        <span
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-r from-teal-700 to-emerald-700"
              : "bg-gradient-to-r from-teal-600 to-emerald-600"
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></span>
      </button>
    </div>
  );

  // Contenu complet
  const fullContent = (
    <div className="relative" id="full-content-section">
      {/* Bouton de retour */}
      <button
        onClick={toggleContent}
        className={`fixed top-6 left-6 z-50 flex items-center space-x-2 ${
          darkMode ? "text-white" : "text-gray-800"
        } bg-opacity-80 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all`}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Retour</span>
      </button>

      {/* Le reste de votre contenu complet reste inchangé */}
      {/* Votre contenu existant de partie2 */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
            Processus de Production
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform -translate-y-1/2 z-0"></div>

            {[
              {
                icon: "fa-solar-panel",
                title: "Énergie Renouvelable",
                items: [
                  "Énergie solaire",
                  "Énergie éolienne",
                  "Hydroélectricité"
                ]
              },
              {
                icon: "fa-bolt",
                title: "Électrolyse",
                items: [
                  "Séparation H2O",
                  "Production H2",
                  "Libération O2"
                ]
              },
              {
                icon: "fa-database",
                title: "Stockage",
                items: [
                  "Compression",
                  "Liquéfaction",
                  "Stockage sécurisé"
                ]
              },
              {
                icon: "fa-truck",
                title: "Distribution",
                items: [
                  "Transport",
                  "Stations H2",
                  "Utilisation finale"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="relative z-10 group">
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700`}>
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {item.items.map((listItem, idx) => (
                      <li key={idx} className="flex items-center">
                        <i className="fas fa-check text-emerald-500 mr-2"></i>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-500 rotate-45 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types d'Hydrogène */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
            Types d'Hydrogène
          </h2>

          {/* Cartes Premium */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                type: "Gris",
                color: "from-gray-400 to-gray-600",
                icon: "fa-industry",
                source: "Gaz naturel (vaporeformage)",
                emissions: "9-10 kg CO₂/kg H₂",
                cost: "1-2 €/kg",
                iconColor: "text-gray-500"
              },
              {
                type: "Bleu",
                color: "from-blue-400 to-blue-600",
                icon: "fa-filter",
                source: "Gaz naturel + CCS",
                emissions: "1-3 kg CO₂/kg H₂",
                cost: "2-3 €/kg",
                iconColor: "text-blue-500"
              },
              {
                type: "Vert",
                color: "from-emerald-400 to-emerald-600",
                icon: "fa-leaf",
                source: "Énergies renouvelables",
                emissions: "0 kg CO₂/kg H₂",
                cost: "3-6 €/kg",
                iconColor: "text-emerald-500"
              },
              {
                type: "Jaune",
                color: "from-amber-400 to-amber-600",
                icon: "fa-atom",
                source: "Énergie nucléaire",
                emissions: "<1 kg CO₂/kg H₂",
                cost: "3-5 €/kg",
                iconColor: "text-amber-500"
              }
            ].map((item, index) => (
              <div key={index} className={`relative group overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}>
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${item.iconColor} mr-4`}>
                      <i className={`fas ${item.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{item.type}</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <i className={`fas fa-fire ${item.iconColor} mr-3 mt-1`}></i>
                      <span>{item.source}</span>
                    </li>
                    <li className="flex items-start">
                      <i className={`fas fa-cloud ${item.iconColor} mr-3 mt-1`}></i>
                      <span>{item.emissions}</span>
                    </li>
                    <li className="flex items-start">
                      <i className={`fas fa-euro-sign ${item.iconColor} mr-3 mt-1`}></i>
                      <span>{item.cost}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau Comparatif Premium */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-20 border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 py-6 px-8">
              <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
                Comparaison Technique
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Critère</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gris</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bleu</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-emerald-500 uppercase tracking-wider">Vert</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jaune</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      critère: "Source",
                      gris: "Gaz naturel",
                      bleu: "Gaz naturel + CCS",
                      vert: "Énergies renouvelables",
                      jaune: "Énergie nucléaire"
                    },
                    {
                      critère: "Émissions CO₂",
                      gris: "9-10 kg/kg H₂",
                      bleu: "1-3 kg/kg H₂",
                      vert: "0 kg/kg H₂",
                      jaune: "<1 kg/kg H₂"
                    },
                    {
                      critère: "Coût",
                      gris: "1-2 €/kg",
                      bleu: "2-3 €/kg",
                      vert: "3-6 €/kg",
                      jaune: "3-5 €/kg"
                    },
                    {
                      critère: "Maturité",
                      gris: "Élevée",
                      bleu: "Moyenne",
                      vert: "Croissante",
                      jaune: "Émergente"
                    },
                    {
                      critère: "Durabilité",
                      gris: "Faible",
                      bleu: "Moyenne",
                      vert: "Élevée",
                      jaune: "Élevée"
                    }
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{row.critère}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.gris}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.bleu}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-500">{row.vert}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.jaune}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphique Premium */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-20 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
              Émissions de CO₂ Comparatives
            </h3>
            <div className="h-64 flex items-end justify-center gap-8 px-8">
              {[
                { type: "Gris", value: 10, color: "bg-gradient-to-t from-gray-400 to-gray-600" },
                { type: "Bleu", value: 2, color: "bg-gradient-to-t from-blue-400 to-blue-600" },
                { type: "Vert", value: 0, color: "bg-gradient-to-t from-emerald-400 to-emerald-600" },
                { type: "Jaune", value: 0.5, color: "bg-gradient-to-t from-amber-400 to-amber-600" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center w-20">
                  <div 
                    className={`w-full rounded-t-lg ${item.color} transition-all duration-1000 ease-out`}
                    style={{ height: `${item.value * 6}%` }}
                  ></div>
                  <div className="mt-4 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-white shadow-sm">
                    {item.value}
                  </div>
                  <span className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">{item.type}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">kg CO₂/kg H₂</span>
                </div>
              ))}
            </div>
          </div>

          {/* Légende Premium */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { color: "bg-gray-500", text: "Hydrogène Gris", desc: "Émissions élevées" },
              { color: "bg-blue-500", text: "Hydrogène Bleu", desc: "Émissions réduites" },
              { color: "bg-emerald-500", text: "Hydrogène Vert", desc: "Zéro émission" },
              { color: "bg-amber-500", text: "Hydrogène Jaune", desc: "Très faibles émissions" }
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white">{item.text}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hydrogène Vert en Détail */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500 inline-block">
              L'Hydrogène Vert en Détail
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Grille d'informations premium */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* Carte Technologie */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb" 
                  alt="Technologie d'électrolyse"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white">Technologie Clé</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium">Électrolyse PEM</span>
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium">Électrolyse alcaline</span>
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium">SOEC</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Les technologies d'électrolyse modernes permettent de produire de l'hydrogène vert avec des efficacités atteignant 80%. 
                  Les progrès récents réduisent significativement les coûts de production.
                </p>
                <button className="text-teal-600 dark:text-teal-400 font-medium flex items-center group">
                  En savoir plus
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>

            {/* Carte Avantages */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-6">
                  <i className="fas fa-star text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Avantages Clés</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: "fa-bolt",
                    title: "Stockage d'énergie",
                    desc: "Solution idéale pour stocker les surplus d'énergie renouvelable",
                    iconColor: "text-teal-500"
                  },
                  {
                    icon: "fa-industry",
                    title: "Décarbonation",
                    desc: "Permet de décarboner les industries lourdes et la mobilité",
                    iconColor: "text-teal-500"
                  },
                  {
                    icon: "fa-globe-europe",
                    title: "Polyvalence",
                    desc: "Utilisable dans multiples secteurs : transport, industrie, chauffage",
                    iconColor: "text-teal-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-5 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                      <i className={`fas ${item.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Chiffres Clés */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl shadow-xl p-12 mb-24 border border-teal-100 dark:border-teal-900/50">
            <h3 className="text-2xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
              Chiffres Clés
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: "80%",
                  label: "Efficacité des nouveaux électrolyseurs",
                  icon: "fa-percentage"
                },
                {
                  value: "10x",
                  label: "Croissance prévue d'ici 2030",
                  icon: "fa-chart-line"
                },
                {
                  value: "€3/kg",
                  label: "Coût cible en 2030",
                  icon: "fa-euro-sign"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mx-auto mb-6 border-2 border-teal-100 dark:border-teal-900">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
                      {item.value}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-4">
                    <i className={`fas ${item.icon} text-xl`}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.label}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Premium */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-20 border border-gray-200 dark:border-gray-700">
            <div className="p-12 bg-gradient-to-r from-teal-600 to-emerald-600">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-3">Projets Mondiaux</h3>
                <p className="text-teal-100">Initiatives stratégiques pour un avenir durable</p>
              </div>
            </div>

            <div className="p-12">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
                
                {/* Timeline Items */}
                <div className="space-y-20">
                  {[
                    {
                      year: "2023",
                      title: "Projet Nour • Maroc",
                      desc: "Développement de 10 GW d'infrastructure solaire",
                      color: "bg-gradient-to-r from-amber-500 to-orange-500",
                      icon: "☀️",
                      stats: "Capacité : 2.5M tonnes H2/an"
                    },
                    {
                      year: "2025",
                      title: "HyDeal Europe",
                      desc: "Premier réseau continental d'hydrogène vert",
                      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
                      icon: "🌍",
                      stats: "Investissement : 8.2B€"
                    },
                    {
                      year: "2030",
                      title: "Asia Renewable Hub",
                      desc: "Le plus grand centre énergétique au monde",
                      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
                      icon: "⚡",
                      stats: "Production : 26GW"
                    }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className={`relative flex ${index % 2 === 0 ? 'justify-start pr-16 lg:pr-32' : 'justify-end pl-16 lg:pl-32'}`}
                    >
                      <div className="w-full max-w-lg bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                        <div className={`h-2 ${item.color}`}></div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="text-2xl">{item.icon}</div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">{item.year}</div>
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{item.desc}</p>
                          <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                            {item.stats}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="text-center">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 group">
                  <span className="flex items-center justify-center">
                    Voir tous les projets
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Distribution Mondiale */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Distribution Mondiale de la Production d'Hydrogène Vert
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-full">
                <img
                  src="https://i.ibb.co/f5B7zGP/file-20241009-15-5wpaz0.jpg"
                  alt="Distribution mondiale de la production d'hydrogène vert"
                  className="rounded-xl shadow-md w-full"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Concentration de la production
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  La production d'hydrogène vert est en forte croissance dans les régions
                  dotées de sources d'énergie renouvelable abondantes. L'Europe, en particulier
                  l'Allemagne et les pays nordiques, investit massivement dans les
                  technologies de l'électrolyse. Le Moyen-Orient, l'Australie et certaines
                  régions d'Afrique développent également des projets à grande échelle grâce
                  à leur fort potentiel solaire.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Cette carte illustre la répartition globale actuelle de la production
                  d'hydrogène vert, mettant en évidence les zones stratégiques et les pôles
                  de développement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Écosystème de l'Hydrogène Vert */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500 mb-4">
              L'Écosystème de l'Hydrogène Vert
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Applications Industrielles */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-20 border border-gray-200 dark:border-gray-700">
            <div className="grid lg:grid-cols-2">
              <div className="p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 mr-6">
                    <i className="fas fa-industry text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Applications Industrielles</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: "fa-fire",
                      title: "Production d'acier",
                      desc: "Remplace le charbon dans la réduction du minerai de fer"
                    },
                    {
                      icon: "fa-flask",
                      title: "Industrie chimique",
                      desc: "Production d'ammoniac et engrais décarbonés"
                    },
                    {
                      icon: "fa-gas-pump",
                      title: "Raffineries",
                      desc: "Désulfuration et conversion des carburants"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-5 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
                        <i className={`fas ${item.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center p-8">
                <img 
                  src="https://i.ibb.co/fYRb9KgN/hydrogene-vert-solution-energetique-prometteuse-Le-Monde-de-l-Energie-e1685389275758.jpg" 
                  alt="Applications industrielles"
                  className="rounded-xl shadow-lg w-full h-auto max-w-md"
                />
              </div>
            </div>
          </div>

          {/* Transport */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {[
              {
                title: "Transport Lourd",
                icon: "fa-truck",
                color: "from-teal-600 to-emerald-500",
                items: [
                  "Camions longue distance (autonomie 800+ km)",
                  "Temps de ravitaillement 5 minutes",
                  "Solutions pour bus et véhicules utilitaires"
                ]
              },
              {
                title: "Transport Maritime",
                icon: "fa-ship",
                color: "from-emerald-500 to-teal-600",
                items: [
                  "Bunkérisation d'ammoniac vert",
                  "Solutions pour les navires de croisière",
                  "Projets pilotes en Europe et Asie"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className={`h-48 bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                  <i className={`fas ${item.icon} text-white text-5xl`}></i>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{item.title}</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    {item.items.map((listItem, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fas fa-check text-teal-500 mr-3 mt-1"></i>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Solutions de Stockage */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl shadow-xl p-12 mb-20 border border-teal-100 dark:border-teal-900/50">
            <h3 className="text-2xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
              Solutions de Stockage
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "fa-gas-pump",
                  title: "Compression gazeuse",
                  desc: "Stockage à 350-700 bar",
                  stats: "1-2% perte/jour"
                },
                {
                  icon: "fa-temperature-low",
                  title: "Liquéfaction",
                  desc: "-253°C pour état liquide",
                  stats: "Densité énergétique ×2"
                },
                {
                  icon: "fa-cube",
                  title: "Stockage solide",
                  desc: "Hydrures métalliques",
                  stats: "Sécurité améliorée"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-6">
                    <i className={`fas ${item.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.desc}</p>
                  <div className="text-sm font-medium text-teal-600 dark:text-teal-400">{item.stats}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Initiatives Mondiales */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
              Initiatives Mondiales
            </h3>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <i className="fas fa-flag-europe text-teal-500 text-2xl mr-4"></i>
                  Stratégie Européenne
                </h4>
                <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Objectif : 10 millions de tonnes d'H₂ vert d'ici 2030
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Investissements prévus : 470 milliards €
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Corridors H₂ pour le transport
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                  <i className="fas fa-globe-africa text-teal-500 text-2xl mr-4"></i>
                  Projets Africains
                </h4>
                <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Projet Nour au Maroc (10 GW)
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Initiative Namibienne (5 GW)
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-500 mr-3 mt-1"></i>
                    Partenariats UE-Afrique
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return showFullContent ? fullContent : summaryContent;
};

export default Partie2;