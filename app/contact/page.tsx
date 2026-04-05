
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle, Settings, Paperclip, X, FileText, Loader2 } from 'lucide-react';
import config from '../../src/config';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'config_error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [files, setFiles] = useState<File[]>([]);

  // Используем настройки из config.ts
  const { TG_BOT_TOKEN, TG_CHAT_ID } = config;

  useEffect(() => {
    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
        console.warn("Missing Telegram keys in config");
    }
  }, [TG_BOT_TOKEN, TG_CHAT_ID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  // Генерация URL для Telegram
  const getApiUrl = useCallback((method: string) => {
      return `https://api.telegram.org/bot${TG_BOT_TOKEN}/${method}`;
  }, [TG_BOT_TOKEN]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');
    setUploadProgress('');

    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      setFormStatus('config_error');
      return;
    }

    // Простая валидация ID
    const chatIdPattern = /^-?\d+$/;
    if (!chatIdPattern.test(TG_CHAT_ID)) {
       setFormStatus('error');
       setErrorMessage(`Некорректный формат Chat ID в конфиге.`);
       return;
    }

    const text = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${formData.name}
📞 <b>Телефон:</b> ${formData.phone}
📝 <b>Задача:</b> ${formData.message || 'Не указано'}
📎 <b>Файлов прикреплено:</b> ${files.length}
    `;

    try {
      // 1. Отправляем текст
      const textUrl = getApiUrl('sendMessage');
      
      const response = await fetch(textUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
         const errText = await response.text();
         throw new Error(`Telegram Error: ${response.status}`);
      }

      // 2. Отправка файлов
      if (files.length > 0) {
         const docUrl = getApiUrl('sendDocument');
         
         for (let i = 0; i < files.length; i++) {
             setUploadProgress(`Загрузка: ${i + 1}/${files.length}`);
             
             const formDataFile = new FormData();
             formDataFile.append('chat_id', TG_CHAT_ID);
             formDataFile.append('document', files[i]);
             
             await fetch(docUrl, {
                 method: 'POST',
                 body: formDataFile
             });
         }
      }

      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setFiles([]);
      setUploadProgress('');

    } catch (error: any) {
      console.error('Submission Error:', error);
      setErrorMessage(error.message || 'Ошибка сети');
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
        
        {/* Top Info Block (Horizontal) */}
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
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше имя</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition-all" 
                            placeholder="Как к вам обращаться?" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Контактный телефон</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                            className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition-all" 
                            placeholder="+7 (___) ___-__-__" 
                        />
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

                <div className="pt-4 border-t border-gray-100">
                    <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-lanGreen hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-3 text-lg"
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
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Нажимая на кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-gray-600">политикой конфиденциальности</a>
                    </p>
                </div>

                {formStatus === 'error' && (
                    <div className="flex items-start gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <span>{errorMessage || 'Ошибка отправки. Пожалуйста, проверьте соединение и попробуйте снова.'}</span>
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
    </div>
  );
};

export default Contact;
