
"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle, Paperclip, X, FileText, Loader2 } from 'lucide-react';
import LegalModal from '../../components/LegalModal';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false
  });

  const [files, setFiles] = useState<File[]>([]);
  
  // Legal states
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedData, setAgreedData] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'consent' }>({
    isOpen: false,
    type: 'privacy'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const openLegal = (type: 'privacy' | 'consent') => {
    setLegalModal({ isOpen: true, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom Validation
    const newErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim()
    };
    
    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) return;
    if (!agreedPrivacy || !agreedData) return;

    setFormStatus('submitting');
    setErrorMessage('');
    setUploadProgress('');

    try {
      const apiFormData = new FormData();
      apiFormData.append('name', formData.name);
      apiFormData.append('phone', formData.phone);
      apiFormData.append('message', formData.message);
      files.forEach(file => apiFormData.append('files', file));

      const response = await fetch('/api/send-message', {
        method: 'POST',
        body: apiFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при отправке');
      }

      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setFiles([]);
      setAgreedPrivacy(false);
      setAgreedData(false);

    } catch (error: any) {
      console.error('Submission Error:', error);
      setErrorMessage(error.message || 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-lanGreen rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Спасибо за заявку!</h2>
          <p className="text-gray-600 mb-6">Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
          <button onClick={() => setFormStatus('idle')} className="bg-lanBlue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-900 transition">
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Info Block */}
        <div className="bg-lanBlue rounded-2xl shadow-lg p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Давайте обсудим ваш проект</h1>
                <p className="text-white/70 text-lg mb-10 max-w-2xl">
                    Оставьте заявку, и мы подготовим для вас коммерческое предложение с точными сроками и ценами.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-lanGreen">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Телефон</p>
                            <a href="tel:+79959210209" className="text-lg font-bold hover:text-lanGreen transition">+7 (995) 921-02-09</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-lanGreen">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Email</p>
                            <a href="mailto:info@lan-install.ru" className="text-lg font-bold hover:text-lanGreen transition">info@lan-install.ru</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Form Block */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше имя</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 outline-none transition-all ${
                                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-lanGreen focus:border-transparent'
                            }`} 
                            placeholder="Как к вам обращаться?" 
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">Пожалуйста, введите ваше имя</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Контактный телефон</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-4 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 outline-none transition-all ${
                                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-lanGreen focus:border-transparent'
                            }`} 
                            placeholder="+7 (___) ___-__-__" 
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">Пожалуйста, введите номер телефона</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Описание задачи</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4} 
                        className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="Опишите вкратце вашу задачу (например: монтаж СКС на 20 рабочих мест)"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Прикрепить файлы</label>
                    <div className="relative">
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label 
                            htmlFor="file-upload"
                            className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-lanGreen hover:text-lanGreen transition-all"
                        >
                            <Paperclip size={24} />
                            <div className="text-center">
                                <span className="block font-medium">Нажмите, чтобы выбрать файлы</span>
                                <span className="text-xs text-gray-400">Фотографии объекта, проекты или ТЗ</span>
                            </div>
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm">
                                    <div className="flex items-center gap-3 truncate">
                                        <FileText size={18} className="text-lanBlue flex-shrink-0" />
                                        <span className="truncate text-gray-700 font-medium">{file.name}</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Legal Checkboxes */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={agreedPrivacy}
                            onChange={(e) => setAgreedPrivacy(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-lanGreen focus:ring-lanGreen"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            Я согласен с <button type="button" onClick={() => openLegal('privacy')} className="text-lanBlue underline hover:text-lanGreen font-medium">политикой конфиденциальности</button>
                        </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={agreedData}
                            onChange={(e) => setAgreedData(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-lanGreen focus:ring-lanGreen"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            Я даю <button type="button" onClick={() => openLegal('consent')} className="text-lanBlue underline hover:text-lanGreen font-medium">согласие на обработку персональных данных</button>
                        </span>
                    </label>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={formStatus === 'submitting' || !agreedPrivacy || !agreedData}
                        className="w-full bg-lanGreen hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 text-lg"
                    >
                        {formStatus === 'submitting' ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                {uploadProgress || 'Отправляем...'}
                            </>
                        ) : (
                            'Отправить заявку'
                        )}
                    </button>
                </div>

                {formStatus === 'error' && (
                    <div className="flex items-start gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </form>
        </div>

        <div className="text-center">
            <p className="text-sm text-gray-400">
                ООО "Лан-Инсталл" • ИНН 7700000000
            </p>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        type={legalModal.type} 
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
};

export default Contact;
