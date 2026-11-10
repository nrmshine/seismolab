import React, { useState, useRef } from 'react';
import { Language, EarthquakeEvent, SeismicStation } from '../../types.js';
import { HISTORIC_EARTHQUAKES, SEISMIC_STATIONS, TECTONIC_FAULTS } from '../../data/earthquakesData.js';
import { KAZAKHSTAN_OBLASTS, OblastInfo, GLOBAL_MEGA_EARTHQUAKES, GlobalMegaEarthquake } from '../../data/oblastAndWorldData.js';
import { getT } from '../../data/translations.js';

interface EarthquakeMapViewProps {
  lang: Language;
}

interface CityInfo {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  coords: [number, number];
  seismicityMsk: number;
  designPga: number;
  population: string;
  soilZone: string;
}

const KAZAKHSTAN_CITIES: CityInfo[] = [
  { id: 'almaty', name: 'Алматы', nameKz: 'Алматы', nameEn: 'Almaty', coords: [43.238, 76.889], seismicityMsk: 9.5, designPga: 0.40, population: '2.2 млн', soilZone: 'II–III (Суглинки, гравий)' },
  { id: 'astana', name: 'Астана', nameKz: 'Астана', nameEn: 'Astana', coords: [51.160, 71.440], seismicityMsk: 6.0, designPga: 0.05, population: '1.4 млн', soilZone: 'I–II (Платформа, глина)' },
  { id: 'shymkent', name: 'Шымкент', nameKz: 'Шымкент', nameEn: 'Shymkent', coords: [42.320, 69.590], seismicityMsk: 8.0, designPga: 0.25, population: '1.2 млн', soilZone: 'II (Лессовые грунты)' },
  { id: 'taraz', name: 'Тараз', nameKz: 'Тараз', nameEn: 'Taraz', coords: [42.900, 71.370], seismicityMsk: 8.0, designPga: 0.28, population: '420 тыс.', soilZone: 'II (Аллювий, галечники)' },
  { id: 'karaganda', name: 'Караганда', nameKz: 'Қарағанды', nameEn: 'Karaganda', coords: [49.800, 73.100], seismicityMsk: 6.0, designPga: 0.05, population: '515 тыс.', soilZone: 'I (Песчаники, скалы)' },
  { id: 'aktobe', name: 'Актобе', nameKz: 'Ақтөбе', nameEn: 'Aktobe', coords: [50.280, 57.170], seismicityMsk: 6.0, designPga: 0.05, population: '560 тыс.', soilZone: 'I–II (Осадочные породы)' },
  { id: 'oskemen', name: 'Усть-Каменогорск', nameKz: 'Өскемен', nameEn: 'Oskemen', coords: [49.950, 82.610], seismicityMsk: 7.5, designPga: 0.20, population: '350 тыс.', soilZone: 'I–II (Скальные предгорья)' },
  { id: 'semey', name: 'Семей', nameKz: 'Семей', nameEn: 'Semey', coords: [50.410, 80.250], seismicityMsk: 7.0, designPga: 0.15, population: '330 тыс.', soilZone: 'I–II (Пойма Иртыша)' },
  { id: 'taldykorgan', name: 'Талдыкорган', nameKz: 'Талдықорған', nameEn: 'Taldykorgan', coords: [45.010, 78.370], seismicityMsk: 8.5, designPga: 0.32, population: '200 тыс.', soilZone: 'II (Джунгарский аллювий)' },
  { id: 'zaisan', name: 'Зайсан', nameKz: 'Зайсан', nameEn: 'Zaisan', coords: [47.470, 84.870], seismicityMsk: 8.0, designPga: 0.26, population: '16 тыс.', soilZone: 'II (Озерно-аллювиальные)' },
  { id: 'aktau', name: 'Актау', nameKz: 'Ақтау', nameEn: 'Aktau', coords: [43.650, 51.170], seismicityMsk: 6.0, designPga: 0.06, population: '270 тыс.', soilZone: 'I (Известняк-ракушечник)' },
  { id: 'atyrau', name: 'Атырау', nameKz: 'Атырау', nameEn: 'Atyrau', coords: [47.110, 51.920], seismicityMsk: 6.0, designPga: 0.05, population: '320 тыс.', soilZone: 'III (Прикаспийский ил)' },
  { id: 'kyzylorda', name: 'Кызылорда', nameKz: 'Қызылорда', nameEn: 'Kyzylorda', coords: [44.850, 65.510], seismicityMsk: 7.0, designPga: 0.12, population: '280 тыс.', soilZone: 'II–III (Песчано-илистые)' },
  { id: 'pavlodar', name: 'Павлодар', nameKz: 'Павлодар', nameEn: 'Pavlodar', coords: [52.300, 76.950], seismicityMsk: 6.0, designPga: 0.05, population: '365 тыс.', soilZone: 'I–II (Иртышская терраса)' },
  { id: 'kostanay', name: 'Костанай', nameKz: 'Қостанай', nameEn: 'Kostanay', coords: [53.210, 63.620], seismicityMsk: 6.0, designPga: 0.05, population: '260 тыс.', soilZone: 'I–II (Платформенные глины)' },
  { id: 'petropavl', name: 'Петропавловск', nameKz: 'Петропавл', nameEn: 'Petropavl', coords: [54.870, 69.150], seismicityMsk: 6.0, designPga: 0.05, population: '220 тыс.', soilZone: 'I–II (Ишимская равнина)' },
  { id: 'uralsk', name: 'Уральск', nameKz: 'Орал', nameEn: 'Uralsk', coords: [51.230, 51.370], seismicityMsk: 6.0, designPga: 0.05, population: '250 тыс.', soilZone: 'I–II (Пойма р. Урал)' },
  { id: 'turkistan', name: 'Туркестан', nameKz: 'Түркістан', nameEn: 'Turkistan', coords: [43.300, 68.270], seismicityMsk: 7.5, designPga: 0.20, population: '210 тыс.', soilZone: 'II (Оазисные суглинки)' },
  { id: 'zhezkazgan', name: 'Жезказган', nameKz: 'Жезқазған', nameEn: 'Zhezkazgan', coords: [47.780, 67.700], seismicityMsk: 6.0, designPga: 0.05, population: '90 тыс.', soilZone: 'I (Скальный мелкосопочник)' },
  { id: 'kokshetau', name: 'Кокшетау', nameKz: 'Көкшетау', nameEn: 'Kokshetau', coords: [53.280, 69.380], seismicityMsk: 6.0, designPga: 0.05, population: '165 тыс.', soilZone: 'I (Гранитные массивы)' },
  { id: 'konaev', name: 'Конаев', nameKz: 'Қонаев', nameEn: 'Konaev', coords: [43.850, 77.050], seismicityMsk: 9.0, designPga: 0.38, population: '75 тыс.', soilZone: 'II (Илийские отложения)' },
];

