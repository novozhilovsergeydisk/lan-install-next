
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
                  href="https://wa.me/79959210209" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-[#25D366] transition-colors w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100" 
                  aria-label="WhatsApp"
                >
                   <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                   </svg>
                </a>
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
                  href="https://wa.me/79959210209" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#25D366]" 
                  aria-label="WhatsApp"
                >
                   <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                   </svg>
                </a>
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
