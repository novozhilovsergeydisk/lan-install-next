"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, User, CheckCircle2, X, ChevronLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { projects } from '../../../src/data/projects';

const ProjectDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Находим проект по ID
  const project = projects.find(p => p.id === Number(id));

  const handlePrev = useCallback(() => {
    if (project && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? project.gallery.length - 1 : prev! - 1
      );
    }
  }, [project, selectedImageIndex]);

  const handleNext = useCallback(() => {
    if (project && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === project.gallery.length - 1 ? 0 : prev! + 1
      );
    }
  }, [project, selectedImageIndex]);

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleClose, handlePrev, handleNext]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImageIndex]);

  // Если проект не найден, редирект или ошибка
  if (!project) {
    if (typeof window !== 'undefined') {
      router.push('/portfolio');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="h-[45vh] w-full relative overflow-hidden bg-lanBlue group">
        <img 
          src={project.mainImage} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] transform group-hover:scale-105 group-hover:duration-[1200ms] cursor-pointer"
          onClick={() => setSelectedImageIndex(0)}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
           <Link href="/portfolio" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition w-fit bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/40 pointer-events-auto">
              <ArrowLeft size={18} /> Назад в портфолио
           </Link>
           <div className="inline-block bg-lanGreen text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-lg">
              {project.category === 'SCS' ? 'СКС' : project.category === 'Video' ? 'Видеонаблюдение' : project.category === 'Fiber' ? 'ВОЛС' : 'СКУД'}
           </div>
           <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight shadow-black drop-shadow-md">{project.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-lanBlue mb-4">О проекте</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {project.fullDescription}
                </p>
            </div>

            {/* Scope of Work */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pl-2 border-l-4 border-lanGreen flex items-center gap-3">Фотоотчет с объекта</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-64 shadow-sm group cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
                            <img 
                                src={img} 
                                alt={`${project.title} фото ${index + 1}`} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
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
                        href="/contact" 
                        className="block w-full bg-lanBlue hover:bg-blue-900 text-white text-center font-bold py-3 rounded-lg transition"
                    >
                        Хочу так же
                    </Link>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[110]"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-all p-4 z-[110] hover:bg-white/5 rounded-full"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-all p-4 z-[110] hover:bg-white/5 rounded-full"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20 select-none" onClick={handleClose}>
            <img 
              src={project.gallery[selectedImageIndex]} 
              alt={`${project.title} - фото ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-500"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
              {selectedImageIndex + 1} / {project.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;