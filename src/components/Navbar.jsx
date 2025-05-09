import Link from "next/link";

export default function Navbar() {
  return (
   <nav className="sticky top-0 z-50 bg-emerald-800 backdrop-blur-md p-4 shadow-lg border-b border-emerald-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo ou titre optionnel à gauche */}
          <div className="flex items-center space-x-3">
  <img
    src="https://i.ibb.co/WvPNwVfW/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
    alt="Logo GreenH2"
    className="h-12 w-auto object-contain rounded-lg"
  />
  <Link href="/" className="text-xl font-bold text-white bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
    GreenH2 Smart
  </Link>
</div>
          
          <ul className="flex space-x-4">
            <li>
              <Link 
                href="/" 
                className="
                  font-medium text-base px-4 py-2
                  text-gray-300 hover:text-white
                  transition-colors duration-200
                  hover:bg-gray-800
                  rounded-md
                  flex items-center
                "
              >
                <span className="mr-2">🏠</span>
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                href="/HydrogenCalculator" 
                className="
                  font-medium text-base px-4 py-2
                  text-gray-300 hover:text-white
                  transition-colors duration-200
                "
              >
                <span className="mr-2">🧮</span>
                Calculator
              </Link>
            </li>
            <li>
              <Link 
                href="/weather" 
                className="
                  font-medium text-base px-4 py-2
                  text-gray-300 hover:text-white
                  transition-colors duration-200
                  hover:bg-gray-800
                  rounded-md
                  flex items-center
                "
              >
                <span className="mr-2">⛅</span>
                Impact Météo
              </Link>
            </li>
            <li>
              <Link 
                href="/Marketplace" 
                className="
                  font-medium text-base px-4 py-2
                  text-gray-300 hover:text-white
                  transition-colors duration-200
                  hover:bg-gray-800
                  rounded-md
                  flex items-center
                "
              >
                <span className="mr-2">🛒</span>
                Marketplace
              </Link>
            </li>
            <div className="flex space-x-3 ml-4">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition">
                  Connexion
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition">
                  Inscription
                </button>
              </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}