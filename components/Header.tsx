
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Калькулятор', path: '/calculator' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: 'Контакты', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Lan-install Логотип" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-lanGreen border-b-2 border-lanGreen'
                    : 'text-gray-600 hover:text-lanBlue'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact & Socials */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-3 mr-2">
                <a 
                  href="https://t.me/lan_install" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#0088cc] transition-colors w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100" 
                  aria-label="Telegram"
                >
                   <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 0C5.37055 0 0 5.37055 0 12C0 18.6294 5.37055 24 12 24C18.6294 24 24 18.6294 24 12C24 5.37055 18.6294 0 12 0ZM17.896 8.69566L16.171 17.0037C16.0415 17.5717 15.6943 17.7124 15.2162 17.4389L12.5882 15.4435L11.3213 16.692C11.1807 16.8365 11.0637 16.957 10.7944 16.957L10.9832 14.209L15.8533 9.69201C16.0653 9.49801 15.8071 9.38991 15.525 9.58381L9.50657 13.4813L6.9182 12.6531C6.35568 12.4725 6.34565 12.0766 7.0366 11.8003L17.1646 7.78985C17.6335 7.61709 18.0452 7.90231 17.896 8.69566Z" />
                   </svg>
                </a>
            </div>

            <a href="tel:+79959210209" className="hidden md:flex items-center gap-2 text-lanBlue font-bold hover:text-lanGreen transition">
              <Phone size={18} />
              <span>+7 (995) 921-02-09</span>
            </a>
            
            <button
              className="md:hidden text-gray-600 focus:outline-none z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (для затемнения фона) */}
      {isMenuOpen && (
        <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40 top-16"
            onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Sidebar (Справа) */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-white shadow-2xl border-l border-gray-100 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium border-b border-gray-50 last:border-0 ${
                    isActive(link.path) 
                    ? 'text-lanGreen bg-green-50' 
                    : 'text-gray-700 hover:text-lanGreen hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 mt-4 pt-4 px-2">
               <a href="tel:+79959210209" className="block py-2 text-lg font-bold text-lanBlue mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-lanBlue">
                        <Phone size={18} /> 
                    </div>
                    +7 (995) 921-02-09
                </div>
              </a>
              <div className="flex gap-4 py-2 mt-2 pl-1">
                <a 
                  href="https://t.me/lan_install" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#0088cc]" 
                  aria-label="Telegram"
                >
                   <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M12 0C5.37055 0 0 5.37055 0 12C0 18.6294 5.37055 24 12 24C18.6294 24 24 18.6294 24 12C24 5.37055 18.6294 0 12 0ZM17.896 8.69566L16.171 17.0037C16.0415 17.5717 15.6943 17.7124 15.2162 17.4389L12.5882 15.4435L11.3213 16.692C11.1807 16.8365 11.0637 16.957 10.7944 16.957L10.9832 14.209L15.8533 9.69201C16.0653 9.49801 15.8071 9.38991 15.525 9.58381L9.50657 13.4813L6.9182 12.6531C6.35568 12.4725 6.34565 12.0766 7.0366 11.8003L17.1646 7.78985C17.6335 7.61709 18.0452 7.90231 17.896 8.69566Z" />
                   </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
