import React, { useState } from 'react';
import { Language, MaterialSpec } from '../../types.js';
import { MATERIALS_CATALOG } from '../../data/materialsData.js';
import { getT } from '../../data/translations.js';

interface MaterialsViewProps {
  lang: Language;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ lang }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(MATERIALS_CATALOG[0]);
  const [cycleAmplitudeMm, setCycleAmplitudeMm] = useState<number>(180);
  const [cycleFreqHz, setCycleFreqHz] = useState<number>(1.2);

  // Dissipated energy calculation (area inside hysteresis loop)
  const energyJoules = Math.round(
    selectedMaterial.dampingRatio * 4 * Math.PI * (cycleAmplitudeMm / 1000) * 850000
  );

  return (
    <div className="flex-1 flex flex-col bg-stone-75 min-h-[calc(100vh-3.5rem)]">
      {/* Subheader */}
      <div className="w-full bg-stone-50 border-b border-stone-200/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            {getT('materialsPrefix', lang)}
          </span>
          <h1 className="text-xs font-semibold text-stone-900">
            {getT('materialsTitle', lang)}
          </h1>
        </div>
        <span className="text-[10px] font-mono text-sage-800 bg-sage-50 border border-sage-200 px-2 py-0.5 rounded font-semibold">
          {getT('spRkCert', lang)}
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Left Materials Selector List */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
            {getT('materialsCatalogTitle', lang)}
          </span>
          {MATERIALS_CATALOG.map((mat) => {
            const isSelected = mat.id === selectedMaterial.id;
            const matName = lang === 'KZ' && mat.nameKz ? mat.nameKz : lang === 'EN' && mat.nameEn ? mat.nameEn : mat.name;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterial(mat)}
                className={`p-3.5 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 hover:bg-white border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{matName}</span>
                  {mat.kazNiisaApproved && (
                    <span className="text-[9px] font-mono text-sage-800 bg-sage-50 px-1.5 py-0.2 rounded border border-sage-200 font-semibold">
                      {lang === 'KZ' ? 'ҚР ЕЖ' : 'СП РК'}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-stone-500">
                  <span>{mat.category}</span>
                  <span className="text-terracotta-700 font-semibold">ξ = {(mat.dampingRatio * 100).toFixed(0)}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Interactive Laboratory Workbench */}
        <div className="flex flex-col gap-5">
          {/* Active Material Card */}
          <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold">
                  {selectedMaterial.category}
                </span>
                <h2 className="text-base font-bold text-stone-900 mt-0.5">
                  {lang === 'KZ' && selectedMaterial.nameKz ? selectedMaterial.nameKz : lang === 'EN' && selectedMaterial.nameEn ? selectedMaterial.nameEn : selectedMaterial.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-stone-500 block">
                  {lang === 'KZ' ? 'ЫҒЫСУ ДЕФОРМАЦИЯСЫ γ' : lang === 'EN' ? 'SHEAR STRAIN γ' : 'ДЕФОРМАЦИЯ СДВИГА γ'}
                </span>
                <span className="text-lg font-mono font-bold text-stone-900">
                  {(selectedMaterial.maxShearStrain * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded border border-stone-200">
              {selectedMaterial.description}
            </p>

            {/* Technical Specification Grid */}
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 block">{getT('dampingRatioLabel', lang)}</span>
                <strong className="text-sage-800 text-sm">{(selectedMaterial.dampingRatio * 100).toFixed(1)}%</strong>
              </div>
              <div className="p-3 rounded bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 block">{getT('shearModulusLabel', lang)}</span>
                <strong className="text-stone-900 text-sm">{selectedMaterial.shearModulusMpa} {lang === 'EN' ? 'MPa' : 'МПа'}</strong>
              </div>
              <div className="p-3 rounded bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 block">{getT('hysteresisTypeLabel', lang)}</span>
                <strong className="text-terracotta-700 text-sm uppercase">{selectedMaterial.hysteresisType}</strong>
              </div>
            </div>

            {/* Interactive Hysteresis Loop Visualizer */}
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-stone-900 uppercase">
                    {getT('hysteresisLoopTitle', lang)}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 block">
                    {getT('cyclicLoadSubtitle', lang)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-stone-400 block">
                    {getT('dissipatedEnergyLabel', lang)}
                  </span>
                  <span className="text-xs font-mono font-bold text-terracotta-700">
                    {energyJoules.toLocaleString()} {getT('joulesPerCycle', lang)}
                  </span>
                </div>
              </div>

              {/* Hysteresis SVG Curve */}
              <div className="w-full h-48 bg-white rounded border border-stone-200 relative flex items-center justify-center p-2">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Axis */}
                  <line x1="20" y1="100" x2="380" y2="100" stroke="#d5d1c5" strokeWidth="1" />
                  <line x1="200" y1="10" x2="200" y2="190" stroke="#d5d1c5" strokeWidth="1" />
                  <text x="370" y="95" fontFamily="JetBrains Mono" fontSize="9" fill="#78716c">+Δ</text>
                  <text x="25" y="95" fontFamily="JetBrains Mono" fontSize="9" fill="#78716c">-Δ</text>
                  <text x="205" y="20" fontFamily="JetBrains Mono" fontSize="9" fill="#78716c">+F (кН)</text>
                  <text x="205" y="185" fontFamily="JetBrains Mono" fontSize="9" fill="#78716c">-F (кН)</text>

                  {/* Parametric Hysteresis Loop */}
                  {selectedMaterial.hysteresisType === 'elastomeric' ? (
                    <polygon
                      points={`
                        ${200 - cycleAmplitudeMm * 0.7},${100 + 45}
                        ${200 - cycleAmplitudeMm * 0.3},${100 + 75}
                        ${200 + cycleAmplitudeMm * 0.7},${100 - 45}
                        ${200 + cycleAmplitudeMm * 0.3},${100 - 75}
                      `}
                      fill="#fed7aa"
                      fillOpacity="0.4"
                      stroke="#c2410c"
                      strokeWidth="2.5"
                    />
                  ) : selectedMaterial.hysteresisType === 'viscous' ? (
                    <ellipse
                      cx="200"
                      cy="100"
                      rx={cycleAmplitudeMm * 0.65}
                      ry="65"
                      fill="#bbf7d0"
                      fillOpacity="0.35"
                      stroke="#15803d"
                      strokeWidth="2.5"
                      transform="rotate(-25 200 100)"
                    />
                  ) : (
                    <polygon
                      points={`
                        ${200 - cycleAmplitudeMm * 0.8},${100 + 70}
                        ${200 - cycleAmplitudeMm * 0.2},${100 + 10}
                        ${200 + cycleAmplitudeMm * 0.8},${100 - 70}
                        ${200 + cycleAmplitudeMm * 0.2},${100 - 10}
                      `}
                      fill="#e0e7ff"
                      fillOpacity="0.45"
                      stroke="#4338ca"
                      strokeWidth="2.5"
                    />
                  )}
                </svg>
              </div>

              {/* Sliders for cycle testing */}
              <div className="grid grid-cols-2 gap-4 pt-1 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-stone-500">
                      {lang === 'KZ' ? 'ЫҒЫСУ АМПЛИТУДАСЫ (Δ)' : lang === 'EN' ? 'DISPLACEMENT AMPLITUDE (Δ)' : 'АМПЛИТУДА СМЕЩЕНИЯ (Δ)'}
                    </span>
                    <span className="font-semibold">{cycleAmplitudeMm} {lang === 'EN' ? 'mm' : 'мм'}</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="240"
                    value={cycleAmplitudeMm}
                    onChange={(e) => setCycleAmplitudeMm(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded accent-stone-900"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-stone-500">
                      {lang === 'KZ' ? 'ЦИКЛ ЖИІЛІГІ' : lang === 'EN' ? 'CYCLE FREQUENCY' : 'ЧАСТОТА ЦИКЛА'}
                    </span>
                    <span className="font-semibold">{cycleFreqHz.toFixed(1)} {lang === 'EN' ? 'Hz' : 'Гц'}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={Math.round(cycleFreqHz * 10)}
                    onChange={(e) => setCycleFreqHz(Number(e.target.value) / 10)}
                    className="w-full h-1.5 bg-stone-200 rounded accent-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Key Engineering Advantages */}
            <div>
              <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block mb-1.5">
                {lang === 'KZ' ? 'ЖҮЙЕНІҢ НЕГІЗГІ АРТЫҚШЫЛЫҚТАРЫ:' : lang === 'EN' ? 'KEY ENGINEERING ADVANTAGES:' : 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА СИСТЕМЫ:'}
              </span>
              <div className="space-y-1">
                {selectedMaterial.advantages.map((adv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
