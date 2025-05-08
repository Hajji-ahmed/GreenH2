"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  XMarkIcon,
  ArrowRightIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

const Hero = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const images = [
    {
      url: "https://i.ibb.co/Kpw70kCp/Whats-App-Image-2023-12-15-at-14-25-40.jpg",
      title: "GREENH2 Smart",
      subtitle: "L'innovation durable pour l'hydrogène vert"
    },
    {
      url: "https://i.ibb.co/WvPNwVfW/Whats-App-Image-2025-03-17-at-01-40-31.jpg",
      title: "Technologie Avancée",
      subtitle: "Combinaison d'IA et Blockchain"
    },
    {
      url: "https://i.ibb.co/8LnCMtjF/t-l-chargement-4.jpg",
      title: "Durabilité Énergétique",
      subtitle: "Solutions respectueuses de l'environnement"
    }
  ];

  const features = [
    {
      icon: <BoltIcon className="w-6 h-6 text-amber-400" />,
      title: "Analyse en temps réel",
      description: "Surveillance continue des performances",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-400/30",
    },
    {
      icon: <CpuChipIcon className="w-6 h-6 text-indigo-400" />,
      title: "Optimisation IA",
      description: "Algorithmes intelligents pour une efficacité maximale",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-400/30",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />,
      title: "Sécurité blockchain",
      description: "Données immuables et transparentes",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-400/30",
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6 text-cyan-400" />,
      title: "Durabilité",
      description: "Solutions respectueuses de l'environnement",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-400/30",
    },
  ];

  const stats = [
    { value: "100%", label: "Traçabilité", color: "text-amber-300" },
    { value: "+30%", label: "Efficacité", color: "text-indigo-300" },
    { value: "0%", label: "Émissions", color: "text-emerald-300" },
    { value: "∞", label: "Scalabilité", color: "text-cyan-300" },
  ];

  // Vérifier si on est sur mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const startRotation = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);
  };

  const stopRotation = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isPlaying) {
      startRotation();
    } else {
      stopRotation();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isMobile]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    if (isPlaying) startRotation();
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    if (isPlaying) startRotation();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (isPlaying) startRotation();
  };

  const handlePlayVideo = () => {
    setShowVideoModal(true);
    setIsVideoPlaying(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
  };

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  // Version mobile
  if (isMobile) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gray-900">
        {/* Image de fond fixe */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://i.ibb.co/VWFfYctD/images-6.jpg)`,
            filter: 'brightness(0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 h-screen flex flex-col">
          {/* Header */}
          <nav className="px-6 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co/WvPNwVfW/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                alt="Logo GreenH2"
                className="h-10 w-auto object-contain rounded-lg"
              />
              <span className="text-lg font-bold text-white bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                GREENH2 SMART
              </span>
            </div>
          </nav>

          {/* Contenu principal */}
          <div className="flex-grow flex flex-col justify-center px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
                  GREENH2 Smart
                </span>
              </h1>
              <p className="text-xl font-light text-white/80 mb-6 leading-relaxed">
                Intelligence Artificielle & Blockchain pour une Gestion Optimisée de l'Hydrogène Vert
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col gap-3 mb-8">
              <button className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 font-medium py-3 px-6 rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg">
                <span>Découvrir</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlayVideo}
                className="border border-white/30 text-white hover:border-white/50 font-medium py-3 px-6 rounded-full transition-all backdrop-blur-sm hover:bg-white/10 flex items-center justify-center space-x-2"
              >
                <PlayIcon className="w-4 h-4 text-amber-300" />
                <span>Voir la démo</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`${feature.bgColor} ${feature.borderColor} backdrop-blur-sm p-4 rounded-lg border hover:shadow-md transition-all duration-300`}
                >
                  <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center mb-2 mx-auto border ${feature.borderColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/70 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flèche de scroll pour mobile */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pb-6">
            <button 
              onClick={handleScrollDown}
              className="animate-bounce p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Scroll vers le bas"
            >
              <ChevronDownIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Modal */}
        {showVideoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <div
              className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
              <div className="aspect-video w-full">
                {isVideoPlaying && (
                  <iframe
                    ref={videoRef}
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/Z9rX1Uv_7CA?autoplay=1&rel=0`}
                    title="Démo GreenH2 Smart"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Version Desktop
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Image de fond fixe */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://i.ibb.co/j9N4JFkL/images-7.jpg)`,
          filter: 'brightness(0.6)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      <div className="relative h-screen flex items-start pt-12">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text Content - Gauche */}
            <div className="lg:w-1/2 text-white mt-8">
              {/* Header */}
              <nav className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://i.ibb.co/WvPNwVfW/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                    alt="Logo GreenH2"
                    className="h-12 w-auto object-contain rounded-lg"
                  />
                  <span className="text-xl font-bold text-white bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    GREENH2 SMART
                  </span>
                </div>
              </nav>

              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <SparklesIcon className="w-5 h-5 text-amber-300 mr-2" />
                  <span className="text-sm font-medium text-white">
                    L'innovation durable
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
                    GREENH2
                  </span>{" "}
                  Smart
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-6">
                  Intelligence Artificielle <span className="text-indigo-300">&</span> Blockchain
                  <br />
                  pour une <span className="text-emerald-300">Gestion Optimisée</span> de l'Hydrogène Vert
                </h2>
                
                <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                  Plateforme innovante combinant <span className="text-amber-300 font-medium">technologies avancées</span> et <span className="text-emerald-300 font-medium">durabilité énergétique</span> pour révolutionner la production d'hydrogène vert.
                </p>
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>Découvrir</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={handlePlayVideo}
                  className="px-8 py-3.5 border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group backdrop-blur-sm"
                >
                  <PlayIcon className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
                  <span>Voir la démo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl font-bold ${stat.color} drop-shadow-lg`}>{stat.value}</div>
                    <div className="text-white/80 uppercase text-xs tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Container - Droite */}
            <div className="lg:w-1/2 relative h-[500px] flex items-center justify-end mt-8">
              <div className="relative w-full max-w-2xl h-full ml-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-full max-w-xl h-[450px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
                      index === currentIndex ? 'opacity-100 scale-110 z-10 right-0' : 
                      index === (currentIndex + 1) % images.length ? 'opacity-80 scale-95 z-5 right-1/4' :
                      index === (currentIndex - 1 + images.length) % images.length ? 'opacity-80 scale-95 z-5 left-1/4' : 
                      'opacity-0 scale-80 z-0'
                    }`}
                    style={{
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transformOrigin: 'center',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <h2 className="text-2xl font-bold text-white drop-shadow-md">{image.title}</h2>
                        <p className="text-white/90 italic text-base drop-shadow-md">{image.subtitle}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg">
                <button
                  onClick={prevSlide}
                  className="p-2 text-white hover:text-amber-400 transition-all"
                  aria-label="Image précédente"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-amber-400 w-4' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-2 text-white hover:text-amber-400 transition-all"
                  aria-label="Image suivante"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 text-white hover:text-amber-400 transition-all ml-2"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flèche de scroll pour desktop */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
          <button 
            onClick={handleScrollDown}
            className="animate-bounce p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all group"
            aria-label="Scroll vers le bas"
          >
            <ChevronDownIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <div className="aspect-video w-full">
              {isVideoPlaying && (
                <iframe
                  ref={videoRef}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/Z9rX1Uv_7CA?autoplay=1&rel=0`}
                  title="Démo GreenH2 Smart"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-amber-400/20 blur-xl animate-float-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-emerald-400/20 blur-xl animate-float-medium"></div>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-5px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;