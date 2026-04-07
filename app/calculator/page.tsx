
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CalculatorItem } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Save, RefreshCw, AlertTriangle, FileSpreadsheet, Plus, Minus } from 'lucide-react';

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

const COLORS = ['#3ab54a', '#1f3a5a', '#f39c12', '#0088FE'];

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
      { key: 'SCS', label: 'Структурированные кабельные сети (СКС)' },
      { key: 'Video', label: 'Системы видеонаблюдения' },
      { key: 'Access', label: 'Контроль доступа (СКУД)' },
      { key: 'Fiber', label: 'Оптоволоконные линии (ВОЛС)' },
  ];

  const handleExportCSV = () => {
    const selectedItems = items.filter(i => i.qty > 0);
    if (selectedItems.length === 0) return;

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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-lanBlue mb-6">Калькулятор стоимости</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Сформируйте предварительную смету вашего проекта онлайн. Выберите необходимые работы и оборудование.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-10">
            {categories.map(cat => (
              <div key={cat.key} id={cat.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28 transition-all duration-500 hover:shadow-md">
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-lanBlue">{cat.label}</h3>
                  {items.some(i => i.category === cat.key && i.qty > 0) && (
                    <span className="bg-lanGreen/10 text-lanGreen text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">Активно</span>
                  )}
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.filter(i => i.category === cat.key).map(item => {
                    const step = item.unit === 'м' ? 100 : 1;
                    return (
                      <div key={item.id} className="group relative bg-white p-4 rounded-xl border border-gray-100 transition-all duration-500 hover:border-lanGreen/30 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between min-h-[100px]">
                        <div className="mb-4">
                          <div className="text-sm font-bold text-gray-800 mb-1 leading-tight group-hover:text-lanBlue transition-colors">{item.name}</div>
                          <div className="text-xs font-medium text-gray-400 uppercase tracking-tighter">{item.price} ₽ / {item.unit}</div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 group-hover:border-gray-200 transition-colors">
                            <button 
                                onClick={() => handleQtyChange(item.id, Math.max(0, item.qty - step))}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-lanOrange hover:shadow transition-all"
                                aria-label="Уменьшить"
                            >
                              <Minus size={14} />
                            </button>
                            <input 
                                type="number" 
                                value={item.qty === 0 ? '' : item.qty}
                                placeholder="0"
                                onChange={(e) => {
                                    const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                    handleQtyChange(item.id, isNaN(val) ? 0 : val);
                                }}
                                onFocus={(e) => e.target.select()}
                                className="w-12 text-center bg-transparent font-bold text-lanBlue focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button 
                                onClick={() => handleQtyChange(item.id, item.qty + step)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-lanGreen hover:shadow transition-all"
                                aria-label="Увеличить"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          {item.qty > 0 && (
                            <div className="text-sm font-bold text-lanGreen animate-in fade-in zoom-in duration-300">
                              {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1 sticky top-24">
             <div className="bg-lanBlue rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-lanGreen/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-medium text-white/70">Предварительный итог</h3>
                        <button onClick={handleReset} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors group" title="Сбросить всё">
                            <RefreshCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>

                    <div className="mb-10">
                        <div className="text-5xl font-black mb-2 tracking-tight">
                            {totalCost.toLocaleString('ru-RU')} <span className="text-2xl font-normal opacity-60">₽</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-lanGreen transition-all duration-1000 ease-out"
                                style={{ width: totalCost > 0 ? '100%' : '0%' }}
                            ></div>
                        </div>
                    </div>
                    
                    {totalCost > 0 ? (
                      <div className="mb-10">
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                fill="#8884d8"
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                                >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(31, 58, 90, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropBlur: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                    formatter={(value: number) => [`${value.toLocaleString('ru-RU')} ₽`, '']}
                                />
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                            {categoryData.map((entry, index) => (
                                <div key={index} className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/5">
                                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                       <div className="h-48 flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/10 rounded-2xl mb-10 group">
                           <FileSpreadsheet size={40} className="mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                           <span className="text-sm font-medium">Выберите услуги</span>
                       </div>
                    )}

                    <div className="bg-white/10 border border-white/10 rounded-2xl p-5 mb-10 backdrop-blur-md">
                        <div className="flex gap-3 items-start">
                            <AlertTriangle className="text-lanGreen flex-shrink-0" size={20} />
                            <p className="text-white/80 text-[11px] leading-relaxed">
                                Расчет носит справочный характер. Финальная стоимость зависит от сложности монтажа и объема работ.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 mt-auto">
                        <Link 
                            href="/contact" 
                            className="w-full bg-lanGreen hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgb(34,197,94,0.4)] flex items-center justify-center gap-3 text-lg"
                        >
                            <Save size={20} /> Обсудить проект
                        </Link>
                        
                        {totalCost > 0 && (
                            <button 
                                onClick={handleExportCSV}
                                className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-sm"
                            >
                                <FileSpreadsheet size={18} /> Скачать смету (CSV)
                            </button>
                        )}
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
