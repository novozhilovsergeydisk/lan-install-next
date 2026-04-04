
import React, { useState, useEffect } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle, Settings, Paperclip, X, FileText } from 'lucide-react';
import config from '../src/config';

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

  // Генерация URL для Telegram (ПРЯМАЯ)
  const getApiUrl = (method: string) => {
      return `https://api.telegram.org/bot${TG_BOT_TOKEN}/${method}`;
  };

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
         console.error("Telegram Error:", errText);
         throw new Error(`Telegram Error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      if (!data.ok) {
         throw new Error(data.description || 'Ошибка API Telegram');
      }

      // 2. Отправка файлов (если есть)
      if (files.length > 0) {
         const docUrl = getApiUrl('sendDocument');
         
         for (let i = 0; i < files.length; i++) {
             setUploadProgress(`Загрузка файлов: ${i + 1} из ${files.length}...`);
             
             const formDataFile = new FormData();
             formDataFile.append('chat_id', TG_CHAT_ID);
             formDataFile.append('document', files[i]);
             
             const fileResponse = await fetch(docUrl, {
                 method: 'POST',
                 body: formDataFile
             });
             
             if (!fileResponse.ok) {
                 console.error(`Failed to upload file ${files[i].name}`);
             }
         }
      }

      setFormStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setFiles([]);
      setUploadProgress('');

    } catch (error: any) {
      console.error('Submission Error:', error);
      
      let userFriendlyError = `Ошибка: ${error.message}`;
      if (error.message.includes('Unauthorized')) userFriendlyError = 'Ошибка доступа: Неверный токен бота.';
      if (error.message.includes('Chat not found')) userFriendlyError = 'Ошибка: Чат не найден (проверьте Chat ID).';
      if (error.message.includes('Failed to fetch')) userFriendlyError = 'Ошибка сети (возможно, блокировка CORS или Интернета).';
      
      setErrorMessage(userFriendlyError);
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 text-lanGreen rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Спасибо за заявку!</h2>
          <p className="text-gray-600 mb-6">Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей.</p>
          <button onClick={() => setFormStatus('idle')} className="text-lanBlue font-medium hover:underline">
            Отправить еще одну
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg overflow-hidden">
           
           <div className="bg-lanBlue p-10 text-white flex flex-col justify-between">
              <div>
                  <h2 className="text-3xl font-bold mb-6">Давайте обсудим ваш проект</h2>
                  <p className="text-gray-300 mb-10 text-lg">
                      Оставьте заявку, и мы подготовим для вас коммерческое предложение с точными сроками и ценами.
                  </p>
                  
                  <div className="space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <Phone size={24} />
                          </div>
                          <div>
                              <p className="text-sm text-gray-400">Телефон</p>
                              <p className="text-lg font-semibold">+7 (995) 921-02-09</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <Mail size={24} />
                          </div>
                          <div>
                              <p className="text-sm text-gray-400">Email</p>
                              <p className="text-lg font-semibold">info@lan-install.ru</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="mt-10 md:mt-0">
                 <p className="text-sm text-gray-400 opacity-60">
                     ООО "Лан-Инсталл" <br/>
                     ИНН 7700000000
                 </p>
              </div>
           </div>

           <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition" 
                      placeholder="Иван Иванов" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition" 
                      placeholder="+7 (___) ___-__-__" 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание задачи</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lanGreen focus:border-transparent outline-none transition" 
                      placeholder="Например: нужно установить 4 камеры в офисе..."
                    ></textarea>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Прикрепить файлы (фото, проекты)</label>
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
                            className="flex items-center gap-2 w-full px-4 py-3 rounded-lg border border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-lanGreen transition"
                        >
                            <Paperclip size={20} />
                            <span className="text-sm">Нажмите, чтобы выбрать файлы</span>
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                                    <div className="flex items-center gap-2 truncate">
                                        <FileText size={16} className="text-lanBlue flex-shrink-0" />
                                        <span className="truncate text-gray-700">{file.name}</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-gray-400 hover:text-red-500 ml-2"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                 </div>

                 {formStatus === 'config_error' && (
                    <div className="flex items-start gap-2 text-amber-700 text-sm bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <Settings size={18} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <strong>Ошибка настройки!</strong><br/>
                            Не найдены ключи Telegram. Проверьте файл src/config.ts
                        </div>
                    </div>
                 )}

                 {formStatus === 'error' && (
                    <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{errorMessage || 'Ошибка отправки. Попробуйте позже.'}</span>
                    </div>
                 )}

                 <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-lanGreen hover:bg-green-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-70 flex justify-center items-center gap-2"
                 >
                    {formStatus === 'submitting' ? (
                        <>{uploadProgress || 'Отправка заявки...'}</>
                    ) : (
                        'Отправить заявку'
                    )}
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
