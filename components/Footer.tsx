
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* 1. Requisites (First Column) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
             <h3 className="text-white text-lg font-bold mb-6">Реквизиты</h3>
             <div className="text-sm text-gray-400 space-y-2 leading-relaxed">
                <p className="font-semibold text-white">ООО "Лан-Инсталл"</p>
                <p>ИНН: 7700000000</p>
                <p>КПП: 770101001</p>
                <p>ОГРН: 1234567890123</p>
             </div>
          </div>

          {/* 2. Logo & Description (Second Column) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/Logo1.png" alt="Lan-install Логотип" className="w-auto h-auto max-w-[220px] mb-6" />
            
            <p className="text-sm mb-6 leading-relaxed text-gray-400">
              Профессиональный монтаж и пусконаладка слаботочных систем. 
              Мы создаем надежную инфраструктуру для вашего бизнеса и дома.
            </p>
          </div>

          {/* 3. Contacts (Third Column) */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-6">Контакты</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="text-lanGreen flex-shrink-0 mt-0.5" size={18} />
                <div className="flex flex-col items-center md:items-start">
                  {/* Ссылка для десктопа (открывает сайт) */}
                  <a 
                    href="https://yandex.ru/maps/?text=г.+Москва,+ул.+7-я+Текстильщиков,+д.+18/15" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hidden md:block hover:text-white transition leading-relaxed"
                  >
                    г. Москва, ул. 7-я Текстильщиков, д. 18/15
                  </a>
                  {/* Ссылка для мобильных (открывает Навигатор) */}
                  <a 
                    href="yandexnavi://search?text=г. Москва, ул. 7-я Текстильщиков, д. 18/15"
                    className="md:hidden hover:text-white transition leading-relaxed"
                  >
                    г. Москва, ул. 7-я Текстильщиков, д. 18/15
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="text-lanGreen flex-shrink-0" size={18} />
                <a href="tel:+79959210209" className="hover:text-white transition">+7 (995) 921-02-09</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="text-lanGreen flex-shrink-0" size={18} />
                <a href="mailto:info@lan-install.ru" className="hover:text-white transition">info@lan-install.ru</a>
              </li>
            </ul>
          </div>

          {/* 4. Services (Fourth Column) */}
          <div className="text-center md:text-left">
             <h3 className="text-white text-lg font-bold mb-6">Услуги</h3>
             <ul className="space-y-3 text-sm">
                <li><Link to="/calculator#SCS" className="hover:text-lanGreen transition block py-1">Монтаж СКС</Link></li>
                <li><Link to="/calculator#Video" className="hover:text-lanGreen transition block py-1">Видеонаблюдение</Link></li>
                <li><Link to="/calculator#Fiber" className="hover:text-lanGreen transition block py-1">Сварка оптоволокна</Link></li>
                <li><Link to="/calculator#Access" className="hover:text-lanGreen transition block py-1">СКУД</Link></li>
             </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-xs text-gray-600">© 2024, Lan-install. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
