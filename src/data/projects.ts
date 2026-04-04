
import { Project } from '../../types';

export const projects: Project[] = [
  { 
    id: 14, 
    title: 'Школа в Долгопрудном', 
    category: 'SCS', 
    shortDescription: 'Монтаж локальной сети и систем оповещения', 
    fullDescription: 'Реализация проекта по оснащению новой общеобразовательной школы в г. Долгопрудный. Работы включали монтаж структурированной кабельной системы, установку активного сетевого оборудования и настройку системы оповещения и управления эвакуацией.',
    client: 'Администрация г. Долгопрудный',
    location: 'Московская обл., г. Долгопрудный',
    completionDate: 'Август 2023',
    tasks: [
      'Прокладка магистральных кабельных трасс',
      'Монтаж и тестирование 400 портов СКС',
      'Сборка центрального и этажных коммутационных узлов',
      'Интеграция системы громкоговорящей связи',
      'Пусконаладочные работы сетевой инфраструктуры'
    ],
    mainImage: '/portfolio/dolg/a (1).webp',
    gallery: [
        '/portfolio/dolg/a (1).webp', '/portfolio/dolg/a (2).webp', '/portfolio/dolg/a (3).webp', '/portfolio/dolg/a (4).webp', 
        '/portfolio/dolg/a (5).webp', '/portfolio/dolg/a (6).webp', '/portfolio/dolg/a (7).webp', '/portfolio/dolg/a (8).webp'
    ]
  },
  { 
    id: 13, 
    title: 'СКС для магазина', 
    category: 'SCS', 
    shortDescription: 'Локальная сеть и подключение торгового оборудования', 
    fullDescription: 'Работы по организации структурированной кабельной системы в торговом помещении. Проект включал прокладку кабельных трасс, монтаж сетевых розеток для кассовых узлов и рабочих мест персонала, а также сборку и настройку коммутационного узла.',
    client: 'Сетевой ритейлер',
    location: 'г. Москва (ТЦ)',
    completionDate: 'Июнь 2023',
    tasks: [
      'Монтаж кабельных каналов по периметру помещения',
      'Прокладка кабеля UTP кат. 5e для 24 рабочих точек',
      'Установка и коммутация настенного шкафа 6U',
      'Тестирование соединений и маркировка портов',
      'Подключение сетевого оборудования и кассовых терминалов'
    ],
    mainImage: '/portfolio/him/a (1).webp',
    gallery: [
        '/portfolio/him/a (1).webp', '/portfolio/him/a (2).webp', '/portfolio/him/a (3).webp', '/portfolio/him/a (4).webp'
    ]
  },
  { 
    id: 12, 
    title: 'Музей Победы', 
    category: 'SCS', 
    shortDescription: 'Модернизация информационной сети и систем безопасности', 
    fullDescription: 'Выполнение комплекса работ по модернизации слаботочных систем в Музее Победы на Поклонной горе. Проект включал замену устаревших коммуникаций, расширение сети видеонаблюдения и интеграцию современных систем пожарной и охранной сигнализации с учетом архитектурных особенностей здания.',
    client: 'ФГБУК «Музей Победы»',
    location: 'г. Москва, пл. Победы, д. 3',
    completionDate: 'Сентябрь 2023',
    tasks: [
      'Проектирование и монтаж СКС в условиях действующих экспозиций',
      'Установка 48 IP-камер видеонаблюдения с аналитикой',
      'Модернизация серверного оборудования и систем хранения данных',
      'Монтаж систем контроля доступа в служебные помещения',
      'Настройка аудиовизуального оборудования для выставочных залов'
    ],
    mainImage: '/portfolio/pobeda/a (1).webp',
    gallery: [
        '/portfolio/pobeda/a (1).webp', '/portfolio/pobeda/a (2).webp', '/portfolio/pobeda/a (3).webp', '/portfolio/pobeda/a (4).webp', 
        '/portfolio/pobeda/a (6).webp', '/portfolio/pobeda/a (7).webp', '/portfolio/pobeda/a (8).webp', '/portfolio/pobeda/a (9).webp', 
        '/portfolio/pobeda/a (10).webp', '/portfolio/pobeda/a (11).webp', '/portfolio/pobeda/a (12).webp', '/portfolio/pobeda/a (13).webp',
        '/portfolio/pobeda/a (14).webp', '/portfolio/pobeda/a (15).webp', '/portfolio/pobeda/a (16).webp'
    ]
  },
  { 
    id: 11, 
    title: 'Монтаж МЭШ в школе', 
    category: 'SCS', 
    shortDescription: 'Реализация проекта Московская электронная школа', 
    fullDescription: 'Работы по модернизации ИТ-инфраструктуры в рамках городского проекта «Московская электронная школа» (МЭШ). Проект включал замену активного и пассивного сетевого оборудования, монтаж Wi-Fi точек доступа высокой плотности и интеграцию систем в единую образовательную среду.',
    client: 'Департамент образования г. Москвы',
    location: 'г. Москва (общеобразовательная школа)',
    completionDate: 'Июль 2023',
    tasks: [
      'Монтаж телекоммуникационных шкафов и стоек',
      'Прокладка и сварка оптических линий связи (Inter-floor)',
      'Установка и настройка Wi-Fi 6 точек доступа Cisco/Huawei',
      'Монтаж интерактивных панелей и их подключение к сети',
      'Подготовка исполнительной документации по стандартам МЭШ'
    ],
    mainImage: '/portfolio/mesh/a (1).webp',
    gallery: [
        '/portfolio/mesh/a (1).webp', '/portfolio/mesh/a (2).webp', '/portfolio/mesh/a (3).webp', '/portfolio/mesh/a (4).webp', 
        '/portfolio/mesh/a (6).webp', '/portfolio/mesh/a (7).webp', '/portfolio/mesh/a (8).webp', '/portfolio/mesh/a (9).webp', 
        '/portfolio/mesh/a (10).webp', '/portfolio/mesh/a (11).webp'
    ]
  },
  { 
    id: 10, 
    title: 'Школа на Люблинской 173', 
    category: 'SCS', 
    shortDescription: 'Комплексное оснащение образовательного центра', 
    fullDescription: 'Масштабный проект по созданию современной ИТ-инфраструктуры в новой школе. Проведены работы по монтажу СКС, систем видеонаблюдения, СКУД и организации серверных комнат. Обеспечено полное покрытие Wi-Fi и интеграция систем безопасности.',
    client: 'ГБОУ Школа №1547 (корпус на Люблинской)',
    location: 'г. Москва, ул. Люблинская, д. 173',
    completionDate: 'Август 2023',
    tasks: [
      'Монтаж более 800 портов СКС категории 6',
      'Организация 4-х распределительных узлов (серверных)',
      'Установка системы IP-видеонаблюдения на 64 камеры',
      'Монтаж систем контроля доступа на все входы и кабинеты',
      'Настройка бесшовной Wi-Fi сети для учеников и персонала'
    ],
    mainImage: '/portfolio/lubl/a (1).webp',
    gallery: [
        '/portfolio/lubl/a (1).webp', '/portfolio/lubl/a (2).webp', '/portfolio/lubl/a (3).webp', '/portfolio/lubl/a (4).webp', '/portfolio/lubl/a (5).webp',
        '/portfolio/lubl/a (6).webp', '/portfolio/lubl/a (7).webp', '/portfolio/lubl/a (8).webp', '/portfolio/lubl/a (9).webp', '/portfolio/lubl/a (10).webp',
        '/portfolio/lubl/a (11).webp', '/portfolio/lubl/a (12).webp', '/portfolio/lubl/a (13).webp', '/portfolio/lubl/a (14).webp', '/portfolio/lubl/a (15).webp',
        '/portfolio/lubl/a (16).webp', '/portfolio/lubl/a (17).webp', '/portfolio/lubl/a (18).webp', '/portfolio/lubl/a (19).webp', '/portfolio/lubl/a (20).webp',
        '/portfolio/lubl/a (21).webp', '/portfolio/lubl/a (22).webp', '/portfolio/lubl/a (23).webp', '/portfolio/lubl/a (24).webp', '/portfolio/lubl/a (25).webp',
        '/portfolio/lubl/a (26).webp', '/portfolio/lubl/a (27).webp', '/portfolio/lubl/a (28).webp', '/portfolio/lubl/a (29).webp', '/portfolio/lubl/a (30).webp',
        '/portfolio/lubl/a (31).webp', '/portfolio/lubl/a (32).webp', '/portfolio/lubl/a (33).webp', '/portfolio/lubl/a (34).webp', '/portfolio/lubl/a (35).webp',
        '/portfolio/lubl/a (36).webp', '/portfolio/lubl/a (37).webp', '/portfolio/lubl/a (38).webp', '/portfolio/lubl/a (39).webp', '/portfolio/lubl/a (40).webp'
    ]
  },
  { 
    id: 9, 
    title: 'Комплекс работ на ЮВХ', 
    category: 'SCS', 
    shortDescription: 'Строительство информационной инфраструктуры и систем мониторинга', 
    fullDescription: 'Масштабный проект по созданию информационной инфраструктуры на Юго-Восточной Хорде (ЮВХ). Работы включали прокладку магистральных линий связи, монтаж систем видеонаблюдения за дорожной обстановкой и интеграцию интеллектуальной транспортной системы (ИТС).',
    client: 'Департамент строительства г. Москвы',
    location: 'г. Москва, Юго-Восточная Хорда',
    completionDate: 'Март 2024',
    tasks: [
      'Прокладка более 50 км бронированного кабеля',
      'Монтаж систем видеонаблюдения и контроля трафика',
      'Установка активного сетевого оборудования в дорожных шкафах',
      'Проведение измерений и сертификация линий',
      'Интеграция с городскими системами мониторинга'
    ],
    mainImage: '/portfolio/uvh/a (1).webp',
    gallery: [
        '/portfolio/uvh/a (1).webp',
        '/portfolio/uvh/a (2).webp',
        '/portfolio/uvh/a (3).webp',
        '/portfolio/uvh/a (4).webp',
        '/portfolio/uvh/a (5).webp',
        '/portfolio/uvh/a (6).webp',
        '/portfolio/uvh/a (7).webp',
        '/portfolio/uvh/a (8).webp',
        '/portfolio/uvh/a (9).webp',
        '/portfolio/uvh/a (10).webp',
        '/portfolio/uvh/a (11).webp',
        '/portfolio/uvh/a (12).webp',
        '/portfolio/uvh/a (13).webp',
        '/portfolio/uvh/a (14).webp',
        '/portfolio/uvh/a (15).webp',
        '/portfolio/uvh/a (16).webp',
        '/portfolio/uvh/a (17).webp'
    ]
  },
  { 
    id: 8, 
    title: 'Кальянная VOZDUH', 
    category: 'Video', 
    shortDescription: 'Система видеонаблюдения и фоновый звук', 
    fullDescription: 'Создание уютной атмосферы и обеспечение безопасности в современной кальянной. Установлена система видеонаблюдения с высоким разрешением и возможностью ночной съемки, а также настроена аудиосистема для качественного фонового воспроизведения музыки.',
    client: 'Lounge Bar VOZDUH',
    location: 'г. Москва, ул. Арбат',
    completionDate: 'Апрель 2024',
    tasks: [
      'Монтаж 8 купольных IP-камер с аудиовходом',
      'Установка и настройка 16-канального видеорегистратора',
      'Настройка удаленного просмотра для владельцев',
      'Монтаж и пусконаладка системы фонового звука',
      'Скрытая прокладка кабелей в интерьере стиля лофт'
    ],
    mainImage: '/portfolio/VOZDUH/a (1).webp',
    gallery: [
        '/portfolio/VOZDUH/a (1).webp',
        '/portfolio/VOZDUH/a (2).webp',
        '/portfolio/VOZDUH/a (3).webp',
        '/portfolio/VOZDUH/a (4).webp',
        '/portfolio/VOZDUH/a (5).webp',
        '/portfolio/VOZDUH/a (6).webp',
        '/portfolio/VOZDUH/a (7).webp'
    ]
  },
  { 
    id: 7, 
    title: 'Больница на Бауманской', 
    category: 'SCS', 
    shortDescription: 'Проектирование и монтаж слаботочных систем', 
    fullDescription: 'Комплексное оснащение медицинского учреждения современными слаботочными системами. Проект включал в себя развертывание структурированной кабельной системы, интеграцию систем оповещения и обеспечения безопасности в соответствии со строгими медицинскими стандартами.',
    client: 'Городская клиническая больница',
    location: 'г. Москва, ул. Бауманская',
    completionDate: 'Май 2024',
    tasks: [
      'Монтаж кабельных трасс в специализированных коробах',
      'Установка и сертификация 250 портов СКС',
      'Организация серверного узла в медицинском корпусе',
      'Интеграция системы вызова персонала',
      'Подготовка полного комплекта исполнительной документации'
    ],
    mainImage: '/portfolio/baum/a (1).webp',
    gallery: [
        '/portfolio/baum/a (1).webp',
        '/portfolio/baum/a (2).webp',
        '/portfolio/baum/a (3).webp',
        '/portfolio/baum/a (4).webp',
        '/portfolio/baum/a (5).webp',
        '/portfolio/baum/a (6).webp',
        '/portfolio/baum/a (7).webp',
        '/portfolio/baum/a (8).webp'
    ]
  }
];
