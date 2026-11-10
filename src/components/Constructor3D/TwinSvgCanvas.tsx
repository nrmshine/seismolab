import React, { useMemo } from 'react';
import { ProjectionMode, Language } from '../../types.js';
import { ArchetypeConfig, IsolationType, ResilienceResult } from '../../utils/seismicCalculations.js';
import { getT } from '../../data/translations.js';

interface TwinSvgCanvasProps {
  archetype: ArchetypeConfig;
  floors: number;
  columnSpan: number;
  isolation: IsolationType;
  explodePercent: number;
  layers: {
    facade: boolean;
    columns: boolean;
    shearWalls: boolean;
    raft: boolean;
    dampers: boolean;
  };
  projection: ProjectionMode;
  isSimulating: boolean;
  intensityMsk: number;
  resilience: ResilienceResult;
  showDeformationGrid: boolean;
  showStressHeatmap: boolean;
  simTimeSec: number;
  lang: Language;
}

export const TwinSvgCanvas: React.FC<TwinSvgCanvasProps> = ({
  archetype,
  floors,
  columnSpan,
  isolation,
  explodePercent,
  layers,
  projection,
  isSimulating,
  intensityMsk,
  resilience,
  showDeformationGrid,
  showStressHeatmap,
  simTimeSec,
  lang,
}) => {
  // Sway physics calculation
  const swayOffset = useMemo(() => {
    if (!isSimulating) return 0;
    // Harmonic oscillation with slight damping and frequency matching archetype
    const omega = (2 * Math.PI) / archetype.fundamentalPeriodSec;
    const baseAmp = (intensityMsk / 8.5) * (isolation === 'none' ? 24 : 11);
    return baseAmp * Math.sin(omega * simTimeSec);
  }, [isSimulating, intensityMsk, archetype.fundamentalPeriodSec, isolation, simTimeSec]);

  // Height per floor in SVG units
  const floorHeightSvg = Math.max(16, Math.min(32, 280 / floors));
  const baseCenter = { x: 400, y: 505 };

  // Calculate stress color based on resilience and intensity
  const stressColor = useMemo(() => {
    if (intensityMsk >= 9.5 || !resilience.isSafe) return '#c2410c'; // Terracotta critical
    if (intensityMsk >= 8.0) return '#ea580c';
    return '#15803d'; // Sage safe
  }, [intensityMsk, resilience.isSafe]);

  // Render A/B Split View
  if (projection === 'split') {
    return (
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        {/* Left: With Base Isolation */}
        <div className="flex-1 w-full bg-white/80 rounded-md border border-stone-200 p-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sage-800 font-bold">
              {lang === 'KZ' ? 'СЕЙСМООҚШАУЛАУЫ БАР ҚҰРЫЛЫМ (LRB-800)' : lang === 'EN' ? 'BASE-ISOLATED STRUCTURE (LRB-800)' : 'КОНСТРУКЦИЯ С СЕЙСМОИЗОЛЯЦИЕЙ (LRB-800)'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sage-50 text-sage-800 border border-sage-200">
              {lang === 'KZ' ? 'GRADE A // ҚАУІПСІЗ' : lang === 'EN' ? 'GRADE A // SAFE' : 'GRADE A // БЕЗОПАСНО'}
            </span>
          </div>
          <svg className="w-full h-64 overflow-visible" viewBox="0 0 400 320">
            {/* Dampers */}
            <rect x="150" y="270" width="16" height="18" rx="2" fill="#dfd8cb" stroke="#c2410c" strokeWidth="2" />
            <rect x="234" y="270" width="16" height="18" rx="2" fill="#dfd8cb" stroke="#c2410c" strokeWidth="2" />
            {/* Foundation */}
            <polygon points="120,290 280,290 260,305 140,305" fill="#e5e2da" stroke="#b0a898" />
            {/* Tower Body */}
            {Array.from({ length: Math.min(floors, 10) }).map((_, i) => {
              const y = 260 - i * 20;
              const sway = isSimulating ? (swayOffset * 0.35 * (i / 10)) : 0;
              return (
                <g key={i}>
                  <rect x={160 + sway} y={y} width="80" height="16" fill="#fdfcfb" stroke="#78716c" strokeWidth="1" />
                  <line x1={160 + sway} y1={y} x2={160 + sway} y2={y + 16} stroke="#1c1917" strokeWidth="1.5" />
                  <line x1={240 + sway} y1={y} x2={240 + sway} y2={y + 16} stroke="#1c1917" strokeWidth="1.5" />
                </g>
              );
            })}
          </svg>
          <div className="text-[10px] font-mono text-stone-500 mt-2 text-center">
            PGA_roof: <strong>0.28g</strong> • {lang === 'KZ' ? 'Ығысу' : lang === 'EN' ? 'Drift' : 'Сдвиг'}: <strong>12.4 {lang === 'EN' ? 'mm' : 'мм'}</strong> • {lang === 'KZ' ? 'Жарықшақ жоқ' : lang === 'EN' ? 'No damage' : 'Нет трещин'}
          </div>
        </div>

        {/* Right: Without Base Isolation */}
        <div className="flex-1 w-full bg-stone-50/90 rounded-md border border-stone-200 p-3 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta-700 font-bold">
              {lang === 'KZ' ? 'ҚАТТЫ ІРГЕТАС (ОҚШАУЛАУСЫЗ)' : lang === 'EN' ? 'RIGID FIXED-BASE (NO ISOLATION)' : 'ЖЕСТКИЙ ФУНДАМЕНТ (БЕЗ ИЗОЛЯЦИИ)'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
              {lang === 'KZ' ? 'CRITICAL // ҚАУІПТІ' : lang === 'EN' ? 'CRITICAL // FAILURE' : 'CRITICAL // ОПАСНОСТЬ'}
            </span>
          </div>
          <svg className="w-full h-64 overflow-visible" viewBox="0 0 400 320">
            {/* Rigid base */}
            <polygon points="120,285 280,285 260,305 140,305" fill="#1c1917" />
            {/* Heavily swaying tower with red stress cracks */}
            {Array.from({ length: Math.min(floors, 10) }).map((_, i) => {
              const y = 270 - i * 20;
              const sway = isSimulating ? (swayOffset * 1.65 * (i / 10)) : 0;
              const hasCrack = i <= 2 && intensityMsk >= 8.0;
              return (
                <g key={i}>
                  <rect x={160 + sway} y={y} width="80" height="16" fill={hasCrack ? '#fee2e2' : '#fdfcfb'} stroke={hasCrack ? '#b91c1c' : '#78716c'} strokeWidth="1" />
                  <line x1={160 + sway} y1={y} x2={160 + sway} y2={y + 16} stroke="#1c1917" strokeWidth="2" />
                  <line x1={240 + sway} y1={y} x2={240 + sway} y2={y + 16} stroke="#1c1917" strokeWidth="2" />
                  {hasCrack && (
                    <path d={`M ${170 + sway} ${y + 4} L ${175 + sway} ${y + 10} L ${180 + sway} ${y + 8}`} stroke="#b91c1c" strokeWidth="1.5" fill="none" />
                  )}
                </g>
              );
            })}
          </svg>
          <div className="text-[10px] font-mono text-terracotta-700 mt-2 text-center font-semibold">
            PGA_roof: <strong>0.89g</strong> • {lang === 'KZ' ? 'Ығысу' : lang === 'EN' ? 'Drift' : 'Сдвиг'}: <strong>48.2 {lang === 'EN' ? 'mm' : 'мм'}</strong> • {lang === 'KZ' ? 'Пластикалық бұзылулар' : lang === 'EN' ? 'Severe plastic fracture' : 'Пластические разрушения'}
          </div>
        </div>
      </div>
    );
  }

  // Render Plan View (X-Y)
  if (projection === 'plan') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md aspect-square bg-white rounded-md border border-stone-300 p-6 shadow-sm relative">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-stone-500">
            {lang === 'KZ' ? 'ТИПТІК ҚАБАТ ЖОСПАРЫ (+18.400 ДЕҢГЕЙІ)' : lang === 'EN' ? 'TYPICAL FLOOR PLAN (LEVEL +18.400)' : 'ПЛАН ТИПОВОГО ЭТАЖА (УРОВЕНЬ +18.400)'}
          </div>
          <svg className="w-full h-full" viewBox="0 0 300 300">
            {/* Outer slab */}
            <rect x="30" y="30" width="240" height="240" fill="#faf9f5" stroke="#1c1917" strokeWidth="2" />
            {/* Grid lines */}
            <line x1="30" y1="110" x2="270" y2="110" stroke="#d5d1c5" strokeDasharray="3,3" />
            <line x1="30" y1="190" x2="270" y2="190" stroke="#d5d1c5" strokeDasharray="3,3" />
            <line x1="110" y1="30" x2="110" y2="270" stroke="#d5d1c5" strokeDasharray="3,3" />
            <line x1="190" y1="30" x2="190" y2="270" stroke="#d5d1c5" strokeDasharray="3,3" />
            {/* Core shear walls */}
            <rect x="110" y="110" width="80" height="80" fill="#eeedf7" stroke="#1c1917" strokeWidth="2.5" />
            <text x="125" y="155" fontFamily="JetBrains Mono" fontSize="9" fill="#57534e">
              {lang === 'KZ' ? 'ЛИФТ ЯДРОСЫ' : lang === 'EN' ? 'CORE SHAFT' : 'ЛИФТ. ЯДРО'}
            </text>
            {/* Columns (3x3 grid) */}
            {[30, 110, 190, 270].map((x) =>
              [30, 110, 190, 270].map((y) => (
                <rect
                  key={`${x}-${y}`}
                  x={x - 6}
                  y={y - 6}
                  width="12"
                  height="12"
                  fill="#1c1917"
                  stroke="#57534e"
                />
              ))
            )}
            {/* Dimension marks */}
            <text x="140" y="290" fontFamily="JetBrains Mono" fontSize="10" fill="#1c1917" textAnchor="middle">
              {columnSpan.toFixed(1)} {lang === 'EN' ? 'm' : 'м'}
            </text>
            <text x="15" y="150" fontFamily="JetBrains Mono" fontSize="10" fill="#1c1917" transform="rotate(-90 15,150)" textAnchor="middle">
              {columnSpan.toFixed(1)} {lang === 'EN' ? 'm' : 'м'}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // Render Facade View (X-Z)
  if (projection === 'facade') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <svg className="w-full max-w-lg h-96 overflow-visible" viewBox="0 0 400 480">
          {/* Foundation */}
          <rect x="60" y="440" width="280" height="24" fill="#e5e2da" stroke="#1c1917" strokeWidth="1.5" />
          {/* Base isolation */}
          {layers.dampers && isolation !== 'none' && (
            <g fill="#dfd8cb" stroke="#c2410c" strokeWidth="2">
              <rect x="90" y="420" width="24" height="20" rx="2" />
              <rect x="188" y="420" width="24" height="20" rx="2" />
              <rect x="286" y="420" width="24" height="20" rx="2" />
            </g>
          )}
          {/* Floors Stack */}
          {Array.from({ length: floors }).map((_, i) => {
            const y = 410 - i * floorHeightSvg;
            const sway = isSimulating ? (swayOffset * Math.pow(i / floors, 1.3)) : 0;
            return (
              <g key={i}>
                <rect x={80 + sway} y={y} width="240" height="8" fill="#faf9f5" stroke="#1c1917" strokeWidth="1" />
                <line x1={80 + sway} y1={y} x2={80 + sway} y2={y + floorHeightSvg} stroke="#1c1917" strokeWidth="2" />
                <line x1={200 + sway} y1={y} x2={200 + sway} y2={y + floorHeightSvg} stroke="#1c1917" strokeWidth="2.5" />
                <line x1={320 + sway} y1={y} x2={320 + sway} y2={y + floorHeightSvg} stroke="#1c1917" strokeWidth="2" />
              </g>
            );
          })}
          {/* Roof */}
          <line x1="60" y1="464" x2="340" y2="464" stroke="#78716c" strokeDasharray="3,3" />
        </svg>
      </div>
    );
  }

  // Render Default Isometric View with 3D projection, Explode mode, & Heatmap
  const explodeFactor = explodePercent / 100;

  return (
    <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
      <svg className="w-full h-full drop-shadow-sm overflow-visible" viewBox="0 0 800 640">
        <defs>
          <linearGradient id="warmBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ede9df" />
            <stop offset="100%" stopColor="#ddd7ca" />
          </linearGradient>
          <linearGradient id="facadeWarmTint" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803d" stopOpacity={showStressHeatmap ? "0.2" : "0.08"} />
            <stop offset="100%" stopColor="#c2410c" stopOpacity={showStressHeatmap ? "0.35" : "0.03"} />
          </linearGradient>
          <linearGradient id="stressWarmGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={stressColor} stopOpacity={showStressHeatmap ? "0.6" : "0.25"} />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Base soft contact shadow */}
        <polygon points="120,490 400,600 680,490 400,410" fill="#dcd7cb" opacity="0.6" />

        {/* Lower Foundation block */}
        {layers.raft && (
          <polygon
            points="140,510 400,595 660,510 660,530 400,615 140,530"
            fill="#e8e4db"
            stroke="#cac4b6"
            strokeWidth="1"
          />
        )}

        {/* Hydraulic base dampers (refined terracotta/warm metal) */}
        {layers.dampers && isolation !== 'none' && (
          <g fill="#dfd8cb" stroke="#b8b0a0" strokeWidth="1.5">
            <rect x="220" y="502" width="22" height="24" rx="2" stroke="#c2410c" strokeWidth="2" />
            <rect x="390" y="557" width="22" height="24" rx="2" stroke="#c2410c" strokeWidth="2" />
            <rect x="560" y="502" width="22" height="24" rx="2" stroke="#c2410c" strokeWidth="2" />
          </g>
        )}

        {/* Active seismic base platform */}
        <polygon
          points="150,470 400,550 650,470 400,410"
          fill="url(#warmBaseGrad)"
          stroke="#b0a898"
          strokeWidth="1.5"
        />

        {/* Axis coordinate guidelines */}
        <line x1="100" y1="470" x2="700" y2="470" stroke="#c2410c" strokeDasharray="3,3" strokeWidth="1" opacity="0.6" />
        <line x1="400" y1="380" x2="400" y2="580" stroke="#15803d" strokeDasharray="3,3" strokeWidth="1" opacity="0.6" />

        {/* Explode guideline center trace */}
        {explodeFactor > 0 && (
          <line
            x1="400"
            y1={baseCenter.y}
            x2="400"
            y2={baseCenter.y - floors * (floorHeightSvg + explodeFactor * 28)}
            stroke="#c2410c"
            strokeDasharray="4,4"
            strokeWidth="1.2"
          />
        )}

        {/* Center alignment guide */}
        <line x1="400" y1="410" x2="400" y2="120" stroke="#c8c2b5" strokeDasharray="2,2" strokeWidth="1" />

        {/* Tower Floor Plates Stack */}
        {Array.from({ length: floors }).map((_, index) => {
          const floorNum = index + 1;
          const isRoof = floorNum === floors;
          const isMidReinforced = floorNum === Math.floor(floors / 2);

          // Floor elevation factoring in explode separation
          const yOffset = index * floorHeightSvg + (index * explodeFactor * 24);
          const currentY = baseCenter.y - yOffset - 45;

          // Sway proportional to floor height
          const sway = isSimulating ? swayOffset * Math.pow(floorNum / floors, 1.4) : 0;

          const p1 = `${260 + sway},${currentY}`;
          const p2 = `${400 + sway},${currentY + 45}`;
          const p3 = `${540 + sway},${currentY}`;
          const p4 = `${400 + sway},${currentY - 40}`;

          return (
            <g key={floorNum}>
              {/* Floor Plate Polygon */}
              <polygon
                points={`${p1} ${p2} ${p3} ${p4}`}
                fill={isRoof ? '#edeae3' : isMidReinforced ? '#f5f3ec' : '#fdfcfb'}
                stroke={isRoof || isMidReinforced ? '#1c1917' : '#78716c'}
                strokeWidth={isRoof ? 1.5 : 0.8}
              />

              {/* Stress overlay on floor 1 or when heatmap is active */}
              {(index === 0 || showStressHeatmap) && (
                <polygon
                  points={`${p1} ${p2} ${400 + sway},${currentY - 40}`}
                  fill="url(#stressWarmGrad)"
                />
              )}

              {/* Deformation mesh lines if toggled */}
              {showDeformationGrid && (
                <g stroke="#3b82f6" strokeWidth="0.5" opacity="0.4">
                  <line x1={330 + sway} y1={currentY + 22} x2={470 + sway} y2={currentY - 18} />
                  <line x1={470 + sway} y1={currentY + 22} x2={330 + sway} y2={currentY - 18} />
                </g>
              )}
            </g>
          );
        })}

        {/* Translucent Glass Facade Curtain (if toggled) */}
        {layers.facade && (
          <polygon
            points={`260,${baseCenter.y - 45} 400,${baseCenter.y} 400,${baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 45} 260,${baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 90}`}
            fill="url(#facadeWarmTint)"
            stroke="#15803d"
            strokeDasharray="6,3"
            strokeWidth="1"
          />
        )}

        {/* Main Vertical Structural Columns (if toggled) */}
        {layers.columns && (
          <g stroke="#1c1917">
            <line
              x1="260"
              y1={baseCenter.y - 45}
              x2={260 + (isSimulating ? swayOffset : 0)}
              y2={baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 90}
              strokeWidth="1.8"
            />
            <line
              x1="400"
              y1={baseCenter.y}
              x2={400 + (isSimulating ? swayOffset : 0)}
              y2={baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 45}
              strokeWidth="2.2"
            />
            <line
              x1="540"
              y1={baseCenter.y - 45}
              x2={540 + (isSimulating ? swayOffset : 0)}
              y2={baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 90}
              strokeWidth="1.8"
            />
          </g>
        )}

        {/* X-Braced Dampers on East Facade (if toggled) */}
        {layers.shearWalls && (
          <g opacity="0.75" stroke="#c2410c" strokeWidth="1">
            {Array.from({ length: Math.min(floors, 8) }).map((_, i) => {
              const y1 = baseCenter.y - i * (floorHeightSvg + explodeFactor * 24);
              const y2 = y1 - floorHeightSvg;
              return (
                <g key={i}>
                  <line x1="400" y1={y1} x2="540" y2={y2 - 45} />
                  <line x1="540" y1={y1 - 45} x2="400" y2={y2} />
                </g>
              );
            })}
          </g>
        )}

        {/* Telemetry Sensor Nodes */}
        {/* Node 1: Roof accelerometer */}
        <circle
          cx={400 + (isSimulating ? swayOffset : 0)}
          cy={baseCenter.y - (floors - 1) * (floorHeightSvg + explodeFactor * 24) - 45}
          r="4.5"
          fill="#15803d"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Node 2: Mid-level drift sensor */}
        <circle
          cx={400 + (isSimulating ? swayOffset * 0.5 : 0)}
          cy={baseCenter.y - Math.floor(floors / 2) * (floorHeightSvg + explodeFactor * 24)}
          r="4.5"
          fill="#c2410c"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <circle
          cx={400 + (isSimulating ? swayOffset * 0.5 : 0)}
          cy={baseCenter.y - Math.floor(floors / 2) * (floorHeightSvg + explodeFactor * 24)}
          r="8"
          fill="none"
          stroke="#c2410c"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Node 3: Base shear node */}
        <circle cx="400" cy={baseCenter.y} r="5" fill="#c2410c" stroke="#ffffff" strokeWidth="2" />
        <circle cx="400" cy={baseCenter.y} r="10" fill="none" stroke="#c2410c" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Floating Sensor Callout 1 (Roof Accel) */}
      <div className="absolute top-8 left-1/2 -translate-x-12 flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-xs pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse"></span>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
            {getT('roofAccelCallout', lang)}
          </span>
          <span className="text-xs font-mono text-stone-800 font-semibold">
            {(0.28 * (intensityMsk / 8.5)).toFixed(2)} g // 1.42 Hz
          </span>
        </div>
      </div>

      {/* Floating Sensor Callout 2 (Mid-Level Drift) */}
      <div className="absolute top-1/2 right-4 -translate-y-8 flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-xs pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600"></span>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
            {getT('driftCallout', lang)} ({lang === 'KZ' ? `${Math.floor(floors / 2)}-қ.` : `${Math.floor(floors / 2)} эт.`})
          </span>
          <span className="text-xs font-mono text-terracotta-700 font-semibold">
            Δ = {resilience.maxDisplacementMm} {lang === 'EN' ? 'mm' : 'мм'} ({resilience.isSafe ? getT('inNormCallout', lang) : getT('dangerCallout', lang)})
          </span>
        </div>
      </div>

      {/* Floating Sensor Callout 3 (Base Shear Strain) */}
      <div className="absolute bottom-24 left-4 flex items-center gap-2 py-1.5 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-xs pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
            {getT('shearCallout', lang)}
          </span>
          <span className="text-xs font-mono text-stone-800 font-semibold">
            Q_base = {resilience.baseShearKn.toLocaleString()} {lang === 'EN' ? 'kN' : 'кН'}
          </span>
        </div>
      </div>
    </div>
  );
};
