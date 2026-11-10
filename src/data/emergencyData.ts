import { AssemblyPoint } from '../types.js';

export interface GoBagItem {
  id: string;
  name: string;
  nameEn: string;
  nameKz: string;
  category: 'docs' | 'water_food' | 'first_aid' | 'tools' | 'warmth';
  weightKg: number;
  importance: 'critical' | 'important' | 'recommended';
  checked: boolean;
  notes: string;
}

export const INITIAL_GO_BAG_ITEMS: GoBagItem[] = [
  { id: '1', name: 'Оригиналы документов в гермопакете (уд. личности, св-ва, права на жилье)', nameEn: 'IDs and property deeds in waterproof pouch', nameKz: 'Су өткізбейтін қапшықтағы құжаттар', category: 'docs', weightKg: 0.4, importance: 'critical', checked: true, notes: 'Хранить у выхода' },
  { id: '2', name: 'Наличные деньги мелких купюр (банкоматы отключатся)', nameEn: 'Cash in small bills', nameKz: 'Ұсақ ақшалар (қолма-қол)', category: 'docs', weightKg: 0.2, importance: 'critical', checked: true, notes: 'Минимум 50-100 тыс. тенге' },
  { id: '3', name: 'Питьевая вода (3 литра на человека в прочной таре)', nameEn: 'Drinking water (3L per person)', nameKz: 'Ауыз су (жан басына 3 литр)', category: 'water_food', weightKg: 3.0, importance: 'critical', checked: true, notes: 'Запас на 72 часа' },
  { id: '4', name: 'Высококалорийная еда длительного хранения (орехи, сухофрукты, консервы)', nameEn: 'Non-perishable energy food & rations', nameKz: 'Ұзақ сақталатын жоғары калориялы тағамдар', category: 'water_food', weightKg: 1.5, importance: 'critical', checked: true, notes: 'Готово к употреблению без варки' },
  { id: '5', name: 'Аптечка первой помощи (жгуты-турникеты, бинты, антисептики, личные лекарства)', nameEn: 'First-aid kit with tourniquets & antiseptics', nameKz: 'Алғашқы медициналық көмек қобдишасы', category: 'first_aid', weightKg: 0.8, importance: 'critical', checked: true, notes: 'Проверять срок годности каждые 6 мес' },
  { id: '6', name: 'Фонарь налобный + запасные литиевые батарейки (2 комплекта)', nameEn: 'Headlamp with spare batteries', nameKz: 'Басқа тағатын шам + қосымша батареялар', category: 'tools', weightKg: 0.3, importance: 'critical', checked: true, notes: 'Не использовать свечи или спички из-за газа!' },
  { id: '7', name: 'FM-радиоприемник автономный (для экстренных сводок ЧС)', nameEn: 'Emergency battery-powered FM radio', nameKz: 'Автономды FM-радиоқабылдағыш', category: 'tools', weightKg: 0.4, importance: 'important', checked: false, notes: 'Частота ЧС Алматы: 102.8 FM' },
  { id: '8', name: 'Свисток сигнальный (для спасателей под завалами)', nameEn: 'Loud survival whistle', nameKz: 'Дабыл ысқырығы (құтқарушыларды шақыру)', category: 'tools', weightKg: 0.05, importance: 'critical', checked: true, notes: 'Бережет голосовые связки' },
  { id: '9', name: 'Пауэрбанк 20000 mAh + кабели зарядки', nameEn: 'Powerbank 20,000 mAh & charging cables', nameKz: 'Пауэрбанк 20 000 мАч + кабельдер', category: 'tools', weightKg: 0.5, importance: 'important', checked: true, notes: 'Держать всегда заряженным на 100%' },
  { id: '10', name: 'Термоодеяло фольгированное + теплая флисовая кофта', nameEn: 'Mylar space blanket + fleece jacket', nameKz: 'Фольгалы терможамылғы + жылы киім', category: 'warmth', weightKg: 0.9, importance: 'critical', checked: true, notes: 'Защита от переохлаждения ночью' },
  { id: '11', name: 'Респираторы класса FFP3 (от цементной пыли и асбеста)', nameEn: 'FFP3 respirators against concrete dust', nameKz: 'FFP3 тыныс алу респираторы (шаңнан қорғау)', category: 'first_aid', weightKg: 0.1, importance: 'important', checked: false, notes: 'По 2 штуки на каждого члена семьи' },
  { id: '12', name: 'Швейцарский мультитул или складной нож с открывашкой', nameEn: 'Multi-tool with pliers and knife', nameKz: 'Мультитул немесе жиналмалы пышақ', category: 'tools', weightKg: 0.3, importance: 'recommended', checked: false, notes: 'Прочный стальной инструмент' },
];

export const ALMATY_ASSEMBLY_POINTS: AssemblyPoint[] = [
  {
    id: 'bostandyk-01',
    name: 'Стадион «Центральный» (Главный южный эвакопункт)',
    district: 'Бостандыкский район',
    districtEn: 'Bostandyk District',
    districtKz: 'Бостандық ауданы',
    address: 'ул. Сатпаева, 29/3',
    capacityPeople: 18000,
    hasHeatedTents: true,
    hasMedicalPost: true,
    coords: [43.238, 76.924],
  },
  {
    id: 'almaly-01',
    name: 'Парк им. 28 гвардейцев-панфиловцев (Пункт сбора №12)',
    district: 'Алмалинский район',
    districtEn: 'Almaly District',
    districtKz: 'Алмалы ауданы',
    address: 'ул. Гоголя / ул. Зенкова',
    capacityPeople: 12000,
    hasHeatedTents: true,
    hasMedicalPost: true,
    coords: [43.259, 76.953],
  },
  {
    id: 'medeu-01',
    name: 'Территория Выставки Атакент (Павильоны 8, 9, 10)',
    district: 'Бостандыкский район',
    districtEn: 'Bostandyk District',
    districtKz: 'Бостандық ауданы',
    address: 'ул. Тимирязева, 42',
    capacityPeople: 15000,
    hasHeatedTents: true,
    hasMedicalPost: true,
    coords: [43.224, 76.907],
  },
  {
    id: 'auezov-01',
    name: 'Стадион КазЭУ им. Рыскулова / сквер Сары-Арка',
    district: 'Ауэзовский район',
    districtEn: 'Auezov District',
    districtKz: 'Әуезов ауданы',
    address: 'мкр. 4, ул. Жандосова, 55',
    capacityPeople: 9500,
    hasHeatedTents: true,
    hasMedicalPost: true,
    coords: [43.218, 76.864],
  },
  {
    id: 'turksib-01',
    name: 'Стадион «Авиатор» и школа-гимназия №78',
    district: 'Турксибский район',
    districtEn: 'Turksib District',
    districtKz: 'Түрксіб ауданы',
    address: 'ул. Майлина, 48',
    capacityPeople: 8000,
    hasHeatedTents: false,
    hasMedicalPost: true,
    coords: [43.342, 76.982],
  },
  {
    id: 'nauryzbay-01',
    name: 'Акимат Наурызбайского района (Открытая площадь)',
    district: 'Наурызбайский район',
    districtEn: 'Nauryzbay District',
    districtKz: 'Наурызбай ауданы',
    address: 'мкр. Шугыла, 347',
    capacityPeople: 11000,
    hasHeatedTents: true,
    hasMedicalPost: true,
    coords: [43.208, 76.788],
  },
];
