
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CalculatorItem } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Save, RefreshCw, AlertTriangle, FileSpreadsheet } from 'lucide-react';

const initialItems: CalculatorItem[] = [
  // SCS (Структурированные кабельные сети)
  { id: 'cable_utp', name: 'Прокладка кабеля UTP', price: 70, unit: 'м', category: 'SCS', qty: 0 },
  { id: 'cable_ftp', name: 'Прокладка кабеля FTP (экран)', price: 90, unit: 'м', category: 'SCS', qty: 0 },
  { id: 'cable_power', name: 'Прокладка силового кабеля (3х1.5/2.5)', price: 100, unit: 'м', category: 'SCS', qty: 0 },
  { id: 'cable_tray', name: 'Монтаж лотка/короба', price: 150, unit: 'м', category: 'SCS', qty: 0 },
  { id: 'cable_corrugation', name: 'Монтаж гофрированной трубы', price: 60, unit: 'м', category: 'SCS', qty: 0 },
  { id: 'socket_rj45', name: 'Розетка RJ-45 (1 порт)', price: 350, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'socket_rj45_dual', name: 'Розетка RJ-45 (2 порта)', price: 450, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'socket_power', name: 'Розетка электрическая (накладная/встр.)', price: 350, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'patch_panel', name: 'Монтаж патч-панели (24p)', price: 2000, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'cable_organizer', name: 'Установка кабельного органайзера', price: 300, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'rack_wall', name: 'Сборка шкафа настенного (до 15U)', price: 2500, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'rack_floor', name: 'Сборка шкафа напольного (до 42U)', price: 5000, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'port_test', name: 'Тестирование порта (Fluke)', price: 150, unit: 'шт', category: 'SCS', qty: 0 },
  { id: 'dismantle_cable', name: 'Демонтаж старого кабеля', price: 30, unit: 'м', category: 'SCS', qty: 0 },

  // Video (Видеонаблюдение)
  { id: 'cam_indoor', name: 'Камера внутренняя', price: 1500, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'cam_outdoor', name: 'Камера уличная (до 3м)', price: 2200, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'cam_outdoor_high', name: 'Камера уличная (>3м)', price: 3500, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'cam_ptz', name: 'Камера поворотная (PTZ)', price: 4000, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'mounting_box', name: 'Монтаж распаечной коробки (герметичной)', price: 500, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'mic_install', name: 'Установка микрофона', price: 1200, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'nvr_setup', name: 'Настройка регистратора (DVR/NVR)', price: 2000, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'hdd_install', name: 'Установка HDD', price: 500, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'monitor_install', name: 'Монтаж монитора на кронштейн', price: 1500, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'poe_switch', name: 'Монтаж PoE коммутатора', price: 1000, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'connector_crimp', name: 'Обжим разъема (RJ45/BNC/Power)', price: 50, unit: 'шт', category: 'Video', qty: 0 },
  { id: 'remote_access', name: 'Настройка удаленного доступа', price: 1500, unit: 'услуга', category: 'Video', qty: 0 },

  // Access (СКУД)
  { id: 'mag_lock', name: 'Замок электромагнитный', price: 2800, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'mech_lock', name: 'Замок электромеханический', price: 3500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'smart_lock', name: 'Замок электронный (умный)', price: 4500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'door_closer', name: 'Доводчик дверной (установка и регулировка)', price: 1500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'reader', name: 'Считыватель карт/брелоков', price: 1200, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'exit_button', name: 'Кнопка выхода', price: 800, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'controller_autonomous', name: 'Контроллер автономный', price: 2000, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'controller_net', name: 'Контроллер сетевой', price: 3500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'intercom_panel', name: 'Вызывная панель видеодомофона', price: 2500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'intercom_monitor', name: 'Монитор видеодомофона', price: 2000, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'turnstile', name: 'Турникет-трипод', price: 8000, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'biometric', name: 'Биометрический терминал', price: 2500, unit: 'шт', category: 'Access', qty: 0 },
  { id: 'cards_prog', name: 'Программирование карт доступа (10 шт)', price: 500, unit: 'услуга', category: 'Access', qty: 0 },

  // Fiber (ВОЛС)
  { id: 'fiber_cable_in', name: 'Прокладка ВОЛС (внутр.)', price: 80, unit: 'м', category: 'Fiber', qty: 0 },
  { id: 'fiber_cable_out', name: 'Прокладка ВОЛС (улица/канализация)', price: 150, unit: 'м', category: 'Fiber', qty: 0 },
  { id: 'fiber_weld', name: 'Сварка волокна', price: 250, unit: 'волокно', category: 'Fiber', qty: 0 },
  { id: 'fiber_pigtail', name: 'Разварка пигтейла в кросс', price: 150, unit: 'шт', category: 'Fiber', qty: 0 },
  { id: 'fiber_cross', name: 'Монтаж оптического кросса (сборка)', price: 2000, unit: 'шт', category: 'Fiber', qty: 0 },
  { id: 'fiber_sfp', name: 'Установка SFP модуля', price: 100, unit: 'шт', category: 'Fiber', qty: 0 },
  { id: 'media_converter', name: 'Установка медиаконвертера', price: 500, unit: 'шт', category: 'Fiber', qty: 0 },
  { id: 'fiber_test', name: 'Рефлектометрия (тестирование линии)', price: 300, unit: 'волокно', category: 'Fiber', qty: 0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Calculator: React.FC = () => {
  const [items, setItems] = useState<CalculatorItem[]>(initialItems);
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Adding a small delay ensures DOM is fully ready, 
        // though React usually handles this well. 
        // Using timeout to ensure scroll happens after render
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  const handleQtyChange = (id: string, val: number) => {
    if (val < 0) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty: val } : item));
  };

  const totalCost = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }, [items]);

  const categoryData = useMemo(() => {
    const data: Record<string, number> = { SCS: 0, Video: 0, Access: 0, Fiber: 0 };
    items.forEach(item => {
      data[item.category] += item.price * item.qty;
    });
    return Object.keys(data)
        .filter(key => data[key] > 0)
        .map(key => ({ 
            name: key === 'SCS' ? 'СКС' : key === 'Video' ? 'Видео' : key === 'Access' ? 'СКУД' : 'ВОЛС', 
            value: data[key] 
        }));
  }, [items]);

  const handleReset = () => setItems(initialItems);

  const categories = [
      { key: 'SCS', label: 'Структурированные сети (СКС)' },
      { key: 'Video', label: 'Видеонаблюдение' },
      { key: 'Access', label: 'Контроль доступа (СКУД)' },
      { key: 'Fiber', label: 'Оптоволокно (ВОЛС)' },
  ];

  // Функция экспорта в CSV (открывается в Excel)
  const handleExportCSV = () => {
    const selectedItems = items.filter(i => i.qty > 0);
    if (selectedItems.length === 0) return;

    // BOM для корректного отображения кириллицы в Excel
    let csvContent = "\uFEFF";
    csvContent += "Категория;Наименование;Цена (руб.);Кол-во;Ед.изм.;Сумма (руб.)\n";

    const categoryMap: Record<string, string> = {
        'SCS': 'СКС',
        'Video': 'Видеонаблюдение',
        'Access': 'СКУД',
        'Fiber': 'ВОЛС'
    };

    selectedItems.forEach(item => {
        const cat = categoryMap[item.category] || item.category;
        const sum = item.price * item.qty;
        // Экранируем точку с запятой в названиях, если вдруг встретится
        const name = item.name.replace(/;/g, ',');
        csvContent += `${cat};${name};${item.price};${item.qty};${item.unit};${sum}\n`;
    });

    csvContent += `;;;;;ИТОГО:;${totalCost}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'smeta_lan_install.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-lanBlue mb-4">Калькулятор стоимости монтажа</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Выберите необходимые работы и оборудование для предварительной оценки.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Параметры проекта</h2>
              <button onClick={handleReset} className="text-gray-500 hover:text-lanOrange flex items-center gap-1 text-sm">
                <RefreshCw size={16} /> Сбросить
              </button>
            </div>
            
            <div className="space-y-8">
               {categories.map(cat => (
                 <div key={cat.key} id={cat.key} className="scroll-mt-28">
                   <h3 className="text-lg font-semibold text-lanBlue border-b border-gray-100 pb-2 mb-4">
                     {cat.label}
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {items.filter(i => i.category === cat.key).map(item => {
                       // Определяем шаг: если метры, то 100, иначе 1
                       const step = item.unit === 'м' ? 100 : 1;
                       
                       return (
                         <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                           <div className="flex-1 pr-2">
                              <div className="text-sm font-medium text-gray-700 leading-tight mb-1">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.price} ₽ / {item.unit}</div>
                           </div>
                           <div className="flex items-center gap-2">
                              <button 
                                  onClick={() => handleQtyChange(item.id, Math.max(0, item.qty - step))}
                                  className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100 hover:text-lanOrange transition"
                                  aria-label="Уменьшить количество"
                              >-</button>
                              <input 
                                  type="number" 
                                  value={item.qty === 0 ? '' : item.qty}
                                  placeholder="0"
                                  onChange={(e) => {
                                      const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                      handleQtyChange(item.id, isNaN(val) ? 0 : val);
                                  }}
                                  onFocus={(e) => e.target.select()}
                                  className="w-14 text-center bg-transparent font-bold border-b border-gray-300 focus:outline-none focus:border-lanGreen"
                              />
                              <button 
                                  onClick={() => handleQtyChange(item.id, item.qty + step)}
                                  className="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100 hover:text-lanGreen transition"
                                  aria-label="Увеличить количество"
                              >+</button>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1 space-y-6">
             {/* Summary Card */}
             <div className="bg-lanBlue text-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4 opacity-90">Итоговая стоимость</h3>
                <div className="text-4xl font-bold mb-6">
                  {totalCost.toLocaleString('ru-RU')} ₽
                </div>
                
                {/* Warning Block */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6 text-sm backdrop-blur-sm">
                    <div className="flex gap-3 items-start">
                        <AlertTriangle className="text-yellow-300 flex-shrink-0 mt-0.5" size={20} />
                        <p className="text-gray-100 text-xs leading-relaxed">
                            <strong className="text-white block mb-1">Цены ориентировочные</strong>
                            Итоговая стоимость может быть <span className="text-yellow-300 font-bold">меньше</span> (скидки за объем) или <span className="text-yellow-300 font-bold">больше</span> (сложность монтажа).
                            <span className="block mt-2 pt-2 border-t border-white/10">
                                Для точного расчета нужен осмотр объекта или ознакомление с проектом. Оставьте заявку.
                            </span>
                        </p>
                    </div>
                </div>

                {totalCost > 0 ? (
                  <div className="h-48 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#333', borderRadius: '8px', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`${value} ₽`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-2 flex-wrap text-xs">
                        {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                  </div>
                ) : (
                   <div className="h-48 flex items-center justify-center text-white/30 border-2 border-dashed border-white/10 rounded-lg mb-6">
                       Нет данных для графика
                   </div>
                )}

                <div className="space-y-3">
                    <Link href="/contact" className="w-full bg-lanGreen hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                        <Save size={18} /> Отправить заявку
                    </Link>
                    
                    {totalCost > 0 && (
                        <button 
                            onClick={handleExportCSV}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2 border border-white/30"
                        >
                            <FileSpreadsheet size={18} /> Сохранить смету
                        </button>
                    )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
