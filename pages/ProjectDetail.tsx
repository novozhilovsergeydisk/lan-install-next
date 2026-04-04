
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, CheckCircle2 } from 'lucide-react';
import { projects } from '../src/data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Находим проект по ID
  const project = projects.find(p => p.id === Number(id));

  // Если проект не найден, редирект или ошибка
  if (!project) {
    return <Navigate to="/portfolio" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full relative overflow-hidden bg-gray-900">
        <img 
          src={project.mainImage} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
           <Link to="/portfolio" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition w-fit">
              <ArrowLeft size={20} /> Назад в портфолио
           </Link>
           <div className="inline-block bg-lanGreen text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 w-fit">
              {project.category === 'SCS' ? 'СКС' : project.category === 'Video' ? 'Видеонаблюдение' : project.category === 'Fiber' ? 'ВОЛС' : 'СКУД'}
           </div>
           <h1 className="text-3xl md:text-5xl font-bold text-white">{project.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-lanBlue mb-4">О проекте</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {project.fullDescription}
                </p>
            </div>

            {/* Scope of Work */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Выполненные работы</h3>
                <ul className="space-y-4">
                    {project.tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle2 className="text-lanGreen flex-shrink-0 mt-1" size={20} />
                            <span>{task}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Gallery */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Фотоотчет</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-64 shadow-sm group">
                            <img 
                                src={img} 
                                alt={`${project.title} фото ${index + 1}`} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Детали проекта</h3>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-lanBlue rounded-lg flex items-center justify-center flex-shrink-0">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Заказчик</p>
                            <p className="font-medium text-gray-800">{project.client || 'Частный заказчик'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-50 text-lanGreen rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Локация</p>
                            <p className="font-medium text-gray-800">{project.location || 'Москва'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-50 text-lanOrange rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Дата сдачи</p>
                            <p className="font-medium text-gray-800">{project.completionDate || '2023'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link 
                        to="/contact" 
                        className="block w-full bg-lanBlue hover:bg-blue-900 text-white text-center font-bold py-3 rounded-lg transition"
                    >
                        Хочу так же
                    </Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