export const EarthquakeMapView: React.FC<EarthquakeMapViewProps> = ({ lang }) => {
  const [mapScope, setMapScope] = useState<'country' | 'world' | 'almaty'>('country');
  const [selectedEvent, setSelectedEvent] = useState<EarthquakeEvent | null>(HISTORIC_EARTHQUAKES[0]);
  const [selectedGlobalEvent, setSelectedGlobalEvent] = useState<GlobalMegaEarthquake | null>(null);
  const [selectedStation, setSelectedStation] = useState<SeismicStation | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [selectedOblast, setSelectedOblast] = useState<OblastInfo | null>(null);
  const [selectedFault, setSelectedFault] = useState<typeof TECTONIC_FAULTS[0] | null>(null);

  const [magFilter, setMagFilter] = useState<number>(0);
  const [showFaults, setShowFaults] = useState<boolean>(true);
  const [showStations, setShowStations] = useState<boolean>(true);
  const [showHazardZones, setShowHazardZones] = useState<boolean>(true);
  const [showCities, setShowCities] = useState<boolean>(true);
  const [showOblasts, setShowOblasts] = useState<boolean>(true);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filter earthquakes
  const filteredEvents = HISTORIC_EARTHQUAKES.filter((e) => e.magnitude >= magFilter);
  const filteredGlobalEvents = GLOBAL_MEGA_EARTHQUAKES.filter((e) => e.magnitude >= magFilter);

  // Coordinate projection for Kazakhstan & Central Asia:
  // Longitude range: 46.0°E to 88.0°E
  // Latitude range: 39.5°N to 55.5°N
  // Canvas: 1000 x 620
  const projectKZ = (lat: number, lon: number): [number, number] => {
    const minLon = 46.0;
    const maxLon = 88.0;
    const minLat = 39.5;
    const maxLat = 55.5;

    const x = ((lon - minLon) / (maxLon - minLon)) * 900 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 520 + 50;
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  };

  // Coordinate projection for World Map (Equirectangular / Plate Carrée):
  // Longitude: -180 to +180 -> X: 40 to 960 (width 920)
  // Latitude: -70 to +80 -> Y: 560 to 60 (height 500)
  const projectWorld = (lat: number, lon: number): [number, number] => {
    const x = ((lon + 180) / 360) * 920 + 40;
    const y = ((80 - lat) / 150) * 500 + 60;
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Clear selections
  const clearSelection = () => {
    setSelectedEvent(null);
    setSelectedGlobalEvent(null);
    setSelectedStation(null);
    setSelectedCity(null);
    setSelectedOblast(null);
    setSelectedFault(null);
  };

  // Kazakhstan border contour points
  const kzBorderPoints: [number, number][] = [
    [50.5, 47.0], [51.2, 51.4], [50.3, 57.2], [51.5, 60.5], 
    [53.2, 63.6], [54.9, 69.1], [53.5, 73.0], [52.3, 77.0], 
    [51.0, 79.5], [50.0, 82.6], [49.3, 86.5], [47.5, 85.5], 
    [46.8, 83.0], [45.6, 82.5], [44.8, 80.2], [43.1, 80.3], 
    [42.9, 78.5], [43.0, 76.9], [42.8, 75.0], [42.4, 71.5], 
    [42.0, 70.0], [41.5, 68.5], [44.0, 63.0], [45.0, 59.5], 
    [43.5, 55.5], [43.2, 51.5], [45.0, 50.8], [47.1, 51.9], 
    [48.5, 48.5], [50.5, 47.0]
  ];

  const kzBorderSvgPath = kzBorderPoints
    .map((pt, i) => {
      const [px, py] = projectKZ(pt[0], pt[1]);
      return `${i === 0 ? 'M' : 'L'} ${px},${py}`;
    })
    .join(' ') + ' Z';

  // Caspian Sea
  const caspianPath = `
    M 50,300 Q 120,320 160,370 Q 180,440 145,520 Q 110,570 50,570 L 50,300 Z
  `;

  // Lake Balkhash
  const balkhashPoints: [number, number][] = [
    [46.8, 74.5], [46.9, 76.0], [46.5, 77.5], [45.5, 79.2], 
    [45.2, 78.8], [46.0, 76.8], [46.2, 74.8]
  ];
  const balkhashPath = balkhashPoints
    .map((pt, i) => {
      const [px, py] = projectKZ(pt[0], pt[1]);
      return `${i === 0 ? 'M' : 'L'} ${px},${py}`;
    })
    .join(' ') + ' Z';

  return (
    <div className="flex-1 flex flex-col bg-stone-75 min-h-[calc(100vh-3.5rem)]">
      {/* Map Subheader Controls */}
      <div className="w-full bg-stone-50 border-b border-stone-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            {getT('mapHeaderPrefix', lang)}
          </span>
          <h1 className="text-xs font-semibold text-stone-900 truncate">
            {getT('mapTitle', lang)}
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sage-50 text-sage-800 border border-sage-200 font-semibold hidden md:inline">
            {getT('stationsOnline', lang)}
          </span>
        </div>

        {/* Scope Switcher: Бүкіл ел (17 облыс) / Дүниежүзі / Алматы */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-stone-200/80 p-0.5 rounded border border-stone-300 text-[10px] font-mono font-bold">
            <button
              type="button"
              onClick={() => {
                setMapScope('country');
                handleResetZoom();
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapScope === 'country'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {getT('mapScopeWholeCountry', lang)}
            </button>
            <button
              type="button"
              onClick={() => {
                setMapScope('world');
                handleResetZoom();
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapScope === 'world'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {getT('mapScopeWorld', lang)}
            </button>
            <button
              type="button"
              onClick={() => {
                setMapScope('almaty');
                handleResetZoom();
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapScope === 'almaty'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {getT('mapScopeAlmaty', lang)}
            </button>
          </div>

          {/* Magnitude Filter */}
          <div className="flex items-center bg-stone-150/70 p-0.5 rounded border border-stone-200 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setMagFilter(0)}
              className={`px-2 py-0.5 rounded ${magFilter === 0 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
            >
              {getT('filterAllM', lang)}
            </button>
            <button
              type="button"
              onClick={() => setMagFilter(6.0)}
              className={`px-2 py-0.5 rounded ${magFilter === 6.0 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
            >
              M &ge; 6.0
            </button>
            <button
              type="button"
              onClick={() => setMagFilter(7.5)}
              className={`px-2 py-0.5 rounded ${magFilter === 7.5 ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
            >
              {lang === 'KZ' ? 'M ≥ 7.5 (МЕГА)' : lang === 'EN' ? 'M ≥ 7.5 (MEGA)' : 'M ≥ 7.5 (МЕГА)'}
            </button>
          </div>

          {/* Layer Toggles */}
          {mapScope === 'country' && (
            <button
              type="button"
              onClick={() => setShowOblasts(!showOblasts)}
              className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                showOblasts ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
              }`}
            >
              {getT('filterOblasts', lang)}
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowHazardZones(!showHazardZones)}
            className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
              showHazardZones ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
            }`}
          >
            {getT('filterSoil', lang)}
          </button>

          <button
            type="button"
            onClick={() => setShowFaults(!showFaults)}
            className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
              showFaults ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
            }`}
          >
            {getT('filterFaults', lang)}
          </button>

          <button
            type="button"
            onClick={() => setShowStations(!showStations)}
            className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
              showStations ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
            }`}
          >
            {getT('filterStations', lang)}
          </button>

          {mapScope !== 'world' && (
            <button
              type="button"
              onClick={() => setShowCities(!showCities)}
              className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                showCities ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'
              }`}
            >
              {getT('filterCities', lang)}
            </button>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded p-0.5 text-[10px] font-mono">
            <button
              type="button"
              onClick={handleZoomIn}
              title={getT('zoomIn', lang)}
              className="w-6 h-6 flex items-center justify-center font-bold hover:bg-stone-100 rounded text-stone-800"
            >
              +
            </button>
            <span className="px-1 text-stone-500">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={handleZoomOut}
              title={getT('zoomOut', lang)}
              className="w-6 h-6 flex items-center justify-center font-bold hover:bg-stone-100 rounded text-stone-800"
            >
              &minus;
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title={getT('resetZoom', lang)}
              className="px-1.5 h-6 flex items-center justify-center hover:bg-stone-100 rounded text-stone-600"
            >
              {getT('resetZoom', lang)}
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas and Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] flex-1">
        {/* Vector Map Surface */}
        <div
          className={`relative bg-[#eae8e0] p-3 flex items-center justify-center overflow-hidden border-r border-stone-200 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#b8b4a7_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* SVG Map Container */}
          <div className="relative w-full h-[640px] max-w-5xl bg-[#fdfdfb] rounded-lg border border-stone-200/90 shadow-sm overflow-hidden p-1">
            <svg
              className="w-full h-full transition-transform duration-75"
              viewBox="0 0 1000 620"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                transformOrigin: 'center center',
              }}
            >
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0eee6" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="highRiskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.45" />
                </linearGradient>
                <linearGradient id="modRiskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              <rect width="1000" height="620" fill="url(#gridPattern)" />

              {mapScope === 'country' ? (
                /* ========================================================
                   KAZAKHSTAN: WHOLE COUNTRY (17 OBLASTS & REGIONS)
                   ======================================================== */
                <g>
                  {/* Neighboring Territory Labels */}
                  <g opacity="0.35" fontFamily="Space Grotesk" fontSize="11" fontWeight="bold" fill="#78716c" letterSpacing="0.2em">
                    <text x="480" y="35">РЕСЕЙ ФЕДЕРАЦИЯСЫ / РОССИЙСКАЯ ФЕДЕРАЦИЯ</text>
                    <text x="890" y="440">ҚЫТАЙ / CHINA</text>
                    <text x="490" y="585">ӨЗБЕКСТАН / UZBEKISTAN</text>
                    <text x="710" y="580">ҚЫРҒЫЗСТАН / KYRGYZSTAN</text>
                    <text x="210" y="585">ТҮРКІМЕНСТАН / TURKMENISTAN</text>
                  </g>

                  {/* Caspian Sea Body (West) */}
                  <path d={caspianPath} fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
                  <text x="75" y="440" fontFamily="Space Grotesk" fontSize="12" fill="#1e40af" fontWeight="600" opacity="0.75" transform="rotate(-30 75,440)">
                    {lang === 'KZ' ? 'КАСПИЙ ТЕҢІЗІ' : lang === 'EN' ? 'CASPIAN SEA' : 'КАСПИЙСКОЕ МОРЕ'}
                  </text>

                  {/* Aral Sea */}
                  <ellipse cx="343" cy="418" rx="20" ry="28" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.2" />
                  <text x="320" y="456" fontFamily="Space Grotesk" fontSize="9" fill="#0284c7" fontWeight="600">
                    {lang === 'KZ' ? 'АРАЛ' : lang === 'EN' ? 'ARAL' : 'АРАЛ'}
                  </text>

                  {/* Kazakhstan Main Border Contour */}
                  <path
                    d={kzBorderSvgPath}
                    fill="#fcfbfa"
                    stroke="#57534e"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  {/* Lake Balkhash */}
                  <path d={balkhashPath} fill="#bae6fd" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="670" y="375" fontFamily="Space Grotesk" fontSize="10" fill="#0369a1" fontWeight="600">
                    {lang === 'KZ' ? 'БАЛҚАШ КӨЛІ' : lang === 'EN' ? 'LAKE BALKHASH' : 'ОЗЕРО БАЛХАШ'}
                  </text>

                  {/* Lake Zaysan & Alakol */}
                  <ellipse cx="863" cy="318" rx="18" ry="10" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="850" y="306" fontFamily="Space Grotesk" fontSize="8" fill="#0369a1">Зайсан</text>
                  <ellipse cx="813" cy="378" rx="14" ry="9" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="801" y="394" fontFamily="Space Grotesk" fontSize="8" fill="#0369a1">Алакөл</text>

                  {/* 17 Oblasts Regional Badges & Interactivity */}
                  {showOblasts &&
                    KAZAKHSTAN_OBLASTS.map((obl) => {
                      const [ox, oy] = projectKZ(obl.coords[0], obl.coords[1]);
                      const isSelected = selectedOblast?.id === obl.id;
                      const isHighRisk = obl.seismicZoneMsk >= 8;

                      return (
                        <g
                          key={obl.id}
                          className="cursor-pointer group"
                          onClick={() => {
                            clearSelection();
                            setSelectedOblast(obl);
                          }}
                        >
                          <rect
                            x={ox - 48}
                            y={oy - 12}
                            width="96"
                            height="24"
                            rx="4"
                            fill={isSelected ? '#1c1917' : isHighRisk ? '#fef2f2' : '#f0fdf4'}
                            stroke={isSelected ? '#1c1917' : isHighRisk ? '#f87171' : '#86efac'}
                            strokeWidth={isSelected ? '2' : '1'}
                            opacity="0.95"
                          />
                          <circle
                            cx={ox - 38}
                            cy={oy}
                            r="3.5"
                            fill={obl.color}
                          />
                          <text
                            x={ox - 30}
                            y={oy + 3}
                            fontFamily="Space Grotesk"
                            fontSize="8"
                            fontWeight="bold"
                            fill={isSelected ? '#ffffff' : '#1c1917'}
                          >
                            {lang === 'KZ' ? obl.nameKz.replace(' облысы', '') : lang === 'EN' ? obl.nameEn.replace(' Region', '') : obl.name.replace(' область', '')}
                            <tspan dx="2" fontSize="7" fill={isSelected ? '#fbbf24' : '#78716c'}>
                              {obl.seismicZoneMsk}б
                            </tspan>
                          </text>
                        </g>
                      );
                    })}

                  {/* SP RK 2.03-2017 Seismic Hazard Zones */}
                  {showHazardZones && (
                    <g>
                      {/* Zone 9-10 MSK: Tien Shan, Zailiyskiy, Kemin, Chilik, Zhetysu Belt */}
                      <path
                        d="M 570,480 Q 640,460 710,450 T 820,440 L 800,530 L 560,520 Z"
                        fill="url(#highRiskGradient)"
                        stroke="#dc2626"
                        strokeWidth="1.2"
                        strokeDasharray="4,2"
                      />
                      <text x="630" y="475" fontFamily="JetBrains Mono" fontSize="9" fill="#991b1b" fontWeight="bold">
                        {lang === 'KZ' ? '9–10 БАЛЛ (АСА ЖОҒАРЫ ҚАУІП — ТЯНЬ-ШАНЬ / АЛМАТЫ)' : lang === 'EN' ? 'ZONE 9–10 MSK (CRITICAL SEISMIC BELT — TIAN SHAN / ALMATY)' : '9–10 БАЛЛОВ (КРИТИЧЕСКИЙ ПОЯС — ТЯНЬ-ШАНЬ / АЛМАТЫ)'}
                      </text>

                      {/* Zone 8 MSK */}
                      <path d="M 530,490 Q 580,470 610,460 L 610,485 L 540,515 Z" fill="url(#modRiskGradient)" stroke="#d97706" strokeWidth="1" />
                      <path d="M 730,370 Q 770,390 840,360 L 880,310 L 860,290 L 750,340 Z" fill="url(#modRiskGradient)" stroke="#d97706" strokeWidth="1" />
                      <text x="525" y="525" fontFamily="JetBrains Mono" fontSize="8" fill="#b45309" fontWeight="bold">8 БАЛЛ (ОҢТҮСТІК)</text>
                      <text x="760" y="340" fontFamily="JetBrains Mono" fontSize="8" fill="#b45309" fontWeight="bold">8 БАЛЛ (ШЫҒЫС/ЗАЙСАН)</text>

                      {/* Stable Platform */}
                      <text x="540" y="150" fontFamily="JetBrains Mono" fontSize="9" fill="#15803d" fontWeight="600" opacity="0.6">
                        {lang === 'KZ' ? '✓ ТҰРАҚТЫ ПЛАТФОРМАЛЫҚ АЙМАҚ (≤ 6 БАЛЛ)' : lang === 'EN' ? '✓ STABLE PLATFORM SHIELD (≤ 6 MSK)' : '✓ СТАБИЛЬНЫЙ ПЛАТФОРМЕННЫЙ ЩИТ (≤ 6 БАЛЛОВ)'}
                      </text>
                    </g>
                  )}

                  {/* Active Tectonic Fault Lines */}
                  {showFaults &&
                    TECTONIC_FAULTS.map((fault) => {
                      const pathStr = fault.coords
                        .map((c, i) => {
                          const [fx, fy] = projectKZ(c[0], c[1]);
                          return `${i === 0 ? 'M' : 'L'} ${fx},${fy}`;
                        })
                        .join(' ');

                      const isSelected = selectedFault?.id === fault.id;
                      const midPoint = projectKZ(fault.coords[Math.floor(fault.coords.length / 2)][0], fault.coords[Math.floor(fault.coords.length / 2)][1]);

                      return (
                        <g
                          key={fault.id}
                          className="cursor-pointer group"
                          onClick={() => {
                            clearSelection();
                            setSelectedFault(fault);
                          }}
                        >
                          <path
                            d={pathStr}
                            fill="none"
                            stroke={isSelected ? '#b91c1c' : '#c2410c'}
                            strokeWidth={isSelected ? '3.5' : '2'}
                            strokeDasharray="6,3"
                          />
                          <circle cx={midPoint[0]} cy={midPoint[1]} r="3" fill="#c2410c" />
                        </g>
                      );
                    })}

                  {/* Major Cities */}
                  {showCities &&
                    KAZAKHSTAN_CITIES.map((city) => {
                      const [cx, cy] = projectKZ(city.coords[0], city.coords[1]);
                      const isCapital = city.id === 'astana';
                      const isAlmaty = city.id === 'almaty';
                      const isSelected = selectedCity?.id === city.id;

                      return (
                        <g
                          key={city.id}
                          className="cursor-pointer group"
                          onClick={() => {
                            clearSelection();
                            setSelectedCity(city);
                          }}
                        >
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isCapital || isAlmaty ? 4.5 : 3}
                            fill={isSelected ? '#c2410c' : isCapital ? '#0284c7' : isAlmaty ? '#dc2626' : '#57534e'}
                            stroke="#ffffff"
                            strokeWidth="1.2"
                          />
                          <text
                            x={cx + 5}
                            y={cy - 5}
                            fontFamily="Space Grotesk"
                            fontSize="8.5"
                            fontWeight={isCapital || isAlmaty ? 'bold' : '500'}
                            fill={isCapital ? '#0369a1' : isAlmaty ? '#991b1b' : '#292524'}
                          >
                            {lang === 'KZ' ? city.nameKz : lang === 'EN' ? city.nameEn : city.name}
                          </text>
                        </g>
                      );
                    })}

                  {/* National Seismic Stations */}
                  {showStations &&
                    SEISMIC_STATIONS.map((st) => {
                      const [sx, sy] = projectKZ(st.coords[0], st.coords[1]);
                      const isSelected = selectedStation?.id === st.id;

                      return (
                        <g
                          key={st.id}
                          className="cursor-pointer group"
                          onClick={() => {
                            clearSelection();
                            setSelectedStation(st);
                          }}
                        >
                          <circle cx={sx} cy={sy} r="3.5" fill={isSelected ? '#c2410c' : '#15803d'} stroke="#ffffff" strokeWidth="1.2" />
                          <text x={sx + 5} y={sy + 3} fontFamily="JetBrains Mono" fontSize="7.5" fill="#166534" fontWeight="bold">
                            {st.code}
                          </text>
                        </g>
                      );
                    })}

                  {/* Historical Earthquakes */}
                  {filteredEvents.map((ev) => {
                    const [ex, ey] = projectKZ(ev.coordinates[0], ev.coordinates[1]);
                    const radius = Math.max(9, (ev.magnitude - 5.5) * 8);
                    const isSelected = selectedEvent?.id === ev.id;

                    return (
                      <g
                        key={ev.id}
                        className="cursor-pointer group"
                        onClick={() => {
                          clearSelection();
                          setSelectedEvent(ev);
                        }}
                      >
                        <circle
                          cx={ex}
                          cy={ey}
                          r={radius}
                          fill={isSelected ? '#dc2626' : '#ea580c'}
                          fillOpacity={isSelected ? '0.50' : '0.28'}
                          stroke={isSelected ? '#991b1b' : '#c2410c'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                        />
                        <circle cx={ex} cy={ey} r="3" fill="#991b1b" stroke="#ffffff" strokeWidth="1.5" />
                        <text
                          x={ex}
                          y={ey - radius - 3}
                          fontFamily="JetBrains Mono"
                          fontSize="8.5"
                          fontWeight="bold"
                          fill="#1c1917"
                          textAnchor="middle"
                        >
                          M{ev.magnitude} // {ev.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ) : mapScope === 'world' ? (
                /* ========================================================
                   WORLD MAP: ALL COUNTRIES & GLOBAL TECTONIC PLATES
                   ======================================================== */
                <g>
                  {/* Oceans background */}
                  <rect width="1000" height="620" fill="#f8fafc" />

                  {/* Continents Outlines (Equirectangular) */}
                  {/* Eurasia Continent */}
                  <path
                    d="M 450,110 Q 560,90 700,100 T 910,130 L 920,240 Q 860,260 810,310 L 760,340 L 710,330 L 640,380 L 590,320 L 520,340 L 460,280 L 440,210 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  {/* Africa */}
                  <path
                    d="M 470,290 Q 530,300 550,360 L 550,440 L 510,510 L 460,420 L 440,330 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  {/* North America */}
                  <path
                    d="M 120,110 Q 220,100 290,130 L 280,240 L 220,310 L 190,350 L 150,290 L 90,210 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  {/* South America */}
                  <path
                    d="M 230,350 Q 290,370 310,430 L 280,530 L 240,560 L 220,440 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  {/* Australia */}
                  <path
                    d="M 770,420 Q 850,410 880,450 L 870,510 L 800,520 L 760,470 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />

                  {/* Kazakhstan highlight on World Map */}
                  <g>
                    <rect x="580" y="180" width="80" height="40" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" opacity="0.8" />
                    <text x="620" y="204" fontFamily="Space Grotesk" fontSize="10" fill="#854d0e" fontWeight="bold" textAnchor="middle">
                      🇰🇿 ҚАЗАҚСТАН
                    </text>
                  </g>

                  {/* Continent Labels */}
                  <g fontFamily="Space Grotesk" fontSize="11" fill="#94a3b8" fontWeight="600" opacity="0.7">
                    <text x="680" y="160">EURASIA / ЕУРАЗИЯ</text>
                    <text x="180" y="180">NORTH AMERICA</text>
                    <text x="250" y="440">SOUTH AMERICA</text>
                    <text x="480" y="410">AFRICA</text>
                    <text x="810" y="470">AUSTRALIA</text>
                  </g>

                  {/* Pacific Ring of Fire (Subduction Rim) */}
                  {showFaults && (
                    <g>
                      <path
                        d="M 90,210 Q 140,320 220,440 T 250,560"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="3"
                        strokeDasharray="6,3"
                        opacity="0.75"
                      />
                      <path
                        d="M 910,140 Q 860,250 820,340 T 870,510"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="3"
                        strokeDasharray="6,3"
                        opacity="0.75"
                      />
                      <text x="850" y="270" fontFamily="JetBrains Mono" fontSize="9" fill="#dc2626" fontWeight="bold" transform="rotate(75 850,270)">
                        {lang === 'KZ' ? 'ТЫНЫҚ МҰХИТ ОТТЫ ШЕҢБЕРІ' : lang === 'EN' ? 'PACIFIC RING OF FIRE' : 'ТИХООКЕАНСКОЕ ОГНЕННОЕ КОЛЬЦО'}
                      </text>
                    </g>
                  )}

                  {/* Global Mega-Earthquakes */}
                  {filteredGlobalEvents.map((gev) => {
                    const [gx, gy] = projectWorld(gev.coords[0], gev.coords[1]);
                    const isSelected = selectedGlobalEvent?.id === gev.id;
                    const r = Math.max(9, (gev.magnitude - 7) * 7);

                    return (
                      <g
                        key={gev.id}
                        className="cursor-pointer group"
                        onClick={() => {
                          clearSelection();
                          setSelectedGlobalEvent(gev);
                        }}
                      >
                        <circle
                          cx={gx}
                          cy={gy}
                          r={r}
                          fill={isSelected ? '#dc2626' : '#ea580c'}
                          fillOpacity={isSelected ? '0.6' : '0.35'}
                          stroke={isSelected ? '#991b1b' : '#c2410c'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                        />
                        <circle cx={gx} cy={gy} r="3.5" fill="#991b1b" stroke="#ffffff" strokeWidth="1.5" />
                        <text
                          x={gx}
                          y={gy - r - 4}
                          fontFamily="JetBrains Mono"
                          fontSize="9"
                          fontWeight="bold"
                          fill="#0f172a"
                          textAnchor="middle"
                        >
                          M{gev.magnitude} // {lang === 'KZ' ? gev.countryKz : lang === 'EN' ? gev.countryEn : gev.country}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ) : (
                /* ========================================================
                   ALMATY SECTOR URBAN MICROZONATION MAP
                   ======================================================== */
                <g>
                  <path
                    d="M 50,420 Q 200,380 400,430 T 950,400 L 1000,620 L 0,620 Z"
                    fill="#f2f0e9"
                    stroke="#e5e2da"
                    strokeWidth="1.5"
                  />
                  <text x="360" y="550" fontFamily="Space Grotesk" fontSize="14" fill="#a8a29e" fontWeight="600">
                    {lang === 'KZ' ? 'ІЛЕ АЛАТАУЫ ЖОТАСЫ (ТЯНЬ-ШАНЬ)' : lang === 'EN' ? 'ZAILIYSKIY ALATAU RANGE' : 'ХРЕБЕТ ЗАИЛИЙСКИЙ АЛАТАУ'}
                  </text>

                  {/* Soil zones */}
                  {showHazardZones && (
                    <g opacity="0.35">
                      <rect x="200" y="160" width="580" height="200" rx="40" fill="#fde68a" stroke="#d97706" />
                      <rect x="260" y="210" width="460" height="130" rx="20" fill="#bbf7d0" stroke="#16a34a" />
                      <text x="250" y="190" fontFamily="JetBrains Mono" fontSize="11" fill="#b45309" fontWeight="bold">
                        {lang === 'KZ' ? 'II АЙМАҚ: АЛМАТЫ ҚҰМДАҚТАРЫ (9 БАЛЛ)' : lang === 'EN' ? 'ZONE II: ALMATY LOAM (9 MSK)' : 'ЗОНА II: СУГЛИНКИ АЛМАТЫ (9 БАЛЛОВ)'}
                      </text>
                    </g>
                  )}

                  {/* Almaty outline */}
                  <polygon
                    points="260,170 660,140 780,280 580,410 280,360"
                    fill="#fbfbfa"
                    stroke="#78716c"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  <text x="470" y="260" fontFamily="Space Grotesk" fontSize="20" fill="#1c1917" fontWeight="bold">
                    {lang === 'KZ' ? 'АЛМАТЫ ҚАЛАСЫ' : lang === 'EN' ? 'ALMATY CITY' : 'ГОРОД АЛМАТЫ'}
                  </text>

                  {/* Faults */}
                  {showFaults && (
                    <g>
                      <path d="M 100,390 Q 350,400 600,380 T 960,350" fill="none" stroke="#c2410c" strokeWidth="3" strokeDasharray="6,3" />
                      <text x="620" y="370" fontFamily="JetBrains Mono" fontSize="10" fill="#c2410c" fontWeight="bold">
                        Іле терең жарылымы (2.4 мм/ж)
                      </text>
                    </g>
                  )}

                  {/* Stations */}
                  {showStations &&
                    SEISMIC_STATIONS.filter((s) => s.code.startsWith('ALT') || s.code === 'MED').map((st, i) => {
                      const sx = 300 + (i % 4) * 125;
                      const sy = 210 + Math.floor(i / 4) * 65;
                      const isSelected = selectedStation?.id === st.id;

                      return (
                        <g
                          key={st.id}
                          className="cursor-pointer"
                          onClick={() => {
                            clearSelection();
                            setSelectedStation(st);
                          }}
                        >
                          <circle cx={sx} cy={sy} r="5" fill={isSelected ? '#c2410c' : '#15803d'} stroke="#ffffff" strokeWidth="1.5" />
                          <text x={sx + 8} y={sy + 4} fontFamily="JetBrains Mono" fontSize="9" fill="#44403c" fontWeight="bold">
                            {st.code}
                          </text>
                        </g>
                      );
                    })}
                </g>
              )}
            </svg>

            {/* Map Legend Dock */}
            <div className="absolute bottom-3 left-3 p-2 rounded bg-white/95 backdrop-blur-sm border border-stone-200 text-[10px] font-mono flex flex-wrap gap-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>{lang === 'KZ' ? 'ОШАҚ (M≥6.0)' : lang === 'EN' ? 'EPICENTER' : 'ЭПИЦЕНТР'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>{lang === 'KZ' ? 'СЕЙСМОСТАНЦИЯ' : lang === 'EN' ? 'STATION' : 'СТАНЦИЯ'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-orange-600"></span>
                <span>{getT('activeFault', lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-500/40 border border-amber-600"></span>
                <span>{lang === 'KZ' ? '8–10 БАЛЛ АЙМАҚ' : lang === 'EN' ? '8–10 MSK ZONE' : 'ЗОНА 8–10 БАЛЛОВ'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Detail Inspector Drawer */}
        <aside className="bg-stone-50 p-5 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-6.5rem)] border-l border-stone-200">
          {selectedOblast ? (
            /* Oblast Seismic Dossier */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-terracotta-700 font-bold">
                  {lang === 'KZ' ? 'ОБЛЫСТЫҢ СЕЙСМИКАЛЫҚ ТӨЛҚҰЖАТЫ' : lang === 'EN' ? 'REGION SEISMIC DOSSIER' : 'СЕЙСМИЧЕСКИЙ ПАСПОРТ ОБЛАСТИ'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                  {selectedOblast.seismicZoneMsk} {lang === 'EN' ? 'MSK' : 'БАЛЛ'}
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-stone-900">
                  {lang === 'KZ' ? selectedOblast.nameKz : lang === 'EN' ? selectedOblast.nameEn : selectedOblast.name}
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {lang === 'KZ' ? 'Орталығы' : lang === 'EN' ? 'Center' : 'Центр'}: {lang === 'KZ' ? selectedOblast.centerKz : lang === 'EN' ? selectedOblast.centerEn : selectedOblast.center}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'ХАЛЫҚ САНЫ' : lang === 'EN' ? 'POPULATION' : 'НАСЕЛЕНИЕ'}</span>
                  <strong className="text-stone-900">{selectedOblast.population}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'ЖЕР КӨЛЕМІ' : lang === 'EN' ? 'AREA' : 'ПЛОЩАДЬ'}</span>
                  <strong className="text-stone-900">{selectedOblast.areaKm2}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'ЖОБАЛЫҚ PGA' : lang === 'EN' ? 'DESIGN PGA' : 'РАСЧЕТНОЕ PGA'}</span>
                  <strong className="text-terracotta-700">{selectedOblast.designPga} g</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'ҚАУІП ДӘРЕЖЕСІ' : lang === 'EN' ? 'RISK LEVEL' : 'УРОВЕНЬ РИСКА'}</span>
                  <strong className="text-stone-900 text-[11px]">
                    {lang === 'KZ' ? selectedOblast.riskCategoryKz : lang === 'EN' ? selectedOblast.riskCategoryEn : selectedOblast.riskCategoryRu}
                  </strong>
                </div>
              </div>

              <div className="p-3 rounded bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">
                  {lang === 'KZ' ? 'Негізгі тектоникалық қауіптер:' : lang === 'EN' ? 'Key tectonic hazards:' : 'Главные тектонические угрозы:'}
                </strong>
                {lang === 'KZ' ? selectedOblast.keyHazardsKz : lang === 'EN' ? selectedOblast.keyHazardsEn : selectedOblast.keyHazardsRu}
              </div>

              <div className="p-3 rounded bg-stone-100 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">
                  {lang === 'KZ' ? 'Құрылыс нормалары (ҚР ЕЖ 2.03-2017):' : lang === 'EN' ? 'Building code regulations:' : 'Строительные регламенты (СП РК):'}
                </strong>
                {lang === 'KZ' ? selectedOblast.buildingReqsKz : lang === 'EN' ? selectedOblast.buildingReqsEn : selectedOblast.buildingReqsRu}
              </div>
            </div>
          ) : selectedGlobalEvent ? (
            /* Global Mega-Earthquake Dossier */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-red-700 font-bold">
                  {lang === 'KZ' ? 'ДҮНИЕЖҮЗІЛІК МЕГА-АПАТ' : lang === 'EN' ? 'GLOBAL MEGAQUAKE' : 'МИРОВАЯ МЕГА-КАТАСТРОФА'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-red-800 border border-red-200">
                  M {selectedGlobalEvent.magnitude}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-stone-900 leading-snug">
                  {lang === 'KZ' ? selectedGlobalEvent.nameKz : lang === 'EN' ? selectedGlobalEvent.nameEn : selectedGlobalEvent.name}
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {selectedGlobalEvent.year} // {lang === 'KZ' ? selectedGlobalEvent.countryKz : lang === 'EN' ? selectedGlobalEvent.countryEn : selectedGlobalEvent.country}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'МАГНИТУДА' : lang === 'EN' ? 'MAGNITUDE' : 'МАГНИТУДА'}</span>
                  <strong className="text-red-700 text-base">M {selectedGlobalEvent.magnitude}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'АДАМ ҚҰРБАНДАРЫ' : lang === 'EN' ? 'FATALITIES' : 'ЖЕРТВЫ'}</span>
                  <strong className="text-stone-900 text-xs">
                    {lang === 'KZ' ? selectedGlobalEvent.deathsKz : lang === 'EN' ? selectedGlobalEvent.deathsEn : selectedGlobalEvent.deaths}
                  </strong>
                </div>
              </div>

              <div className="p-3 rounded bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">
                  {lang === 'KZ' ? 'Тектоникалық плита жапсары:' : lang === 'EN' ? 'Tectonic plate boundary:' : 'Тектоническая граница плит:'}
                </strong>
                {lang === 'KZ' ? selectedGlobalEvent.plateBoundaryKz : lang === 'EN' ? selectedGlobalEvent.plateBoundaryEn : selectedGlobalEvent.plateBoundary}
              </div>

              <div className="p-3 rounded bg-stone-100 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">
                  {lang === 'KZ' ? 'Апаттың сипаттамасы мен сабақтары:' : lang === 'EN' ? 'Event impact & lessons:' : 'Масштаб катастрофы и выводы:'}
                </strong>
                {lang === 'KZ' ? selectedGlobalEvent.descriptionKz : lang === 'EN' ? selectedGlobalEvent.descriptionEn : selectedGlobalEvent.descriptionRu}
              </div>
            </div>
          ) : selectedEvent ? (
            /* National Earthquake Event */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-terracotta-700 font-bold">
                  {getT('eventCard', lang)}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                  {getT('magnitudeLabel', lang)} {selectedEvent.magnitude}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-stone-900 leading-snug">
                  {lang === 'KZ' && selectedEvent.nameKz ? selectedEvent.nameKz : lang === 'EN' && selectedEvent.nameEn ? selectedEvent.nameEn : selectedEvent.name}
                </h2>
                <span className="text-xs text-stone-500 font-mono">{selectedEvent.date}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('intensity', lang)}</span>
                  <strong className="text-stone-900">{selectedEvent.intensityMsk} {getT('pointsUnit', lang)}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('depthLabel', lang)}</span>
                  <strong className="text-stone-900">{selectedEvent.depthKm} {lang === 'EN' ? 'km' : 'км'}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('distanceLabel', lang)}</span>
                  <strong className="text-stone-900">{selectedEvent.distanceToAlmatyKm} {lang === 'EN' ? 'km' : 'км'}</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('pgaObservedLabel', lang)}</span>
                  <strong className="text-terracotta-700">{selectedEvent.pgaObserved} g</strong>
                </div>
              </div>

              <div className="p-3 rounded bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">{getT('epicenterImpact', lang)}</strong>
                {selectedEvent.description}
              </div>

              <div className="p-3 rounded bg-stone-100 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900 block mb-1">{getT('structuralImpactLabel', lang)}</strong>
                {selectedEvent.structuralImpact}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  {getT('engineeringLessons', lang)}
                </span>
                <ul className="space-y-1 text-xs text-stone-700">
                  {selectedEvent.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sage-700 font-bold">•</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : selectedCity ? (
            /* City Profile */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-sky-800 font-bold">
                  {lang === 'KZ' ? 'ҚАЛАНЫҢ СЕЙСМИКАЛЫҚ ПАСПОРТЫ' : lang === 'EN' ? 'CITY SEISMIC PROFILE' : 'СЕЙСМИЧЕСКИЙ ПАСПОРТ ГОРОДА'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                  СП РК 2.03-2017
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-stone-900">
                  {lang === 'KZ' ? selectedCity.nameKz : lang === 'EN' ? selectedCity.nameEn : selectedCity.name}
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {selectedCity.coords[0]}°N, {selectedCity.coords[1]}°E // {lang === 'KZ' ? 'Халық саны' : lang === 'EN' ? 'Population' : 'Население'}: {selectedCity.population}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'СЕЙСМИКАЛЫҒЫ' : lang === 'EN' ? 'SEISMICITY' : 'СЕЙСМИЧНОСТЬ'}</span>
                  <strong className={`text-base ${selectedCity.seismicityMsk >= 8 ? 'text-red-700' : 'text-stone-900'}`}>
                    {selectedCity.seismicityMsk} {lang === 'EN' ? 'MSK' : 'балл'}
                  </strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{lang === 'KZ' ? 'ЖОБАЛЫҚ PGA' : lang === 'EN' ? 'DESIGN PGA' : 'РАСЧЕТНОЕ PGA'}</span>
                  <strong className="text-base text-stone-900">{selectedCity.designPga} g</strong>
                </div>
              </div>

              <div className="p-3 rounded bg-white border border-stone-200 text-xs">
                <span className="text-[10px] font-mono text-stone-400 block mb-1">
                  {lang === 'KZ' ? 'ТОПЫРАҚ ЖАҒДАЙЫ' : lang === 'EN' ? 'SOIL PROFILE' : 'ГРУНТОВЫЕ УСЛОВИЯ'}
                </span>
                <strong className="text-stone-900 block">{selectedCity.soilZone}</strong>
              </div>
            </div>
          ) : selectedStation ? (
            /* Station Telemetry */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-sage-800 font-bold">
                  {getT('stationTelemetry', lang)}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sage-50 text-sage-800 border border-sage-200">
                  ONLINE // {selectedStation.code}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-stone-900">{selectedStation.name}</h2>
                <span className="text-xs text-stone-500 font-mono">
                  {selectedStation.coords[0]}°N, {selectedStation.coords[1]}°E
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('currentPga', lang)}</span>
                  <strong className="text-stone-900">{selectedStation.pgaNow} g</strong>
                </div>
                <div className="p-2.5 rounded bg-white border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('dominantFreq', lang)}</span>
                  <strong className="text-stone-900">{selectedStation.dominantFreqHz} {lang === 'EN' ? 'Hz' : 'Гц'}</strong>
                </div>
              </div>
            </div>
          ) : selectedFault ? (
            /* Fault Info */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-orange-800 font-bold">
                  {lang === 'KZ' ? 'ТЕКТОНИКАЛЫҚ ЖАРЫЛЫМ' : lang === 'EN' ? 'TECTONIC FAULT' : 'ТЕКТОНИЧЕСКИЙ РАЗЛОМ'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200">
                  {selectedFault.riskLevel}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-stone-900">
                  {lang === 'KZ' ? selectedFault.nameKz : lang === 'EN' ? selectedFault.nameEn : selectedFault.name}
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  {lang === 'KZ' ? 'Жылдық тектоникалық жылжу' : lang === 'EN' ? 'Annual slip rate' : 'Годовая скорость смещения'}: {selectedFault.annualSlipMm} мм/жыл
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-stone-500 py-10">
              {getT('selectPrompt', lang)}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
