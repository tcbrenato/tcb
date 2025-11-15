import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Accueil", path: "/" },
  { name: "À Propos", path: "/about" },
  { name: "Prestations", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link to="/" className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span className="text-white">RÉNATO</span>
            <span className="text-blue-400">TCHOBO</span>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white/70 hover:text-white transition ${
                  pathname === item.path ? "text-white font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown Desktop */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-white/70 hover:text-white transition">
                Services <ChevronDown className="h-4 w-4" />
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 mt-3 bg-white rounded-xl shadow-lg p-3 w-56 z-50">
                  <Link to="/service1" className="block py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700">
                    Stratégie Digitale
                  </Link>
                  <Link to="/service2" className="block py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700">
                    UI/UX Design
                  </Link>
                  <Link to="/service3" className="block py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700">
                    Développement Web
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* BOUTON CV (Desktop + Mobile) */}
          <a
            href="/cv.pdf"
            target="_blank"
            className="hidden lg:block px-5 py-2 rounded-lg border border-white/20 text-white hover:bg-white hover:text-black transition"
          >
            Télécharger CV
          </a>

          {/* GOOGLE APPS LAUNCHER — Mobile */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                ))}
              </div>
            </button>

            {/* Menu Google Apps */}
            {appsOpen && (
              <div className="absolute right-0 mt-3 bg-white w-64 rounded-2xl shadow-2xl p-4 animate-scale-in z-50">
                <div className="grid grid-cols-3 gap-4">
                  {navItems.map((item, index) => {
                    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#A142F4", "#F45D22"];
                    const bg = colors[index % colors.length];

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setAppsOpen(false)}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: bg }}
                        >
                          {item.name[0]}
                        </div>
                        <span className="text-xs mt-2 font-medium text-gray-700 text-center">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 text-center">
                  <button className="text-blue-600 font-medium text-sm hover:underline">
                    Voir plus
                  </button>
                </div>

                {/* Bouton CV Mobile */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  className="block mt-4 px-4 py-2 text-center rounded-lg bg-black text-white font-medium hover:bg-gray-800"
                >
                  Télécharger CV
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
