
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Network, Zap, HardDrive, ArrowRight, CircleCheck } from 'lucide-react';

const Home: React.FC = () => {
  // State for background slideshow
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Array of background images (Local files in root directory)
  const heroImages = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg",
    "/hero-4.jpg"
  ];

  // Effect to cycle images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-lanBlue text-white overflow-hidden min-h-[600px] flex items-center">
        
        {/* Background Images Slideshow */}
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
                backgroundImage: `url('${img}')` 
            }} 
          />
        ))}
        
        {/* Blue Overlay (Синий полупрозрачный слой) */}
        <div className="absolute inset-0 bg-lanBlue opacity-90 z-10 mix-blend-multiply"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Монтаж слаботочных систем <br/>в Москве
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light">
            Проектирование, установка и пусконаладка: СКС, видеонаблюдение, ВОЛС и СКУД.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10">
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                <CircleCheck size={20} />
                <span>Гарантия на работы 2 года</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                <CircleCheck size={20} />
                <span>Опытные монтажники</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                <CircleCheck size={20} />
                <span>Бесплатный выезд и смета</span>
              </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-lanGreen hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:-translate-y-1 shadow-lg border border-transparent">
              Оставить заявку
            </Link>
             <Link to="/portfolio" className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-lg font-bold text-lg transition">
              Примеры работ
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-lanBlue mb-4">Наши услуги</h2>
            <div className="w-20 h-1 bg-lanGreen mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="text-lanGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Network size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Монтаж СКС</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Надежная кабельная инфраструктура. Прокладка кабеля, сборка и коммутация серверных шкафов.
                </p>
                <Link to="/calculator#SCS" className="inline-flex items-center text-lanBlue font-semibold hover:text-lanGreen transition">
                  Рассчитать стоимость <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="text-lanGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Видеонаблюдение</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  IP и аналоговые системы под ключ. Удаленный доступа, настройка регистраторов.
                </p>
                <Link to="/calculator#Video" className="inline-flex items-center text-lanBlue font-semibold hover:text-lanGreen transition">
                  Рассчитать стоимость <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="text-lanGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Оптоволокно (ВОЛС)</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Прокладка и сварка оптоволоконных линий. Тестирование рефлектометром.
                </p>
                <Link to="/calculator#Fiber" className="inline-flex items-center text-lanBlue font-semibold hover:text-lanGreen transition">
                  Рассчитать стоимость <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="text-lanGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HardDrive size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Контроль доступа</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Турникеты, электронные замки, домофония и учет рабочего времени.
                </p>
                <Link to="/calculator#Access" className="inline-flex items-center text-lanBlue font-semibold hover:text-lanGreen transition">
                  Рассчитать стоимость <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
          </div>
        </div>
      </section>
      
      {/* Stages of Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-lanBlue mb-4">Этапы работы</h2>
            <div className="w-20 h-1 bg-lanGreen mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Прозрачный и понятный процесс взаимодействия от звонка до сдачи системы.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
             {/* Connecting line (Desktop only) */}
             <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-1 bg-gray-200 -z-0"></div>

             {[
                 {step: 1, title: 'Заявка', desc: 'Оставьте заявку на сайте или позвоните нам'},
                 {step: 2, title: 'Осмотр', desc: 'Бесплатный выезд инженера на объект'},
                 {step: 3, title: 'Смета', desc: 'Подготовка точного расчета и договора'},
                 {step: 4, title: 'Монтаж', desc: 'Качественное выполнение работ в срок'},
                 {step: 5, title: 'Сдача', desc: 'Настройка, тестирование и обучение'}
             ].map((item) => (
                 <div key={item.step} className="relative z-10 flex flex-col items-center text-center group">
                     <div className="w-16 h-16 rounded-full bg-white border-4 border-lanGreen text-lanBlue flex items-center justify-center font-bold text-2xl mb-6 shadow-sm group-hover:bg-lanGreen group-hover:text-white group-hover:scale-110 transition-all duration-300">
                         {item.step}
                     </div>
                     <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                         {item.desc}
                     </p>
                 </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
