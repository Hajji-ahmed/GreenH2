"use client";
import { useState, useEffect, useRef } from "react";

export default function HydrogenPredictor() {
  const [city, setCity] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ city }),
      });

      if (!response.ok) throw new Error("Erreur de récupération des données");

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paragraphs = doc.querySelectorAll("p");

      setPrediction({
        ghi: paragraphs[0]?.textContent.split(": ")[1],
        cloudCover: paragraphs[1]?.textContent.split(": ")[1],
        zenithAngle: paragraphs[2]?.textContent.split(": ")[1],
        temperature: paragraphs[3]?.textContent.split(": ")[1],
        windSpeed: paragraphs[4]?.textContent.split(": ")[1],
        production: paragraphs[5]?.textContent.split(": ")[1],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 15;
    const angleY = (centerX - x) / 15;

    button.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    button.style.boxShadow = `${-angleY}px ${angleX}px 15px rgba(16, 185, 129, 0.3)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    
    button.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    button.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
  };

  return (
    <>
      {/* Bouton flottant avec animation 3D premium */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`floating-button fixed bottom-0 right-0 bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-5 rounded-full shadow-xl transition-all duration-300 flex items-center space-x-3 z-50
          ${isOpen ? 'rotate-45 scale-90' : 'rotate-0 scale-100'}`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          willChange: 'transform, box-shadow'
        }}
      >
        <span className="text-2xl block" style={{ transform: 'translateZ(20px)' }}>🌱</span>
        <span 
          className="font-medium text-lg tracking-wide block" 
          style={{ transform: 'translateZ(20px)' }}
        >
          H₂ Predictor
        </span>
        
        {/* Effet de lumière 3D */}
        <span 
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, white 0%, transparent 70%)',
            transform: 'translateZ(15px)'
          }}
        />
      </button>

      {/* Overlay et modal premium */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 z-40 backdrop-blur-sm">
          <div className={`max-w-lg w-full mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transition-all duration-500
            ${isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
            
            {/* Header luxueux */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-30"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-3">
                  <span className="text-amber-200">Hydrogen</span> 
                  <span className="text-white">Predictor</span>
                </h2>
                <p className="text-teal-100 text-center mt-1 text-sm">Prédiction de production haute précision</p>
              </div>
            </div>

            {/* Corps du modal */}
            <div className="p-6">
              <form onSubmit={handlePredict} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="Saisissez une ville..."
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span className="flex items-center px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Analyser
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-800">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {prediction && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
                      <p className="text-slate-500 text-sm mb-1">Irradiation Solaire</p>
                      <p className="text-2xl font-bold text-teal-600">{prediction.ghi}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                      <p className="text-slate-500 text-sm mb-1">Couverture Nuageuse</p>
                      <p className="text-2xl font-bold text-blue-600">{prediction.cloudCover}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-purple-300 transition-all">
                      <p className="text-slate-500 text-sm mb-1">Angle Zénithal</p>
                      <p className="text-2xl font-bold text-purple-600">{prediction.zenithAngle}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 transition-all">
                      <p className="text-slate-500 text-sm mb-1">Température</p>
                      <p className="text-2xl font-bold text-amber-600">{prediction.temperature}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 mb-2">Vitesse du Vent</p>
                    <p className="text-3xl font-bold text-cyan-600 mb-6">{prediction.windSpeed}</p>
                    
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-slate-500 mb-1">Production Estimée</p>
                      <p className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        {prediction.production}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
              <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Hydrogen Vision</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles globaux pour l'animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          50% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg); }
        }
        .floating-button {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
