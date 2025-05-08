"use client";
import React, { useState, useEffect, useRef } from "react";

function MainComponent({
  title,
  description,
  image,
  backgroundColor = "bg-white dark:bg-[#1a1a1a]",
  titleColor = "text-[#0c4a6e] dark:text-green-400",
  descriptionColor = "text-gray-600 dark:text-gray-300",
}) {
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative w-[300px] h-[400px] rounded-xl ${backgroundColor} shadow-lg overflow-hidden transition-all duration-700 ease-out transform cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovering
          ? `perspective(1000px) rotateX(${mousePosition.y * 20}deg) rotateY(${
              mousePosition.x * 20
            }deg)`
          : "perspective(1000px)",
        transition: hovering ? "none" : "all 0.5s ease-out",
      }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-all duration-300 ease-out"
          style={{
            transform: hovering
              ? `scale(1.1) translateZ(50px) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
              : "scale(1) translateZ(0)",
          }}
        />
      </div>

      <div
        className="p-6 transition-transform duration-300"
        style={{
          transform: hovering ? "translateZ(50px)" : "translateZ(0)",
        }}
      >
        <h3
          className={`${titleColor} text-xl font-roboto font-bold mb-3 transition-all duration-300`}
          style={{
            transform: hovering
              ? `translateZ(60px) translateX(${mousePosition.x * 10}px)`
              : "translateZ(0)",
          }}
        >
          {title}
        </h3>

        <p
          className={`${descriptionColor} font-crimson-text transition-all duration-300`}
          style={{
            transform: hovering
              ? `translateZ(40px) translateX(${mousePosition.x * 5}px)`
              : "translateZ(0)",
          }}
        >
          {description}
        </p>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${
            (mousePosition.x + 0.5) * 100
          }% ${
            (mousePosition.y + 0.5) * 100
          }%, rgba(255, 255, 255, 0.1), transparent)`,
          transform: hovering ? "translateZ(20px)" : "translateZ(0)",
        }}
      />

      <div
        className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-xl transition-all duration-300"
        style={{
          transform: hovering ? "translateZ(30px)" : "translateZ(0)",
          boxShadow: hovering
            ? `${mousePosition.x * 20}px ${
                mousePosition.y * 20
              }px 20px rgba(0, 0, 0, 0.2)`
            : "none",
        }}
      />
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] dark:from-[#0f172a] dark:to-[#1e293b]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MainComponent
          title="Production d'Hydrogène"
          description="Découvrez les dernières technologies de production d'hydrogène vert par électrolyse de l'eau."
          image="/images/production.jpg"
        />

        <MainComponent
          title="Stockage Innovant"
          description="Solutions avancées pour le stockage sécurisé de l'hydrogène à grande échelle."
          image="/images/storage.jpg"
          backgroundColor="bg-[#f0fdfa] dark:bg-[#1a1a1a]"
          titleColor="text-[#0f766e] dark:text-green-400"
        />

        <MainComponent
          title="Transport Durable"
          description="Infrastructure de transport d'hydrogène respectueuse de l'environnement."
          image="/images/transport.jpg"
          backgroundColor="bg-[#f0fdf4] dark:bg-[#1a1a1a]"
          titleColor="text-[#15803d] dark:text-green-400"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#0c4a6e] dark:text-green-400 mb-4">
          Variante Interactive
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MainComponent
            title="Innovation Verte"
            description="Technologies de pointe pour un avenir plus propre avec l'hydrogène vert."
            image="/images/innovation.jpg"
            backgroundColor="bg-[#f0fdfa] dark:bg-[#1a1a1a]"
            titleColor="text-[#0f766e] dark:text-green-400"
          />

          <MainComponent
            title="Impact Environnemental"
            description="Réduction des émissions de CO2 grâce à l'adoption de l'hydrogène vert."
            image="/images/environment.jpg"
            backgroundColor="bg-[#f0fdf4] dark:bg-[#1a1a1a]"
            titleColor="text-[#15803d] dark:text-green-400"
          />
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return <StoryComponent />;
}
