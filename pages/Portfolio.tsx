
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../src/data/projects';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'SCS' | 'Video' | 'Fiber' | 'Access'>('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories = [
      { key: 'All', label: 'Все' },
      { key: 'SCS', label: 'СКС' },
      { key: 'Video', label: 'Видео' },
      { key: 'Fiber', label: 'ВОЛС' },
      { key: 'Access', label: 'СКУД' },
  ];

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-lanBlue mb-4">Наши проекты</h1>
          <p className="text-gray-600">Реальные примеры выполненных работ по монтажу слаботочных систем.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat.key 
                    ? 'bg-lanGreen text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                  {cat.label}
              </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
                <Link to={`/portfolio/${project.id}`} key={project.id} className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                    <div className="h-56 overflow-hidden relative">
                        <img 
                            src={project.mainImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-lanBlue shadow-sm">
                            {project.category === 'SCS' ? 'СКС' : project.category === 'Video' ? 'Видео' : project.category === 'Fiber' ? 'ВОЛС' : 'СКУД'}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-lanGreen transition-colors">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.shortDescription}</p>
                        
                        <div className="flex items-center text-lanBlue font-semibold text-sm mt-auto pt-4 border-t border-gray-100">
                            Смотреть кейс <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
