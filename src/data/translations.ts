import { Language } from '../types.js';

export const T = {
  appTitle: {
    RU: 'SEISMOLAB',
    KZ: 'SEISMOLAB',
    EN: 'SEISMOLAB',
  },
  appSubtitle: {
    RU: 'ИНЖЕНЕРНАЯ СТУДИЯ',
    KZ: 'ИНЖЕНЕРЛІК СТУДИЯ',
    EN: 'ENGINEERING STUDIO',
  },
  activeTwin: {
    RU: 'ЦИФРОВОЙ ДВОЙНИК',
    KZ: 'ЦИФРЛЫҚ ЕГІЗ',
    EN: 'DIGITAL TWIN',
  },
  nav3D: {
    RU: '3D Конструктор',
    KZ: '3D Құрастырушы',
    EN: '3D Constructor',
  },
  navMap: {
    RU: 'Карта Землетрясений',
    KZ: 'Жер сілкінісі картасы',
    EN: 'Earthquake Map',
  },
  navHistory: {
    RU: 'История Катастроф',
    KZ: 'Апаттар тарихы',
    EN: 'Disaster History',
  },
  navMaterials: {
    RU: 'Материалы',
    KZ: 'Материалдар',
    EN: 'Materials Lab',
  },
  nav112: {
    RU: 'Безопасность 112',
    KZ: '112 Қауіпсіздік',
    EN: '112 Safety Hub',
  },
  liveTelemetry: {
    RU: 'ОНЛАЙН ТЕЛЕМЕТРИЯ',
    KZ: 'ТІКЕЛЕЙ ТЕЛЕМЕТРИЯ',
    EN: 'LIVE TELEMETRY',
  },
  almatySector: {
    RU: 'НАЦИОНАЛЬНАЯ СЕТЬ РК // 17 ОБЛАСТЕЙ',
    KZ: 'ҚАЗАҚСТАН ҰЛТТЫҚ СЕЙСМОЖЕЛІСІ // 17 ОБЛЫС',
    EN: 'NATIONAL NETWORK OF RK // 17 OBLASTS',
  },
  stationInfo: {
    RU: 'МОНИТОРИНГ СОМЭ / НЯЦ РК [17 ОБЛАСТЕЙ]',
    KZ: 'ҚР БҒМ ҒК СӘЭ МОНИТОРИНГІ [17 ОБЛЫС]',
    EN: 'NNC SOMNGE MONITORING [17 OBLASTS]',
  },
  certifiedKazniisa: {
    RU: 'СЕРТИФИЦИРОВАНО КАЗНИИСА',
    KZ: 'ҚазҚСҒЗИ СЕРТИФИКАТТАҒАН',
    EN: 'KAZNIISA CERTIFIED',
  },
  isometry: {
    RU: 'ИЗОМЕТРИЯ',
    KZ: 'ИЗОМЕТРИЯ',
    EN: 'ISOMETRY',
  },
  facade: {
    RU: 'ФАСАД (X-Z)',
    KZ: 'ҚАСБЕТ (X-Z)',
    EN: 'FACADE (X-Z)',
  },
  plan: {
    RU: 'ПЛАН (X-Y)',
    KZ: 'ЖОСПАР (X-Y)',
    EN: 'PLAN (X-Y)',
  },
  section: {
    RU: 'СЕЧЕНИЕ',
    KZ: 'ҚИМА',
    EN: 'SECTION',
  },
  abSplit: {
    RU: 'A/B СПЛИТ',
    KZ: 'A/B БӨЛУ',
    EN: 'A/B SPLIT',
  },
  snapshot4k: {
    RU: '4K СНИМОК',
    KZ: '4K СУРЕТ',
    EN: '4K SNAPSHOT',
  },
  exportIfc: {
    RU: 'IFC / GLB',
    KZ: 'IFC / GLB',
    EN: 'IFC / GLB',
  },
  runTest: {
    RU: 'ТЕСТ',
    KZ: 'ТЕСТ',
    EN: 'TEST',
  },
  stopTest: {
    RU: 'СТОП',
    KZ: 'ТОҚТАТУ',
    EN: 'STOP',
  },
  evacuationSim: {
    RU: 'Трассировать эвакуацию',
    KZ: 'Эвакуацияны модельдеу',
    EN: 'Simulate Evacuation',
  },
  archetypesTitle: {
    RU: 'ТИПОВЫЕ ШАБЛОНЫ',
    KZ: 'ҮЛГІЛІК СХЕМАЛАР',
    EN: 'ARCHETYPE LIBRARY',
  },
  schemesCount: {
    RU: '5 СХЕМ',
    KZ: '5 СХЕМА',
    EN: '5 SCHEMES',
  },
  layersTitle: {
    RU: 'СЛОИ КОНСТРУКЦИИ',
    KZ: 'ҚҰРЫЛЫМ ҚАБАТТАРЫ',
    EN: 'STRUCTURAL LAYERS',
  },
  activeLayersCount: {
    RU: 'АКТИВНО',
    KZ: 'БЕЛСЕНДІ',
    EN: 'ACTIVE',
  },
  importTitle: {
    RU: '3D ИМПОРТ (BLENDER / IFC)',
    KZ: '3D ИМПОРТ (BLENDER / IFC)',
    EN: '3D IMPORT (BLENDER / IFC)',
  },
  importDropzone: {
    RU: 'Перетащите GLB или IFC',
    KZ: 'GLB немесе IFC файлын салыңыз',
    EN: 'Drop GLB or IFC file',
  },
  importLimit: {
    RU: 'До 120 МБ • Валидация сетки FEM',
    KZ: '120 МБ дейін • FEM торының валидациясы',
    EN: 'Up to 120 MB • FEM mesh validation',
  },
  layerFacade: {
    RU: 'Остекление & Навесной фасад',
    KZ: 'Шынылау және аспалы қасбет',
    EN: 'Glazing & Curtain Facade',
  },
  layerColumns: {
    RU: 'Ж/Б Несущий каркас',
    KZ: 'Т/Б Жүк көтергіш қаңқа',
    EN: 'RC Structural Frame',
  },
  layerShearWalls: {
    RU: 'Диафрагмы жесткости (Стены)',
    KZ: 'Қаттылық диафрагмалары (Қабырғалар)',
    EN: 'Shear Walls (Diaphragms)',
  },
  layerRaft: {
    RU: 'Свайный ростверк плиты',
    KZ: 'Тақтаның қадалы ростверкі',
    EN: 'Piled Raft Foundation',
  },
  layerDampers: {
    RU: 'LRB-Демпферы фундамента',
    KZ: 'Іргетастың LRB-демпферлері',
    EN: 'Base LRB Dampers',
  },
  explodeTitle: {
    RU: 'ВЗРЫВ-СХЕМА (EXPLODE)',
    KZ: 'ЖАЗЫҚ СХЕМА (EXPLODE)',
    EN: 'EXPLODED VIEW',
  },
  explodeAssembly: {
    RU: 'СБОРКА (0%)',
    KZ: 'ЖИНАҚ (0%)',
    EN: 'ASSEMBLED (0%)',
  },
  explodeExpanded: {
    RU: 'РАЗНЕСЕНИЕ (100%)',
    KZ: 'ЖАЮ (100%)',
    EN: 'EXPLODED (100%)',
  },
  geometryTitle: {
    RU: 'ГЕОМЕТРИЯ И ИЗОЛЯЦИЯ',
    KZ: 'ГЕОМЕТРИЯ МЕН ОҚШАУЛАУ',
    EN: 'GEOMETRY & ISOLATION',
  },
  floors: {
    RU: 'ЭТАЖНОСТЬ',
    KZ: 'ҚАБАТТАР',
    EN: 'FLOOR COUNT',
  },
  floorsUnit: {
    RU: 'эт.',
    KZ: 'қабат',
    EN: 'fl.',
  },
  span: {
    RU: 'ШАГ КОЛОНН',
    KZ: 'БАҒАНДАР ҚАДАМЫ',
    EN: 'COLUMN SPAN',
  },
  isolation: {
    RU: 'БАЗОВАЯ СЕЙСМОИЗОЛЯЦИЯ',
    KZ: 'НЕГІЗГІ СЕЙСМООҚШАУЛАУ',
    EN: 'BASE SEISMIC ISOLATION',
  },
  isolationOptLRB: {
    RU: 'Свинцово-резиновые опоры (LRB-800)',
    KZ: 'Қорғасын-резеңке тіректері (LRB-800)',
    EN: 'Lead Rubber Bearings (LRB-800)',
  },
  isolationOptFPS: {
    RU: 'Фрикционно-маятниковые опоры (FPS)',
    KZ: 'Үйкелісті-маятникті тіректер (FPS)',
    EN: 'Friction Pendulum Bearings (FPS)',
  },
  isolationOptFVD: {
    RU: 'Вязкоупругие демпферы (FVD)',
    KZ: 'Тұтқыр серпімді демпферлер (FVD)',
    EN: 'Fluid Viscous Dampers (FVD)',
  },
  isolationOptNone: {
    RU: 'Без изоляции (Жесткая база)',
    KZ: 'Оқшаулаусыз (Қатты іргетас)',
    EN: 'No Isolation (Fixed Base)',
  },
  isolationShearNorm: {
    RU: 'Деформация сдвига γ = 250%',
    KZ: 'Ығысу деформациясы γ = 250%',
    EN: 'Shear strain γ = 250%',
  },
  isolationRigidWarning: {
    RU: 'Критическая передача импульса 100%',
    KZ: 'Импульстің 100% қауіпті берілуі',
    EN: 'Critical 100% impulse transfer',
  },
  intensity: {
    RU: 'ИНТЕНСИВНОСТЬ (MSK-64)',
    KZ: 'ҚАРҚЫНДЫЛЫҒЫ (MSK-64)',
    EN: 'INTENSITY (MSK-64)',
  },
  pointsUnit: {
    RU: 'БАЛЛОВ',
    KZ: 'БАЛЛ',
    EN: 'POINTS',
  },
  intensityPerceptible: {
    RU: '5.0 (Ощутимое)',
    KZ: '5.0 (Сезілетін)',
    EN: '5.0 (Perceptible)',
  },
  intensityDestructive: {
    RU: '8.5 (Разруш.)',
    KZ: '8.5 (Қиратушы)',
    EN: '8.5 (Destructive)',
  },
  intensityCatastrophic: {
    RU: '11.0 (Катастрофа)',
    KZ: '11.0 (Апатты)',
    EN: '11.0 (Catastrophic)',
  },
  soil: {
    RU: 'ГРУНТ (СП РК 2.03-2017)',
    KZ: 'ТОПЫРАҚ (ҚР ЕЖ 2.03-2017)',
    EN: 'SOIL CLASS (SP RK 2.03-2017)',
  },
  soilCategory1: {
    RU: 'I: Скальный',
    KZ: 'I: Жартасты',
    EN: 'I: Bedrock',
  },
  soilCategory2: {
    RU: 'II: Суглинок (Алматы)',
    KZ: 'II: Құмдақ (Алматы)',
    EN: 'II: Loam (Almaty)',
  },
  soilCategory3: {
    RU: 'III: Мягкий / Водонасыщ.',
    KZ: 'III: Жұмсақ / Сулы',
    EN: 'III: Soft / Saturated',
  },
  resilienceIndex: {
    RU: 'ИНДЕКС СЕЙСМОСТОЙКОСТИ',
    KZ: 'СЕЙСМОТҰРАҚТЫЛЫҚ ИНДЕКСІ',
    EN: 'RESILIENCE INDEX',
  },
  willWithstand: {
    RU: 'ВЫДЕРЖИТ',
    KZ: 'ТӨЗЕДІ',
    EN: 'SURVIVES',
  },
  categorySafe: {
    RU: 'Категория: Надежно',
    KZ: 'Санат: Сенімді',
    EN: 'Category: Safe',
  },
  categoryCritical: {
    RU: 'Категория: Критический риск',
    KZ: 'Санат: Қауіпті деңгей',
    EN: 'Category: Critical risk',
  },
  residualResource: {
    RU: 'ОСТАТОЧНЫЙ РЕСУРС',
    KZ: 'ҚАЛДЫҚ РЕСУРС',
    EN: 'RESIDUAL RESOURCE',
  },
  interstoryDrift: {
    RU: 'МАКС. МЕЖЭТАЖНЫЙ ДРИФТ',
    KZ: 'ЕҢ ҮЛКЕН ҚАБАТ-АРАЛЫҚ ЫҒЫСУ',
    EN: 'MAX INTERSTORY DRIFT',
  },
  waveformTitle: {
    RU: 'ОСЦИЛЛОГРАММА ВОЛН (CH-01)',
    KZ: 'ТОЛҚЫНДАР ОСЦИЛЛОГРАММАСЫ (CH-01)',
    EN: 'SEISMIC ACCELEROGRAM (CH-01)',
  },
  simulatingLive: {
    RU: 'СИМУЛЯЦИЯ // 100 С/с',
    KZ: 'СИМУЛЯЦИЯ // 100 С/с',
    EN: 'SIMULATION // 100 S/s',
  },
  liveRate: {
    RU: 'LIVE // 100 S/s',
    KZ: 'ТІКЕЛЕЙ // 100 С/с',
    EN: 'LIVE // 100 S/s',
  },
  pWaveLabel: {
    RU: 'P-ВОЛНА (3.2c)',
    KZ: 'P-ТОЛҚЫН (3.2c)',
    EN: 'P-WAVE (3.2s)',
  },
  sWaveLabel: {
    RU: 'S-ВОЛНА (7.8c)',
    KZ: 'S-ТОЛҚЫН (7.8c)',
    EN: 'S-WAVE (7.8s)',
  },
  feaTitle: {
    RU: 'НАПРЯЖЕННО-ДЕФОРМИРОВАННОЕ СОСТОЯНИЕ',
    KZ: 'КЕРНЕУЛІ-ДЕФОРМАЦИЯЛЫҚ КҮЙ',
    EN: 'STRESS-STRAIN ANALYSIS (FEA)',
  },
  auditComplianceNote: {
    RU: 'Автоматический расчет динамики выполнен в соответствии со СП РК 2.03-2017 «Строительство в сейсмических зонах РК».',
    KZ: 'Динамиканы автоматты есептеу ҚР ЕЖ 2.03-2017 «ҚР сейсмикалық аймақтарындағы құрылыс» талаптарына сәйкес орындалды.',
    EN: 'Automated dynamic calculations comply with SP RK 2.03-2017 "Construction in Seismic Zones of the Republic of Kazakhstan".',
  },
  tectonicDrift: {
    RU: 'ТЕКТОНИЧЕСКИЙ ДРЕЙФ',
    KZ: 'ТЕКТОНИКАЛЫҚ ЫҒЫСУ',
    EN: 'TECTONIC DRIFT',
  },
  seismicRisk: {
    RU: 'СЕЙСМИЧЕСКИЙ РИСК',
    KZ: 'СЕЙСМИКАЛЫҚ ТӘУЕКЕЛ',
    EN: 'SEISMIC RISK',
  },
  moderateRisk: {
    RU: 'УМЕРЕННЫЙ (III)',
    KZ: 'ОРТАША (III)',
    EN: 'MODERATE (III)',
  },
  leadEng: {
    RU: 'Ведущий инженер-сейсмолог',
    KZ: 'Бас сейсмоқұрылымдық инженер',
    EN: 'Lead Structural Eng.',
  },
  projectPrefix: {
    RU: 'ПРОЕКТ /',
    KZ: 'ЖОБА /',
    EN: 'PROJECT /',
  },
  seismicZoneSubtitle: {
    RU: '(АЛМАТЫ, СЕЙСМОЗОНА 9–10 БАЛЛОВ)',
    KZ: '(АЛМАТЫ, 9–10 БАЛЛ СЕЙСМИКАЛЫҚ АЙМАҚ)',
    EN: '(ALMATY, SEISMIC ZONE 9–10 MSK)',
  },
  benchPlatformReady: {
    RU: '6-DOF СЕЙСМОПЛАТФОРМА: ГОТОВА',
    KZ: '6-DOF СЕЙСМОПЛАТФОРМА: ДАЙЫН',
    EN: '6-DOF SHAKE PLATFORM: READY',
  },
  benchPlatformSimulating: {
    RU: '6-DOF СЕЙСМОПЛАТФОРМА: ТЕСТ БЕЛСЕНДІ',
    KZ: '6-DOF СЕЙСМОПЛАТФОРМА: СЫНАҚ ЖҮРУДЕ',
    EN: '6-DOF SHAKE PLATFORM: SIMULATION ACTIVE',
  },
  roofAccelCallout: {
    RU: 'ACCEL_Z: КРОВЛЯ',
    KZ: 'ҮДЕТУ_Z: ШАТЫР',
    EN: 'ACCEL_Z: ROOF',
  },
  driftCallout: {
    RU: 'СМЕЩЕНИЕ #4',
    KZ: 'ЫҒЫСУ #4',
    EN: 'DRIFT #4',
  },
  inNormCallout: {
    RU: 'В НОРМЕ',
    KZ: 'ҚАЛЫПТЫ',
    EN: 'NOMINAL',
  },
  dangerCallout: {
    RU: 'ОПАСНОСТЬ',
    KZ: 'ҚАУІПТІ',
    EN: 'DANGER',
  },
  shearCallout: {
    RU: 'СДВИГ LRB ОПОР',
    KZ: 'LRB ТІРЕКТЕРДІҢ ЫҒЫСУЫ',
    EN: 'BASE LRB SHEAR',
  },
  resetExplode: {
    RU: 'Сброс взрыв-схемы',
    KZ: 'Жайылған сызбаны қалпына келтіру',
    EN: 'Reset explode view',
  },
  deformationGrid: {
    RU: 'Сетка деформаций',
    KZ: 'Деформация торы',
    EN: 'Deformation grid',
  },
  stressHeatmap: {
    RU: 'Тепловая карта стресса',
    KZ: 'Стресс жылулық картасы',
    EN: 'Stress heatmap',
  },
  metersUnit: {
    RU: ' м',
    KZ: ' м',
    EN: ' m',
  },
  mapHeaderPrefix: {
    RU: 'СЕЙСМОКАРТА /',
    KZ: 'СЕЙСМОКАРТА /',
    EN: 'SEISMIC MAP /',
  },
  mapTitle: {
    RU: 'Сейсмическая карта: Казахстан (17 областей) и Мир',
    KZ: 'Сейсмикалық карта: Қазақстан (17 облыс) және Әлем',
    EN: 'Seismic Map: Kazakhstan (17 Regions) & Global World',
  },
  mapScopeWholeCountry: {
    RU: '🇰🇿 ВСЯ СТРАНА (17 ОБЛАСТЕЙ)',
    KZ: '🇰🇿 БҮКІЛ ЕЛ (17 ОБЛЫС)',
    EN: '🇰🇿 WHOLE COUNTRY (17 REGIONS)',
  },
  mapScopeWorld: {
    RU: '🌍 КАРТА МИРА (ВСЕ СТРАНЫ)',
    KZ: '🌍 ӘЛЕМДІК КАРТА (БАРЛЫҚ ЕЛДЕР)',
    EN: '🌍 WORLD MAP (ALL COUNTRIES)',
  },
  mapScopeAlmaty: {
    RU: '🏔️ СЕКТОР АЛМАТЫ',
    KZ: '🏔️ АЛМАТЫ СЕКТОРЫ',
    EN: '🏔️ ALMATY SECTOR',
  },
  filterOblasts: {
    RU: 'ОБЛАСТИ РК (17)',
    KZ: 'ҚР ОБЛЫСТАРЫ (17)',
    EN: 'REGIONS OF RK (17)',
  },
  stationsOnline: {
    RU: '24 СТАНЦИИ ONLINE',
    KZ: '24 СТАНЦИЯ ONLINE',
    EN: '24 STATIONS ONLINE',
  },
  filterAllM: {
    RU: 'ВСЕ М',
    KZ: 'БАРЛЫҚ М',
    EN: 'ALL M',
  },
  filterFaults: {
    RU: 'РАЗЛОМЫ',
    KZ: 'ЖАРЫҚШАҚТАР',
    EN: 'FAULTS',
  },
  filterStations: {
    RU: 'СТАНЦИИ СЕЙСМОСЕТИ',
    KZ: 'СЕЙСМОЖЕЛІ СТАНЦИЯЛАРЫ',
    EN: 'SEISMIC STATIONS',
  },
  filterSoil: {
    RU: 'ЗОНЫ ГРУНТА / ОПАСНОСТИ',
    KZ: 'ТОПЫРАҚ / ҚАУІП АЙМАҚТАРЫ',
    EN: 'SOIL / HAZARD ZONES',
  },
  filterCities: {
    RU: 'ГОРОДА',
    KZ: 'ҚАЛАЛАР',
    EN: 'CITIES',
  },
  zoomIn: {
    RU: 'Приблизить',
    KZ: 'Жақындату',
    EN: 'Zoom In',
  },
  zoomOut: {
    RU: 'Отдалить',
    KZ: 'Алыстату',
    EN: 'Zoom Out',
  },
  resetZoom: {
    RU: 'Сброс',
    KZ: 'Қалпына келтіру',
    EN: 'Reset',
  },
  activeFault: {
    RU: 'АКТИВНЫЙ ТЕКТОНИЧЕСКИЙ РАЗЛОМ',
    KZ: 'БЕЛСЕНДІ ТЕКТОНИКАЛЫҚ ЖАРЫҚШАҚ',
    EN: 'ACTIVE TECTONIC FAULT',
  },
  eventCard: {
    RU: 'КАРТОЧКА СОБЫТИЯ',
    KZ: 'ОҚИҒА КАРТОЧКАСЫ',
    EN: 'EVENT DOSSIER',
  },
  magnitudeLabel: {
    RU: 'МАГНИТУДА',
    KZ: 'МАГНИТУДАСЫ',
    EN: 'MAGNITUDE',
  },
  depthLabel: {
    RU: 'ГЛУБИНА ОЧАГА',
    KZ: 'ОШАҚ ТЕРЕҢДІГІ',
    EN: 'FOCAL DEPTH',
  },
  distanceLabel: {
    RU: 'РАССТОЯНИЕ ДО АЛМАТЫ',
    KZ: 'АЛМАТЫҒА ДЕЙІНГІ ҚАШЫҚТЫҚ',
    EN: 'DISTANCE TO ALMATY',
  },
  pgaObservedLabel: {
    RU: 'ПИКОВОЕ УСКОРЕНИЕ',
    KZ: 'ШЫҢДЫҚ ҮДЕТУ',
    EN: 'PEAK ACCELERATION',
  },
  epicenterImpact: {
    RU: 'Очаг и последствия:',
    KZ: 'Ошақ және зардаптар:',
    EN: 'Epicenter and consequences:',
  },
  structuralImpactLabel: {
    RU: 'Воздействие на застройку:',
    KZ: 'Құрылысқа әсері:',
    EN: 'Structural impact:',
  },
  engineeringLessons: {
    RU: 'ИНЖЕНЕРНЫЕ УРОКИ:',
    KZ: 'ИНЖЕНЕРЛІК САБАҚТАР:',
    EN: 'ENGINEERING LESSONS:',
  },
  stationTelemetry: {
    RU: 'ТЕЛЕМЕТРИЯ СТАНЦИИ',
    KZ: 'СТАНЦИЯ ТЕЛЕМЕТРИЯСЫ',
    EN: 'STATION TELEMETRY',
  },
  currentPga: {
    RU: 'ТЕКУЩИЙ ФОН PGA',
    KZ: 'АҒЫМДАҒЫ PGA ФОНЫ',
    EN: 'CURRENT PGA BACKGROUND',
  },
  dominantFreq: {
    RU: 'ДОМИНИРУЮЩАЯ ЧАСТОТА',
    KZ: 'БАСТЫ ЖИІЛІК',
    EN: 'DOMINANT FREQUENCY',
  },
  spectralSignal: {
    RU: 'СПЕКТРАЛЬНЫЙ СИГНАЛ (ШУМ ГРУНТА):',
    KZ: 'СПЕКТРАЛДЫҚ ДАБЫЛ (ТОПЫРАҚ ШУЫ):',
    EN: 'SPECTRAL SIGNAL (GROUND NOISE):',
  },
  selectPrompt: {
    RU: 'Выберите эпицентр землетрясения или станцию на карте для детального анализа.',
    KZ: 'Талдау жасау үшін картадағы жер сілкінісі ошағын немесе станцияны таңдаңыз.',
    EN: 'Select an earthquake epicenter or seismic station on the map to inspect details.',
  },
  archivePrefix: {
    RU: 'АРХИВ /',
    KZ: 'АРХИВ /',
    EN: 'ARCHIVE /',
  },
  historyTitle: {
    RU: 'История катастроф и инженерная экспертиза разрушений',
    KZ: 'Қазақстан мен Орталық Азияның апаттар тарихы',
    EN: 'Disaster History & Structural Forensics of Central Asia',
  },
  tabChronicle: {
    RU: 'ХРОНИКА (1887–2024)',
    KZ: 'ХРОНИКА (1887–2024)',
    EN: 'CHRONICLE (1887–2024)',
  },
  tabZenkov: {
    RU: 'ФЕНОМЕН СОБОРА ЗЕНКОВА',
    KZ: 'ЗЕНКОВ СОБОРЫНЫҢ ҚҰПИЯСЫ',
    EN: 'ZENKOV CATHEDRAL PHENOMENON',
  },
  tabForensics: {
    RU: 'АНАТОМИЯ РАЗРУШЕНИЙ',
    KZ: 'ҚИРАУЛАР АНАТОМИЯСЫ',
    EN: 'FAILURE FORENSICS',
  },
  catalogEvents: {
    RU: 'КАТАЛОГ СЕЙСМИЧЕСКИХ СОБЫТИЙ',
    KZ: 'СЕЙСМИКАЛЫҚ ОҚИҒАЛАР КАТАЛОГЫ',
    EN: 'SEISMIC EVENTS CATALOG',
  },
  fatalitiesLabel: {
    RU: 'ПОСЛЕДСТВИЯ',
    KZ: 'ЗАРДАПТАР',
    EN: 'CASUALTIES',
  },
  chronicleDetail: {
    RU: 'ХРОНИКА СОБЫТИЯ',
    KZ: 'ОҚИҒА ХРОНИКАСЫ',
    EN: 'EVENT CHRONICLE',
  },
  forensicAnalysis: {
    RU: 'ИНЖЕНЕРНЫЙ АНАЛИЗ ПОВРЕЖДЕНИЙ',
    KZ: 'ҚИРАУЛАРДЫ ИНЖЕНЕРЛІК ТАЛДАУ',
    EN: 'ENGINEERING DAMAGE ANALYSIS',
  },
  implementedNorms: {
    RU: 'ВНЕДРЕННЫЕ РЕШЕНИЯ В НОРМЫ КАЗАХСТАНА',
    KZ: 'ҚАЗАҚСТАН НОРМАЛАРЫНА ЕНГІЗІЛГЕН ШЕШІМДЕР',
    EN: 'SOLUTIONS ADOPTED IN KAZAKHSTAN CODES',
  },
  materialsPrefix: {
    RU: 'ЛАБОРАТОРИЯ /',
    KZ: 'ЗЕРТХАНА /',
    EN: 'LABORATORY /',
  },
  materialsTitle: {
    RU: 'Сейсмозащитные материалы и демпфирующие системы КазНИИСА',
    KZ: 'Сейсмоқорғаныс материалдары мен демпферлеу жүйелері',
    EN: 'Materials Lab & Seismic Protection Systems',
  },
  materialsCatalogTitle: {
    RU: 'КАТАЛОГ СИСТЕМ И МАТЕРИАЛОВ',
    KZ: 'ЖҮЙЕЛЕР МЕН МАТЕРИАЛДАР КАТАЛОГЫ',
    EN: 'SYSTEMS & MATERIALS CATALOG',
  },
  dampingRatioLabel: {
    RU: 'КОЭФФ. ДЕМПФИРОВАНИЯ ξ',
    KZ: 'ДЕМПФЕРЛЕУ КОЭФФ. ξ',
    EN: 'DAMPING RATIO ξ',
  },
  shearModulusLabel: {
    RU: 'МОДУЛЬ СДВИГА G',
    KZ: 'ЫҒЫСУ МОДУЛІ G',
    EN: 'SHEAR MODULUS G',
  },
  hysteresisTypeLabel: {
    RU: 'ТИП ГИСТЕРЕЗИСА',
    KZ: 'ГИСТЕРЕЗИС ТҮРІ',
    EN: 'HYSTERESIS TYPE',
  },
  hysteresisLoopTitle: {
    RU: 'ПЕТЛЯ ГИСТЕРЕЗИСА (СИЛА F — СМЕЩЕНИЕ Δ)',
    KZ: 'ГИСТЕРЕЗИС ІЛМЕГІ (F КҮШІ — Δ ЫҒЫСУ)',
    EN: 'HYSTERESIS LOOP (FORCE F — DISPLACEMENT Δ)',
  },
  cyclicLoadSubtitle: {
    RU: 'Циклическое нагружение на гидравлическом прессе',
    KZ: 'Гидравликалық престегі циклдік жүктеме сынағы',
    EN: 'Cyclic loading test on hydraulic press',
  },
  dissipatedEnergyLabel: {
    RU: 'РАССЕЯННАЯ ЭНЕРГИЯ E_d',
    KZ: 'СІҢІРІЛГЕН ЭНЕРГИЯ E_d',
    EN: 'DISSIPATED ENERGY E_d',
  },
  joulesPerCycle: {
    RU: 'Дж / цикл',
    KZ: 'Дж / цикл',
    EN: 'J / cycle',
  },
  emergencyPrefix: {
    RU: '112 SOS /',
    KZ: '112 SOS /',
    EN: '112 SOS /',
  },
  emergencyTitle: {
    RU: 'Центр гражданской защиты и экстренной готовности при землетрясении (112 МЧС РК)',
    KZ: 'ҚР ТЖМ Төтенше жағдайлар мен азаматтық қорғаныс орталығы',
    EN: 'Civil Defense & Emergency Preparedness Hub 112',
  },
  tabGoBag: {
    RU: 'ТРЕВОЖНЫЙ ЧЕМОДАНЧИК',
    KZ: 'ДАБЫЛ СӨМКЕСІ',
    EN: 'EMERGENCY GO-BAG',
  },
  tabTriangle: {
    RU: 'ТРЕУГОЛЬНИК ЖИЗНИ',
    KZ: 'ӨМІР ҮШБҰРЫШЫ',
    EN: 'TRIANGLE OF LIFE',
  },
  tabAssembly: {
    RU: 'ПУНКТЫ СБОРА В АЛМАТЫ',
    KZ: 'АЛМАТЫДАҒЫ ЖИНАЛУ ОРЫНДАРЫ',
    EN: 'ALMATY ASSEMBLY POINTS',
  },
  tabSos: {
    RU: 'SOS СИГНАЛ',
    KZ: 'SOS ДАБЫЛЫ',
    EN: 'SOS ALARM',
  },
  goBagReadiness: {
    RU: 'ГОТОВНОСТЬ ЧЕМОДАНЧИКА',
    KZ: 'ДАБЫЛ СӨМКЕСІНІҢ ДАЙЫНДЫҒЫ',
    EN: 'GO-BAG READINESS',
  },
  readyBadge: {
    RU: 'ГОТОВ',
    KZ: 'ДАЙЫН',
    EN: 'READY',
  },
  ofItemsCount: {
    RU: 'предметов',
    KZ: 'заттан',
    EN: 'items',
  },
  fromTotal: {
    RU: 'из',
    KZ: 'барлығы',
    EN: 'of',
  },
  totalWeight: {
    RU: 'ОБЩИЙ ВЕС',
    KZ: 'ЖАЛПЫ САЛМАҚ',
    EN: 'TOTAL WEIGHT',
  },
  autonomy: {
    RU: 'АВТОНОМНОСТЬ',
    KZ: 'АВТОНОМИЯ',
    EN: 'AUTONOMY',
  },
  hours72: {
    RU: '72 ЧАСА',
    KZ: '72 САҒАТ',
    EN: '72 HOURS',
  },
  goBagAdvice: {
    RU: 'Храните рюкзак у самого выхода из квартиры в доступном месте. Каждый член семьи должен знать его расположение.',
    KZ: 'Рюкзакты пәтерден шыға беріс жерде сақтаңыз. Әрбір отбасы мүшесі оның тұрған жерін білуі тиіс.',
    EN: 'Store the backpack near the exit in an accessible place. Every family member should know where it is kept.',
  },
  markAllPacked: {
    RU: 'Отметить всё как собрано',
    KZ: 'Барлығы жиналды деп белгілеу',
    EN: 'Mark all items as packed',
  },
  resetPackList: {
    RU: 'Сбросить список',
    KZ: 'Тізімді тазалау',
    EN: 'Reset list',
  },
  importanceCritical: {
    RU: 'КРИТИЧЕСКИ ВАЖНО',
    KZ: 'АСА МАҢЫЗДЫ',
    EN: 'CRITICAL',
  },
  importanceImportant: {
    RU: 'ВАЖНО',
    KZ: 'МАҢЫЗДЫ',
    EN: 'IMPORTANT',
  },
  importanceRecommended: {
    RU: 'РЕКОМЕНДУЕТСЯ',
    KZ: 'ҰСЫНЫЛАДЫ',
    EN: 'RECOMMENDED',
  },
  allDistricts: {
    RU: 'Все районы Алматы',
    KZ: 'Алматының барлық аудандары',
    EN: 'All Almaty districts',
  },
  placesCapacity: {
    RU: 'мест',
    KZ: 'орын',
    EN: 'places',
  },
  heatedTents: {
    RU: 'Обогреваемые палатки',
    KZ: 'Жылытылатын шатырлар',
    EN: 'Heated tents',
  },
  medicalPost: {
    RU: 'Медпункт и скорая',
    KZ: 'Медпункт және жедел жәрдем',
    EN: 'First-aid post',
  },
  playSosSiren: {
    RU: 'ВКЛЮЧИТЬ ТРЕВОГУ SOS И СИРЕНУ 112',
    KZ: 'SOS ДАБЫЛЫ МЕН 112 СИРЕНАСЫН ҚОСУ',
    EN: 'ACTIVATE 112 SOS SIREN & ALARM',
  },
  sirenActive: {
    RU: 'СИРЕНА РАБОТАЕТ... (ТЕСТ)',
    KZ: 'СИРЕНА ДЫБЫСТАЛУДА... (ТЕСТ)',
    EN: 'SIREN SOUNDING... (TEST)',
  },
  testOnlyNote: {
    RU: 'Учебный звуковой синтезатор гражданской обороны Алматы. Громкость: 85 дБ.',
    KZ: 'Алматы азаматтық қорғанысының оқу дыбыстық синтезаторы. Қаттылығы: 85 дБ.',
    EN: 'Almaty civil defense training synthesizer. Volume: 85 dB.',
  },
  emergencyContactsTitle: {
    RU: 'ЭКСТРЕННЫЕ СЛУЖБЫ АЛМАТЫ',
    KZ: 'АЛМАТЫНЫҢ ШҰҒЫЛ ҚЫЗМЕТТЕРІ',
    EN: 'ALMATY EMERGENCY CONTACTS',
  },
  spRkCert: {
    RU: 'СП РК 2.03-2017 СЕРТИФИКАЦИЯ',
    KZ: 'ҚР ЕЖ 2.03-2017 СЕРТИФИКАТТАУ',
    EN: 'SP RK 2.03-2017 CERTIFICATION',
  },
  closeBtn: {
    RU: 'Закрыть',
    KZ: 'Жабу',
    EN: 'Close',
  },
};

export function getT(key: keyof typeof T, lang: Language): string {
  const item = T[key];
  if (!item) return String(key);
  return item[lang] || item['RU'];
}
