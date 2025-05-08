import { useState, useEffect } from 'react';

function Objectif() {
  const [darkMode, setDarkMode] = useState(false);
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    intro: false,
    features: Array(6).fill(false),
    conclusion: false
  });

  // Animation séquentielle avec des délais progressifs
  useEffect(() => {
    const animationDelays = {
      title: 300,
      intro: 800,
      features: [1200, 1400, 1600, 1800, 2000, 2200],
      conclusion: 2500
    };

    const timer1 = setTimeout(() => {
      setVisibleElements(prev => ({...prev, title: true}));
    }, animationDelays.title);

    const timer2 = setTimeout(() => {
      setVisibleElements(prev => ({...prev, intro: true}));
    }, animationDelays.intro);

    const featureTimers = animationDelays.features.map((delay, index) => {
      return setTimeout(() => {
        setVisibleElements(prev => {
          const newFeatures = [...prev.features];
          newFeatures[index] = true;
          return {...prev, features: newFeatures};
        });
      }, delay);
    });

    const timer3 = setTimeout(() => {
      setVisibleElements(prev => ({...prev, conclusion: true}));
    }, animationDelays.conclusion);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      featureTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <section className="relative py-32 px-4 overflow-hidden min-h-screen">
        {/* Fond animé amélioré */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-cyan-50/20 dark:from-gray-900/95 dark:to-gray-800/95"></div>
          
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-emerald-400/10 dark:bg-cyan-400/10"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out ${Math.random() * 5}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Carte principale avec entrée progressive */}
          <div className="relative z-10 bg-white/85 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-12 backdrop-blur-xl border border-white/40 dark:border-gray-700/60 overflow-hidden">
            {/* Effets visuels */}
            <div className="absolute -inset-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-400/10 to-cyan-400/10 opacity-70 animate-light-sweep"></div>
            </div>
            
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              <div className="absolute inset-0 border-2 border-transparent">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 dark:from-emerald-400/30 dark:to-teal-400/30 rounded-3xl opacity-70"></div>
              </div>
            </div>

            <div className="relative z-20">
              {/* Titre avec animation */}
              <h2 className={`text-5xl md:text-6xl font-extrabold mb-12 relative transition-all duration-1000 ease-out ${visibleElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="relative inline-block">
                  <span className="absolute -inset-4 bg-gradient-to-r from-emerald-600/40 to-teal-500/40 dark:from-emerald-400/40 dark:to-teal-300/40 rounded-full blur-xl"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                    🎯 Objectif de notre plateforme
                  </span>
                </span>
                <span className={`absolute bottom-0 left-0 h-1.5 w-32 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out ${visibleElements.title ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></span>
              </h2>

              {/* Introduction avec animation */}
              <p className={`text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-relaxed transition-all duration-1000 ease-out ${visibleElements.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Notre plateforme a pour mission de <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">faciliter, optimiser et sécuriser</span> la production et la gestion de l'hydrogène vert.
              </p>

              {/* Grille de fonctionnalités avec animations séquentielles */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {[
                  {
                    icon: "fa-chart-line",
                    title: "Optimisation de production",
                    description: "Améliorer l'efficacité grâce à des prédictions intelligentes",
                    gradient: "from-emerald-500 to-teal-400"
                  },
                  {
                    icon: "fa-lock",
                    title: "Transparence et traçabilité",
                    description: "Transactions sécurisées via blockchain",
                    gradient: "from-teal-500 to-cyan-400"
                  },
                  {
                    icon: "fa-info-circle",
                    title: "Informations personnalisées",
                    description: "Données claires sur l'impact environnemental",
                    gradient: "from-cyan-500 to-sky-400"
                  },
                  {
                    icon: "fa-leaf",
                    title: "Transition énergétique",
                    description: "Réduction des émissions de CO₂",
                    gradient: "from-sky-500 to-blue-400"
                  },
                  {
                    icon: "fa-bolt",
                    title: "Énergies renouvelables",
                    description: "Usage dans les secteurs industriels",
                    gradient: "from-blue-500 to-indigo-400"
                  },
                  {
                    icon: "fa-globe",
                    title: "Solution globale",
                    description: "Pour un avenir énergétique durable",
                    gradient: "from-indigo-500 to-purple-400"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`group relative bg-white/60 dark:bg-gray-800/70 rounded-2xl p-8 border border-white/40 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden transform transition-all duration-700 ease-out ${visibleElements.features[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{transitionDelay: `${index * 100 + 300}ms`}}
                  >
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-start space-x-6">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-400 transition-all duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conclusion avec animation */}
              <div className={`mt-20 relative transition-all duration-1000 ease-out ${visibleElements.conclusion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent dark:via-teal-400/30"></div>
                <div className="relative max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/40 dark:border-gray-700/60">
                  <p className="text-xl text-gray-700 dark:text-gray-300 text-center">
                    En alliant <span className="font-semibold text-emerald-600 dark:text-teal-400">innovation technologique</span> et <span className="font-semibold text-emerald-600 dark:text-teal-400">engagement écologique</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(5deg); opacity: 0.8; }
          }

          @keyframes light-sweep {
            0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
            20%, 80% { opacity: 0.7; }
            100% { transform: translateX(100%) skewX(-15deg); opacity: 0; }
          }

          .animate-light-sweep {
            animation: light-sweep 8s infinite linear;
          }
        `}</style>
      </section>
    </div>
  );
}

export default Objectif;