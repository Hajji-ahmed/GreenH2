"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const products = [
    {
      id: 1,
      name: "Électrolyseur PEM 1MW",
      description: "Solution industrielle haute performance",
      specs: "450kg H2/jour • 75% efficacité • 80,000h durée de vie",
      detailedSpecs: [
        "Technologie: Membrane Échangeuse de Protons",
        "Pression de sortie: 30 bar",
        "Consommation: 50 kWh/kg",
        "Dimensions: 2.5m x 1.8m x 2m",
        "Garantie: 5 ans"
      ],
      price: "1 250 000 €",
      image: "https://i.ibb.co/0p3bRN5G/t-l-chargement.jpg",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Kit Solaire Intégré 200kW",
      description: "Production autonome d'hydrogène vert",
      specs: "90kg H2/jour • 0 émission • Installation clé en main",
      detailedSpecs: [
        "1200 m² de panneaux solaires",
        "Batterie tampon 100 kWh",
        "Compresseur intégré 350 bar",
        "Monitoring à distance",
        "Certifications CE et UL"
      ],
      price: "320 000 €",
      image: "https://i.ibb.co/cS4fNFFY/t-l-chargement-1.jpg",
      badge: "Écologique"
    },
    {
      id: 3,
      name: "Station de Recharge Mobile",
      description: "Pour véhicules à hydrogène",
      specs: "20kg/jour • Interface tactile • Paiement sans contact",
      detailedSpecs: [
        "Pression maximale: 700 bar",
        "Dispenseur double buse",
        "Ecran tactile 10\"",
        "Traçabilité complète",
        "Option solaire disponible"
      ],
      price: "95 000 €",
      image: "https://i.ibb.co/TBPzdS7r/t-l-chargement-2.jpg"
    }
  ];

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
     <Navbar/>
    <div className="bg-gray-50">
      {/* Section Marketplace */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
          Marketplace
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Solutions complètes pour la production d'hydrogène vert
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-green-600 font-medium text-sm mb-3">{product.description}</p>
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  {product.specs.split(" • ").map((spec, i) => (
                    <div key={i} className="flex items-start">
                      <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <button 
                    onClick={() => handleShowDetails(product)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors text-sm"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Vente d'Hydrogène Vert */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
              Achetez Hydrogène Vert
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hydrogène 100% vert produit à partir d'énergies renouvelables
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Offre 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-4">
                Standard
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hydrogène Comprimé</h3>
              <p className="text-gray-600 text-sm mb-4">Livraison en bouteilles ou tube trailer</p>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">8,50 €</span>
                <span className="text-gray-500 text-sm"> / kg (350 bar)</span>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pureté 99,999%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Origine éolienne certifiée</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Disponibilité sous 72h</span>
                </li>
              </ul>

              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Commander
              </button>
            </div>

            {/* Offre 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-4">
                Premium
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hydrogène Liquide</h3>
              <p className="text-gray-600 text-sm mb-4">Solution pour gros volumes</p>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">6,20 €</span>
                <span className="text-gray-500 text-sm"> / kg (volume 1000kg)</span>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pureté 99,9999%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Origine solaire certifiée</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contrat long terme disponible</span>
                </li>
              </ul>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Demander un devis
              </button>
            </div>

            {/* Offre 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
              <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-4">
                Sur Mesure
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Solution Intégrée</h3>
              <p className="text-gray-600 text-sm mb-4">Production sur site clé en main</p>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">Sur mesure</span>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Étude personnalisée</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Financement possible</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maintenance incluse</span>
                </li>
              </ul>

              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Contactez nos experts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de détails */}
      {showDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button 
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-lg text-green-600 font-medium mb-4">{selectedProduct.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Caractéristiques techniques</h4>
                    <ul className="space-y-2">
                      {selectedProduct.detailedSpecs.map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{selectedProduct.price}</span>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors shadow-sm font-medium">
                      Demander un devis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}