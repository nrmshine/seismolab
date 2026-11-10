import React, { useState } from 'react';
import { Language } from '../../types.js';
import { INITIAL_GO_BAG_ITEMS, GoBagItem, ALMATY_ASSEMBLY_POINTS } from '../../data/emergencyData.js';
import { soundFx } from '../../utils/audioSynthesizer.js';
import { getT } from '../../data/translations.js';

interface Emergency112ViewProps {
  lang: Language;
}

export const Emergency112View: React.FC<Emergency112ViewProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'go-bag' | 'triangle' | 'assembly' | 'sos'>('go-bag');
  const [goBagItems, setGoBagItems] = useState<GoBagItem[]>(INITIAL_GO_BAG_ITEMS);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [isSirenPlaying, setIsSirenPlaying] = useState<boolean>(false);
  const [strobeActive, setStrobeActive] = useState<boolean>(false);

  // Toggle checklist item
  const toggleItem = (id: string) => {
    setGoBagItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Calculations for Go-Bag
  const totalItems = goBagItems.length;
  const packedItems = goBagItems.filter((i) => i.checked).length;
  const readinessPercent = Math.round((packedItems / totalItems) * 100);
  const totalWeightKg = Number(
    goBagItems
      .filter((i) => i.checked)
      .reduce((sum, item) => sum + item.weightKg, 0)
      .toFixed(1)
  );

  // Filter assembly points
  const filteredPoints =
    selectedDistrict === 'all'
      ? ALMATY_ASSEMBLY_POINTS
      : ALMATY_ASSEMBLY_POINTS.filter((p) => p.district.includes(selectedDistrict));

  const handleTriggerSiren = () => {
    setIsSirenPlaying(true);
    setStrobeActive(true);
    soundFx.playSiren();
    setTimeout(() => {
      setIsSirenPlaying(false);
      setStrobeActive(false);
    }, 4000);
  };

  return (
    <div className={`flex-1 flex flex-col bg-stone-75 min-h-[calc(100vh-3.5rem)] transition-colors ${strobeActive ? 'bg-red-100' : ''}`}>
      {/* Subheader */}
      <div className="w-full bg-stone-50 border-b border-stone-200/80 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta-700 font-bold">
            {getT('emergencyPrefix', lang)}
          </span>
          <h1 className="text-xs font-semibold text-stone-900">
            {getT('emergencyTitle', lang)}
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-stone-150/70 p-0.5 rounded border border-stone-200 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('go-bag')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'go-bag' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabGoBag', lang)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('triangle')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'triangle' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabTriangle', lang)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assembly')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'assembly' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabAssembly', lang)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sos')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'sos' ? 'bg-terracotta-700 text-white font-semibold' : 'text-terracotta-700'}`}
          >
            {getT('tabSos', lang)}
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full flex-1">
        {/* Tab 1: Interactive Emergency Go-Bag */}
        {activeTab === 'go-bag' && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            {/* Left Readiness Card */}
            <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
                  {getT('goBagReadiness', lang)}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${readinessPercent >= 80 ? 'bg-sage-50 text-sage-800 border-sage-200' : 'bg-terracotta-50 text-terracotta-800 border-terracotta-200'}`}>
                  {readinessPercent}% {getT('readyBadge', lang)}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl font-bold text-stone-900">{packedItems}</span>
                <span className="text-sm font-mono text-stone-400">
                  {getT('fromTotal', lang)} {totalItems} {getT('ofItemsCount', lang)}
                </span>
              </div>

              <div className="w-full h-2 bg-stone-200 rounded overflow-hidden">
                <div
                  className="h-full bg-stone-900 transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-150 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">{getT('totalWeight', lang)}</span>
                  <strong className="text-stone-900">{totalWeightKg} {lang === 'EN' ? 'kg' : 'кг'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">{getT('autonomy', lang)}</span>
                  <strong className="text-sage-800">{getT('hours72', lang)}</strong>
                </div>
              </div>

              <div className="p-3 rounded bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed">
                {getT('goBagAdvice', lang)}
              </div>

              <button
                type="button"
                onClick={() => setGoBagItems((prev) => prev.map((item) => ({ ...item, checked: true })))}
                className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors"
              >
                {getT('markAllPacked', lang)}
              </button>
            </div>

            {/* Right Checklist */}
            <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col gap-3">
              <span className="text-xs font-bold font-mono uppercase text-stone-700">
                {lang === 'KZ' ? 'ҚР ТЖМ МІНДЕТТІ ТІЗІМІ (ИНТЕРАКТИВТІ ЧЕКЛИСТ)' : lang === 'EN' ? 'OFFICIAL CIVIL DEFENSE CHECKLIST' : 'ОБЯЗАТЕЛЬНЫЙ СПИСОК МЧС РК (ИНТЕРАКТИВНЫЙ ЧЕКЛИСТ)'}
              </span>

              <div className="flex flex-col divide-y divide-stone-150">
                {goBagItems.map((item) => {
                  const itemName = lang === 'KZ' && item.nameKz ? item.nameKz : lang === 'EN' && item.nameEn ? item.nameEn : item.name;
                  return (
                    <label
                      key={item.id}
                      className="flex items-start justify-between py-3 cursor-pointer hover:bg-stone-50 px-2 rounded transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                          className="mt-0.5 w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                        />
                        <div className="flex flex-col">
                          <span className={`text-xs font-semibold ${item.checked ? 'text-stone-900' : 'text-stone-700'}`}>
                            {itemName}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono mt-0.5">{item.notes}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-stone-500">{item.weightKg} {lang === 'EN' ? 'kg' : 'кг'}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                            item.importance === 'critical'
                              ? 'bg-terracotta-100 text-terracotta-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {item.importance === 'critical'
                            ? getT('importanceCritical', lang)
                            : getT('importanceImportant', lang)}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Triangle of Life Interactive Visualizer */}
        {activeTab === 'triangle' && (
          <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-terracotta-700 font-bold">
                {lang === 'KZ' ? 'ПӘТЕРДЕ ҚАУІПСІЗ БАС СЫҒАЛАУ ЕРЕЖЕСІ' : lang === 'EN' ? 'SAFE APARTMENT SHELTER RULE' : 'ПРАВИЛО БЕЗОПАСНОГО УКРЫТИЯ В КВАРТИРЕ'}
              </span>
              <h2 className="text-base font-bold text-stone-900 mt-0.5">
                {lang === 'KZ' ? '«Өмір үшбұрышы» және көпқабатты үйлердегі қауіпсіз аймақтар' : lang === 'EN' ? '“Triangle of Life” & Structural Safe Havens in High-Rises' : '«Треугольник Жизни» и безопасные зоны в многоэтажных домах'}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'KZ' ? 'Төбе плитасы құлаған кезде ол берік ірі көлемді заттарға (диван, шойын ванна, негізгі қабырға) тіреліп, қасында бос үшбұрышты қауіпсіз кеңістік құрайды.' : lang === 'EN' ? 'When overhead ceiling slabs collapse, they impact rigid massive objects (sofa, heavy cast-iron tub, shear wall), leaving a void shelter triangle next to them.' : 'Когда падает потолочная плита, она ложится на прочные крупногабаритные предметы (диван, чугунная ванна, несущая стена), образуя рядом пустое треугольное пространство безопасности.'}
              </p>
            </div>

            {/* Interactive Schematic Diagram */}
            <div className="w-full aspect-[2/1] max-h-96 bg-stone-50 rounded-lg border border-stone-200 relative p-4 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 600 300">
                {/* Room walls */}
                <rect x="50" y="30" width="500" height="240" fill="#faf9f5" stroke="#1c1917" strokeWidth="2.5" />
                {/* Bearing core wall (Green safe zone) */}
                <line x1="50" y1="30" x2="50" y2="270" stroke="#15803d" strokeWidth="10" />
                <text x="65" y="150" fontFamily="JetBrains Mono" fontSize="10" fill="#15803d" transform="rotate(-90 65,150)" fontWeight="bold">
                  {lang === 'KZ' ? 'НЕГІЗГІ КҮРДЕЛІ ҚАБЫРҒА (ҚАУІПСІЗ)' : lang === 'EN' ? 'LOAD-BEARING CORE WALL (SAFE)' : 'НЕСУЩАЯ КАПИТАЛЬНАЯ СТЕНА (БЕЗОПАСНО)'}
                </text>

                {/* Sturdy Couch / Bed */}
                <rect x="80" y="180" width="120" height="70" rx="4" fill="#eeedf7" stroke="#57534e" strokeWidth="1.5" />
                <text x="140" y="220" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#292524" textAnchor="middle">
                  {lang === 'KZ' ? 'Ауыр диван' : lang === 'EN' ? 'Sturdy sofa' : 'Массивный диван'}
                </text>

                {/* Triangle of life zone next to couch */}
                <polygon points="205,250 205,190 255,250" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5" opacity="0.8" />
                <text x="215" y="235" fontFamily="JetBrains Mono" fontSize="9" fill="#15803d" fontWeight="bold">
                  {lang === 'KZ' ? 'ӨМІР ҮШБҰРЫШЫ ✓' : lang === 'EN' ? 'TRIANGLE OF LIFE ✓' : 'ТРЕУГОЛЬНИК ЖИЗНИ ✓'}
                </text>

                {/* Dangerous Window (Red zone) */}
                <rect x="240" y="28" width="140" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
                <text x="310" y="48" fontFamily="JetBrains Mono" fontSize="9" fill="#dc2626" textAnchor="middle" fontWeight="bold">
                  {lang === 'KZ' ? 'ТЕРЕЗЕЛЕР (ӘЙНЕК ҚАУПІ) ✕' : lang === 'EN' ? 'WINDOWS (SHATTER HAZARD) ✕' : 'ОКНА И СТЕКЛОПАКЕТЫ (ОПАСНОСТЬ) ✕'}
                </text>

                {/* Dangerous Elevator / Stairwell panic area */}
                <rect x="420" y="60" width="110" height="80" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                <text x="475" y="100" fontFamily="JetBrains Mono" fontSize="9" fill="#b91c1c" textAnchor="middle">
                  {lang === 'KZ' ? 'ЛИФТ ШАХТАСЫ' : lang === 'EN' ? 'ELEVATOR SHAFT' : 'ЛИФТОВАЯ ШАХТА'}
                </text>
                <text x="475" y="115" fontFamily="JetBrains Mono" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">
                  {lang === 'KZ' ? 'ПАЙДАЛАНУҒА БОЛМАЙДЫ! ✕' : lang === 'EN' ? 'DO NOT USE! ✕' : 'НЕ ПОЛЬЗОВАТЬСЯ! ✕'}
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded bg-sage-50 border border-sage-200">
                <span className="font-bold text-sage-900 block mb-1">
                  {lang === 'KZ' ? 'ҚАЙДА ЖАСЫРЫНУ КЕРЕК (ҚАУІПСІЗ ОРЫНДАР):' : lang === 'EN' ? 'SAFE SHELTER ZONES:' : 'ГДЕ УКРЫТЬСЯ (БЕЗОПАСНЫЕ ЗОНЫ):'}
                </span>
                <ul className="space-y-1 text-sage-800">
                  <li>• {lang === 'KZ' ? 'Негізгі темірбетон қабырғалардың ішкі бұрыштары' : lang === 'EN' ? 'Interior corners of structural RC walls' : 'Внутренние углы капитальных железобетонных стен'}</li>
                  <li>• {lang === 'KZ' ? 'Берік төмен жиһаздың қасында эмбрион кейпінде жату' : lang === 'EN' ? 'Beside low sturdy furniture (sofa, heavy bed) in fetal position' : 'Рядом с прочной низкой мебелью (диван, массивная кровать) в позе эмбриона'}</li>
                  <li>• {lang === 'KZ' ? 'Негізгі қабырғалардың ойықтары (ауыр есіктер болмаған жағдайда)' : lang === 'EN' ? 'Load-bearing wall doorframes (free of swinging heavy doors)' : 'Проемы несущих стен (только если в них нет тяжелых дверей)'}</li>
                </ul>
              </div>

              <div className="p-4 rounded bg-terracotta-50 border border-terracotta-200">
                <span className="font-bold text-terracotta-900 block mb-1">
                  {lang === 'KZ' ? 'ҚАЙДА БОЛУҒА МҮЛДЕМ БОЛМАЙДЫ:' : lang === 'EN' ? 'EXTREMELY DANGEROUS ZONES:' : 'ГДЕ НЕЛЬЗЯ НАХОДИТЬСЯ:'}
                </span>
                <ul className="space-y-1 text-terracotta-800">
                  <li>• {lang === 'KZ' ? 'Терезелердің, әйнек қалқалардың және айналардың жанында' : lang === 'EN' ? 'Near exterior glass, facades, and mirrors' : 'Возле окон, стеклянных перегородок и зеркал'}</li>
                  <li>• {lang === 'KZ' ? 'Жер сілкінісі кезінде баспалдақ алаңдарында' : lang === 'EN' ? 'On stairwells during active shaking' : 'На лестничных клетках во время подземных толчков'}</li>
                  <li>• {lang === 'KZ' ? 'Лифттерде (тоқ өшуі және кептеліп қалу қаупі жоғары)' : lang === 'EN' ? 'Inside elevators (high risk of power loss & trapped cab)' : 'В лифтах (высокий риск обесточивания и заклинивания)'}</li>
                  <li>• {lang === 'KZ' ? 'Балкондар мен лоджияларда (ең бірінші құлайтын аймақтар)' : lang === 'EN' ? 'On balconies and cantilevers (first points of catastrophic detachment)' : 'На балконах и лоджиях (первые зоны обрушения)'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Almaty Evacuation Assembly Points */}
        {activeTab === 'assembly' && (
          <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
                  {lang === 'KZ' ? 'ХАЛЫҚТЫ ҚАБЫЛДАУ ОРЫНДАРЫ' : lang === 'EN' ? 'CIVIL RECEPTION POINTS' : 'ПУНКТЫ ПРИЕМА НАСЕЛЕНИЯ'}
                </span>
                <h2 className="text-base font-bold text-stone-900 mt-0.5">
                  {lang === 'KZ' ? 'Алматы қаласы бойынша зардап шеккендерді жинау эвакопункттері' : lang === 'EN' ? 'Emergency Evacuation Assembly Points across Almaty' : 'Эвакуационные пункты сбора пострадавших в г. Алматы'}
                </h2>
              </div>

              {/* District Filter */}
              <div className="flex items-center gap-1 font-mono text-xs">
                <span className="text-stone-500">{lang === 'KZ' ? 'Аудан:' : lang === 'EN' ? 'District:' : 'Район:'}</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="p-1 rounded bg-stone-50 border border-stone-200 text-xs font-semibold"
                >
                  <option value="all">{getT('allDistricts', lang)}</option>
                  <option value="Бостандык">{lang === 'KZ' ? 'Бостандық ауданы' : lang === 'EN' ? 'Bostandyk' : 'Бостандыкский'}</option>
                  <option value="Алмалы">{lang === 'KZ' ? 'Алмалы ауданы' : lang === 'EN' ? 'Almaly' : 'Алмалинский'}</option>
                  <option value="Ауэзов">{lang === 'KZ' ? 'Әуезов ауданы' : lang === 'EN' ? 'Auezov' : 'Ауэзовский'}</option>
                  <option value="Турксиб">{lang === 'KZ' ? 'Түрксіб ауданы' : lang === 'EN' ? 'Turksib' : 'Турксибский'}</option>
                  <option value="Наурызбай">{lang === 'KZ' ? 'Наурызбай ауданы' : lang === 'EN' ? 'Nauryzbay' : 'Наурызбайский'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPoints.map((point) => (
                <div key={point.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-terracotta-700 font-bold">
                        {lang === 'KZ' && point.districtKz ? point.districtKz : lang === 'EN' && point.districtEn ? point.districtEn : point.district}
                      </span>
                      <h3 className="text-xs font-bold text-stone-900 mt-0.5">{point.name}</h3>
                      <span className="text-[11px] font-mono text-stone-500">{point.address}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-stone-300 font-bold">
                      {point.capacityPeople.toLocaleString()} {getT('placesCapacity', lang)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-stone-200 text-[10px] font-mono text-stone-600">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-sage-700">medical_services</span>
                      <span>{getT('medicalPost', lang)}</span>
                    </span>
                    {point.hasHeatedTents && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-sage-700">hotel</span>
                        <span>{getT('heatedTents', lang)}</span>
                      </span>
                    )}
                    <span className="ml-auto text-stone-400">
                      {point.coords[0]}°N, {point.coords[1]}°E
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: 112 SOS Audio Siren Test */}
        {activeTab === 'sos' && (
          <div className="bg-white rounded-lg border border-stone-200 p-8 shadow-xs flex flex-col items-center justify-center text-center gap-6">
            <div className="w-20 h-20 rounded-full bg-terracotta-50 border-4 border-terracotta-100 flex items-center justify-center">
              <span className={`material-symbols-outlined text-4xl text-terracotta-700 ${isSirenPlaying ? 'animate-bounce' : ''}`}>
                crisis_alert
              </span>
            </div>

            <div className="max-w-md">
              <h2 className="text-lg font-bold text-stone-900">
                {lang === 'KZ' ? '112 жедел дыбыстық және жарықтық дабыл' : lang === 'EN' ? '112 Emergency Audio & Strobe Beacon' : 'Экстренное звуковое и световое оповещение 112'}
              </h2>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {lang === 'KZ' ? 'Үйінділер астында немесе нөлдік көріну жағдайында ҚР ТЖМ кинологтар жасақтарының назарын аудару үшін қолданылады.' : lang === 'EN' ? 'Deployed during entrapment or zero-visibility scenarios to draw the attention of search & rescue teams.' : 'Используется при завалах или в условиях нулевой видимости для привлечения внимания кинологических расчетов МЧС РК.'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleTriggerSiren}
                disabled={isSirenPlaying}
                className="px-6 py-3 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
                <span>{isSirenPlaying ? getT('sirenActive', lang) : getT('playSosSiren', lang)}</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-stone-500 bg-stone-50 px-4 py-2 rounded border border-stone-200">
              {lang === 'KZ' ? 'АЛМАТЫ ҚҰТҚАРУ ҚЫЗМЕТІНІҢ БІРЫҢҒАЙ КЕЗЕКШІ-ДИСПЕТЧЕРЛІК ҚЫЗМЕТІ:' : lang === 'EN' ? 'ALMATY CIVIL DEFENSE UNIFIED DISPATCH:' : 'ЕДИНАЯ ДЕЖУРНО-ДИСПЕТЧЕРСКАЯ СЛУЖБА СПАСЕНИЯ АЛМАТЫ:'} <strong>112</strong> / <strong>101</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
