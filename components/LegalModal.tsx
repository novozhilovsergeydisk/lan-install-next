
"use client";
import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'consent';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: 'Политика конфиденциальности',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p className="font-bold text-gray-800">1. Общие положения</p>
          <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО «Лан-Инсталл» (далее — Оператор).</p>
          <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
          <p>1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта lan-install.ru.</p>
          
          <p className="font-bold text-gray-800">2. Основные понятия</p>
          <p>2.1. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому пользователю веб-сайта.</p>
          <p>2.2. Обработка персональных данных — любое действие (операция), совершаемое с использованием средств автоматизации или без использования таких средств с персональными данными.</p>
          
          <p className="font-bold text-gray-800">3. Обрабатываемые данные</p>
          <p>3.1. Фамилия, имя, отчество; номер телефона; адрес электронной почты; адрес объекта.</p>
          <p>3.2. На сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики.</p>
          
          <p className="font-bold text-gray-800">4. Цели обработки</p>
          <p>4.1. Цель обработки: информирование Пользователя, предоставление доступа к сервисам, расчет стоимости услуг (калькулятор) и организация выезда специалистов.</p>
          
          <p className="font-bold text-gray-800">5. Безопасность</p>
          <p>5.1. Безопасность персональных данных обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства.</p>
        </div>
      )
    },
    consent: {
      title: 'Согласие на обработку персональных данных',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>Настоящим я, далее — «Пользователь», во исполнение требований Федерального закона от 27.07.2006 г. № 152-ФЗ «О персональных данных» свободно, своей волей и в своем интересе даю согласие ООО «Лан-Инсталл» (далее — «Оператор») на обработку своих персональных данных, указанных при заполнении веб-формы на сайте lan-install.ru.</p>
          
          <p className="font-bold text-gray-800">1. Персональные данные</p>
          <p>Имя, номер контактного телефона, адрес электронной почты, адрес объекта и иная информация, предоставленная мной в формах обратной связи.</p>
          
          <p className="font-bold text-gray-800">2. Цель обработки</p>
          <p>Предоставление консультаций, расчет стоимости услуг (сметы), информирование об услугах Оператора и связь с Пользователем.</p>
          
          <p className="font-bold text-gray-800">3. Перечень действий</p>
          <p>Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, передача, удаление и уничтожение персональных данных.</p>
          
          <p className="font-bold text-gray-800">4. Срок действия</p>
          <p>Согласие действует с момента отправки формы до достижения целей обработки или до момента его отзыва Пользователем.</p>
          
          <p className="font-bold text-gray-800">5. Отзыв согласия</p>
          <p>Согласие может быть отозвано в любое время путем направления письменного уведомления на электронную почту Оператора: info@lan-install.ru.</p>
        </div>
      )
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-bold text-lanBlue">{current.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          {current.body}
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-lanBlue text-white rounded-full font-medium hover:bg-blue-900 transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
