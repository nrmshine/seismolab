import React, { useState } from 'react';
import { Language } from '../../types.js';
import { HISTORIC_EARTHQUAKES } from '../../data/earthquakesData.js';
import { getT } from '../../data/translations.js';

interface DisasterHistoryViewProps {
  lang: Language;
}

export const DisasterHistoryView: React.FC<DisasterHistoryViewProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'chronicle' | 'zenkov' | 'forensics'>('chronicle');
  const [selectedEarthquakeId, setSelectedEarthquakeId] = useState<string>('kemin-1911');

  const selectedEq = HISTORIC_EARTHQUAKES.find((e) => e.id === selectedEarthquakeId) || HISTORIC_EARTHQUAKES[0];

  return (
    <div className="flex-1 flex flex-col bg-stone-75 min-h-[calc(100vh-3.5rem)]">
      {/* Subheader */}
      <div className="w-full bg-stone-50 border-b border-stone-200/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            {getT('archivePrefix', lang)}
          </span>
          <h1 className="text-xs font-semibold text-stone-900">
            {getT('historyTitle', lang)}
          </h1>
        </div>

        <div className="flex items-center bg-stone-150/70 p-0.5 rounded border border-stone-200 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('chronicle')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'chronicle' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabChronicle', lang)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zenkov')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'zenkov' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabZenkov', lang)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('forensics')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'forensics' ? 'bg-stone-900 text-white font-semibold' : 'text-stone-600'}`}
          >
            {getT('tabForensics', lang)}
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full flex-1">
        {activeTab === 'chronicle' && (
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
            {/* Left Timeline selector */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
                {getT('catalogEvents', lang)}
              </span>
              <div className="flex flex-col gap-2">
                {HISTORIC_EARTHQUAKES.map((eq) => {
                  const isSelected = eq.id === selectedEarthquakeId;
                  const displayName = lang === 'KZ' && eq.nameKz ? eq.nameKz.split(' (')[0] : lang === 'EN' && eq.nameEn ? eq.nameEn.split(' (')[0] : eq.name.split(' (')[0];
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setSelectedEarthquakeId(eq.id)}
                      className={`p-3.5 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-white border-terracotta-600 shadow-sm'
                          : 'bg-stone-50 hover:bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{displayName}</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-800">
                          M{eq.magnitude}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-stone-500">
                        <span>{eq.date.split(' (')[0]}</span>
                        <span>{eq.intensityMsk} {getT('pointsUnit', lang)} MSK</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Dossier */}
            <div className="p-6 rounded-lg bg-white border border-stone-200 shadow-xs flex flex-col gap-5">
              <div className="flex items-start justify-between pb-4 border-b border-stone-200">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">
                    {lang === 'KZ' && selectedEq.nameKz ? selectedEq.nameKz : lang === 'EN' && selectedEq.nameEn ? selectedEq.nameEn : selectedEq.name}
                  </h2>
                  <span className="text-xs font-mono text-terracotta-700">
                    {lang === 'KZ' ? 'ОШАҚ:' : lang === 'EN' ? 'EPICENTER:' : 'ЭПИЦЕНТР:'} {selectedEq.epicenter} ({selectedEq.distanceToAlmatyKm} {lang === 'EN' ? 'km to Almaty' : lang === 'KZ' ? 'км Алматыға дейін' : 'км до Алматы'})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-bold text-stone-900">M {selectedEq.magnitude}</span>
                  <span className="block text-[10px] font-mono text-stone-500">PGA: {selectedEq.pgaObserved}g</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('intensity', lang)}</span>
                  <span className="font-bold text-stone-800">{selectedEq.intensityMsk} {getT('pointsUnit', lang)}</span>
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('depthLabel', lang)}</span>
                  <span className="font-bold text-stone-800">{selectedEq.depthKm} {lang === 'EN' ? 'KM' : 'КМ'}</span>
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 block">{getT('fatalitiesLabel', lang)}</span>
                  <span className="font-bold text-terracotta-700">{selectedEq.fatalities}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold font-mono uppercase text-stone-500 mb-2">
                  {getT('chronicleDetail', lang)}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded border border-stone-200">
                  {selectedEq.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold font-mono uppercase text-stone-500 mb-2">
                  {getT('forensicAnalysis', lang)}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded border border-stone-200">
                  {selectedEq.structuralImpact}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold font-mono uppercase text-stone-500 mb-2">
                  {getT('implementedNorms', lang)}
                </h3>
                <div className="space-y-1.5">
                  {selectedEq.lessonsLearned.map((lesson, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded bg-sage-50 border border-sage-200 text-xs text-sage-900">
                      <span className="material-symbols-outlined text-sm text-sage-700">check_circle</span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'zenkov' && (
          <div className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col gap-6 shadow-xs">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] font-mono uppercase text-sage-800 font-bold tracking-wider">
                {lang === 'KZ' ? '1911 ЖЫЛҒЫ СӘУЛЕТТІК ЖЕҢІС' : lang === 'EN' ? 'ARCHITECTURAL TRIUMPH OF 1911' : 'АРХИТЕКТУРНЫЙ ТРИУМФ 1911 ГОДА'}
              </span>
              <h2 className="text-lg font-bold text-stone-900 mt-1">
                {lang === 'KZ' ? 'Алматының Вознесенск кафедралық соборы (Инженер А. П. Зенков)' : lang === 'EN' ? 'Ascension Zenkov Cathedral in Almaty (Engineer A. P. Zenkov)' : 'Вознесенский кафедральный собор Алматы (Инженер А. П. Зенков)'}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'KZ' ? 'Биіктігі 56 метр. 10 балдық Кемін жер сілкінісіне бірде-бір жарықшақсыз төтеп берген тұтас ағаш құрылым.' : lang === 'EN' ? '56 meters high. An all-timber masterpiece that survived the 10-magnitude Kemin earthquake without a single crack.' : 'Высота 56 метров. Полностью деревянное сооружение, выдержавшее 10-балльное Кеминское землетрясение без единой трещины.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-stone-900">
                  {lang === 'KZ' ? '1. ИІЛГІШ БАЙЛАНЫС ТҮЙІНДЕРІ' : lang === 'EN' ? '1. FLEXIBLE JOINERY NODES' : '1. ГИБКИЕ УЗЛЫ СОЧЛЕНЕНИЙ'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'KZ' ? 'Зенков қатаң қиылыстар орнына соғылған болат қамыттары бар серпімді болтты қосылыстарды қолданды, бұл ғимаратқа маятник сияқты тербелуге мүмкіндік берді.' : lang === 'EN' ? 'Instead of rigid notches, Zenkov utilized through-bolts and wrought iron strapping, allowing the timber frames to oscillate safely like an inverted pendulum.' : 'Вместо жестких врубок Зенков применил болтовые соединения с пружинящими коваными стальными хомутами, позволившими конструкции раскачиваться как маятник.'}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-stone-900">
                  {lang === 'KZ' ? '2. ТЯНЬ-ШАНЬ ШЫРШАСЫ' : lang === 'EN' ? '2. TIAN SHAN SPRUCE' : '2. ТЯНЬ-ШАНЬСКАЯ ЕЛЬ'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'KZ' ? 'Кептірілген тау ағашының беріктік пен тығыздық қатынасы өте жоғары, ол инерциялық сейсмикалық күштерді кірпішпен салыстырғанда 75%-ға азайтады.' : lang === 'EN' ? 'Cured mountain spruce timber possesses an exceptional strength-to-weight ratio, cutting inertial seismic forces by 75% relative to masonry.' : 'Сухая горная древесина обладает высочайшим коэффициентом отношения прочности к плотности, снижая инерционные сейсмические силы на 75% по сравнению с кирпичом.'}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-stone-900">
                  {lang === 'KZ' ? '3. КЕҢІСТІКТІК ҚАҢҚА' : lang === 'EN' ? '3. SPATIAL TRUSS BRACING' : '3. ПРОСТРАНСТВЕННЫЙ КАРКАС'}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'KZ' ? 'Үздіксіз диагональді тіректері бар симметриялы орталықтандырылған схема жер асты дүмпуінің энергиясын бүкіл ғимарат көлеміне таратты.' : lang === 'EN' ? 'Symmetrical concentric core topology and continuous diagonal braces dissipated base kinetic energy evenly across the structural volume.' : 'Симметричная центрическая схема с непрерывными диагональными раскосами рассеивала энергию подземного толчка по всему объему здания.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-100 border border-stone-200 font-mono text-xs text-stone-800 italic">
              {lang === 'KZ' ? '«Аса зор жер сілкінісі кезінде собор желдегі құрақтай ырғалып тұрды, крестер иілді, қоңыраулар өздігінен соғылды, бірақ ағаштың серпімділігі арқасында бірде-бір бөрене сынбады.» — инженер Андрей Зенковтың есебінен (1911 ж.)' : lang === 'EN' ? '“During the violent earthquake, the cathedral swayed like a reed in the wind, crosses flexed, bells rang of their own accord, yet not a single beam cracked thanks to the elasticity of timber.” — from Engineer Andrei Zenkov’s report (1911)' : '«При грандиозном землетрясении собор качался как былинка, кресты гнулись, колокола звонили сами, но ни одна балка не сломалась благодаря эластичности дерева.» — из доклада инженера Андрея Зенкова (1911 г.)'}
            </div>
          </div>
        )}

        {activeTab === 'forensics' && (
          <div className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col gap-6 shadow-xs">
            <h2 className="text-sm font-bold text-stone-900 uppercase font-mono tracking-wider">
              {lang === 'KZ' ? 'Алматы ғимараттары типологиясының сейсмикалық осалдығын салыстырмалы талдау' : lang === 'EN' ? 'Comparative Seismic Vulnerability Analysis of Almaty Building Typologies' : 'Сравнительный анализ уязвимости типологий зданий Алматы'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded border border-terracotta-200 bg-terracotta-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-terracotta-900">
                    {lang === 'KZ' ? 'Саман және күйдірілмеген кірпіш' : lang === 'EN' ? 'Adobe & Unreinforced Brick' : 'Саман и сырцовый кирпич'}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-terracotta-200 text-terracotta-900">CRITICAL</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {lang === 'KZ' ? 'Созылу мен ығысуға беріктігі мүлдем жоқ. 0.15g-ден жоғары үдеулерде қабырғалар күл-талқан болып, ауыр шатыр ішке қарай құлайды.' : lang === 'EN' ? 'Zero tensile or shear strength. At accelerations above 0.15g, unreinforced mudbrick pulverizes, causing immediate roof collapse.' : 'Отсутствие прочности на растяжение и сдвиг. При ускорениях свыше 0.15g стены рассыпаются в пыль, а тяжелая крыша падает внутрь.'}
                </p>
              </div>

              <div className="p-4 rounded border border-stone-300 bg-stone-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">
                    {lang === 'KZ' ? 'Кеңестік панельді үйлер (1-464)' : lang === 'EN' ? 'Soviet Precast Panel (1-464)' : 'Советская панель (1-464)'}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-800">MODERATE</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {lang === 'KZ' ? 'Тұтас қабырғалық панельдері бар қатты қорапты схема. Төзімділігі жоғары, осал жері — түйіскен жерлердегі дәнекерленген бөлшектердің тот басуы.' : lang === 'EN' ? 'Rigid cellular shear-box scheme. Robust overall integrity; main vulnerability lies in welded steel joint corrosion.' : 'Жесткая коробчатая схема со сплошными стеновыми панелями. Высокая живучесть, слабое место — коррозия закладных стальных деталей в стыках.'}
                </p>
              </div>

              <div className="p-4 rounded border border-sage-300 bg-sage-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sage-900">
                    {lang === 'KZ' ? 'LRB тіректері бар монолит' : lang === 'EN' ? 'Monolithic RC with Base LRB' : 'Монолит с LRB-опорами'}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sage-200 text-sage-900">SUPERIOR</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {lang === 'KZ' ? 'Түйіндерді үздіксіз арматуралау + ростверк деңгейінде энергияның 60%-ын өшіру. Ғимарат тіпті 9.5 балдық соққыдан кейін де өз қызметін тоқтатпайды.' : lang === 'EN' ? 'Ductile moment frame detailing combined with 60% energy dissipation at the isolation plane. The building remains fully operational even after a 9.5 MSK strike.' : 'Непрерывное армирование узлов + демпфирование 60% энергии на уровне ростверка. Здание остается функциональным даже после 9.5 баллов.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
