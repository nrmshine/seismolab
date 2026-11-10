import React, { useState, useEffect, useRef } from 'react';
import { Language, ProjectionMode } from '../../types.js';
import {
  ARCHETYPES,
  ArchetypeId,
  SoilCategory,
  IsolationType,
  calculateResilience,
  calculateFeaStresses,
} from '../../utils/seismicCalculations.js';
import { getT } from '../../data/translations.js';
import { TwinSvgCanvas } from './TwinSvgCanvas.js';
import { EvacuationModal } from './EvacuationModal.js';
import { ExportModal } from './ExportModal.js';
import { JsonConfigModal } from './JsonConfigModal.js';
import { soundFx } from '../../utils/audioSynthesizer.js';

interface ConstructorViewProps {
  lang: Language;
  onArchetypeChange?: (name: string) => void;
}

export const ConstructorView: React.FC<ConstructorViewProps> = ({ lang, onArchetypeChange }) => {
  // Archetype & Geometry State
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('koktobe-tower');
  const archetype = ARCHETYPES[selectedArchetypeId] || ARCHETYPES['koktobe-tower'];

  const [floors, setFloors] = useState<number>(archetype.floors);
  const [columnSpan, setColumnSpan] = useState<number>(archetype.columnSpanMeters);
  const [isolation, setIsolation] = useState<IsolationType>(archetype.defaultIsolation);

  // Update geometry when archetype changes
  const handleSelectArchetype = (id: ArchetypeId) => {
    setSelectedArchetypeId(id);
    const newArch = ARCHETYPES[id];
    setFloors(newArch.floors);
    setColumnSpan(newArch.columnSpanMeters);
    setIsolation(newArch.defaultIsolation);
    onArchetypeChange?.(newArch.name);
  };

  // Projection & Display State
  const [projection, setProjection] = useState<ProjectionMode>('iso');
  const [explodePercent, setExplodePercent] = useState<number>(0);
  const [showDeformationGrid, setShowDeformationGrid] = useState<boolean>(false);
  const [showStressHeatmap, setShowStressHeatmap] = useState<boolean>(false);

  // Structural Layer toggles
  const [layers, setLayers] = useState({
    facade: true,
    columns: true,
    shearWalls: true,
    raft: true,
    dampers: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Seismic Simulation State
  const [intensityMsk, setIntensityMsk] = useState<number>(8.5);
  const [soil, setSoil] = useState<SoilCategory>('II');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simTimeSec, setSimTimeSec] = useState<number>(0);

  // Modals
  const [isEvacModalOpen, setIsEvacModalOpen] = useState(false);
  const [exportModalType, setExportModalType] = useState<'4k' | 'ifc' | null>(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Calculations
  const resilience = calculateResilience(selectedArchetypeId, intensityMsk, soil, isolation, floors);
  const feaRows = calculateFeaStresses(intensityMsk, selectedArchetypeId, isolation);

  // Real-time animation loop for earthquake simulation
  useEffect(() => {
    let animId: number;
    if (isSimulating) {
      soundFx.startEarthquakeRumble(intensityMsk);
      const startTime = performance.now();
      const loop = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        setSimTimeSec(elapsed);
        if (elapsed < 30) {
          animId = requestAnimationFrame(loop);
        } else {
          setIsSimulating(false);
          soundFx.stopEarthquakeRumble();
        }
      };
      animId = requestAnimationFrame(loop);
    } else {
      soundFx.stopEarthquakeRumble();
    }
    return () => {
      cancelAnimationFrame(animId);
      soundFx.stopEarthquakeRumble();
    };
  }, [isSimulating, intensityMsk]);

  // Handle 3D File Ingestion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportStatus(`Импортирован файл ${file.name} (1,480 узлов FEM)`);
      setTimeout(() => setImportStatus(null), 4000);
    }
  };

  // Full state object for JSON export
  const fullConfigJson = {
    timestamp: new Date().toISOString(),
    standard: 'СП РК 2.03-2017',
    project: {
      archetypeId: selectedArchetypeId,
      name: archetype.name,
      floors,
      columnSpan,
      isolation,
    },
    simulation: {
      intensityMsk,
      soilCategory: soil,
      pga: (0.04 * Math.pow(1.9, intensityMsk - 5.0)).toFixed(2) + 'g',
      resilienceScore: resilience.score,
      grade: resilience.grade,
      maxInterstoryDriftPercent: resilience.interstoryDriftPercent,
      residualResourcePercent: resilience.residualResourcePercent,
      baseShearKn: resilience.baseShearKn,
    },
    feaStresses: feaRows,
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Subheader / Project & Mode Controls Bar */}
      <div className="w-full bg-stone-50 border-b border-stone-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Project Selector Breadcrumb */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
            {getT('projectPrefix', lang)}
          </span>
          <h1 className="text-xs font-semibold text-stone-900 truncate tracking-tight">
            {archetype[lang === 'KZ' ? 'nameKz' : lang === 'EN' ? 'nameEn' : 'name'].toUpperCase()} {getT('seismicZoneSubtitle', lang)}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-sage-50 border border-sage-200/80 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span>
            <span className="text-[10px] font-mono font-semibold text-sage-800 tracking-wider">
              {getT('certifiedKazniisa', lang)}
            </span>
          </div>
        </div>

        {/* Center: Projection Mode Switcher */}
        <div className="flex items-center bg-stone-150/70 p-0.5 rounded border border-stone-200">
          <button
            type="button"
            onClick={() => setProjection('iso')}
            className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase transition-all rounded ${
              projection === 'iso'
                ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {getT('isometry', lang)}
          </button>
          <button
            type="button"
            onClick={() => setProjection('facade')}
            className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase transition-all rounded ${
              projection === 'facade'
                ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {getT('facade', lang)}
          </button>
          <button
            type="button"
            onClick={() => setProjection('plan')}
            className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase transition-all rounded ${
              projection === 'plan'
                ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {getT('plan', lang)}
          </button>
          <button
            type="button"
            onClick={() => setProjection('section')}
            className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase transition-all rounded ${
              projection === 'section'
                ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {getT('section', lang)}
          </button>
          <span className="w-px h-3 bg-stone-300 mx-1"></span>
          <button
            type="button"
            onClick={() => setProjection('split')}
            className={`px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase transition-colors rounded flex items-center gap-1 ${
              projection === 'split'
                ? 'font-semibold text-stone-50 bg-terracotta-700 shadow-xs'
                : 'text-stone-600 hover:text-terracotta-700'
            }`}
          >
            <span className="material-symbols-outlined text-xs">compare_arrows</span>
            <span>{getT('abSplit', lang)}</span>
          </button>
        </div>

        {/* Right: Export Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setExportModalType('4k')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-[10px] font-mono border border-stone-200 transition-colors"
          >
            <span className="material-symbols-outlined text-xs text-stone-500">photo_camera</span>
            <span>{getT('snapshot4k', lang)}</span>
          </button>
          <button
            type="button"
            onClick={() => setExportModalType('ifc')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-[10px] font-mono border border-stone-200 transition-colors"
          >
            <span className="material-symbols-outlined text-xs text-terracotta-700">download</span>
            <span>{getT('exportIfc', lang)}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsJsonModalOpen(true)}
            className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 transition-colors"
            title="JSON Config"
          >
            <span className="material-symbols-outlined text-sm">code</span>
          </button>
        </div>
      </div>

      {/* Main Three-Column Architectural Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-[290px_minmax(0,1fr)_330px] flex-1 bg-stone-75">
        {/* LEFT RAIL: Inspector & Architectural Parameters */}
        <aside className="flex flex-col bg-stone-50 border-r border-stone-200/80 overflow-y-auto p-4 gap-5">
          {/* Archetype Library */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('archetypesTitle', lang)}
              </span>
              <span className="text-[10px] font-mono text-terracotta-700 font-semibold">{getT('schemesCount', lang)}</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {(Object.keys(ARCHETYPES) as ArchetypeId[]).map((archId) => {
                const item = ARCHETYPES[archId];
                const isSelected = selectedArchetypeId === archId;
                return (
                  <button
                    key={archId}
                    type="button"
                    onClick={() => handleSelectArchetype(archId)}
                    className={`flex items-center justify-between p-2.5 rounded-md text-left transition-colors ${
                      isSelected
                        ? 'bg-stone-100/90 border border-stone-300 shadow-2xs'
                        : 'bg-white hover:bg-stone-100/60 border border-stone-200/80'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-1">
                      <span className="text-xs font-semibold text-stone-900 truncate">
                        {lang === 'KZ' ? item.nameKz : lang === 'EN' ? item.nameEn : item.name}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono truncate">
                        {item.subtitle}
                      </span>
                    </div>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600 shrink-0"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Asset Ingestion */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              {getT('importTitle', lang)}
            </span>
            <label className="flex flex-col items-center justify-center p-4 rounded-md bg-stone-100/60 border border-dashed border-stone-300 hover:border-stone-400 hover:bg-stone-100 transition-all cursor-pointer group text-center">
              <input
                type="file"
                accept=".glb,.gltf,.ifc,.json,.obj"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="material-symbols-outlined text-2xl text-stone-400 group-hover:text-stone-700 transition-colors">
                upload_file
              </span>
              <span className="text-xs font-semibold text-stone-800 mt-1">
                {importStatus || getT('importDropzone', lang)}
              </span>
              <span className="text-[10px] text-stone-500 font-mono mt-0.5">
                {getT('importLimit', lang)}
              </span>
            </label>
          </div>

          {/* Structural Layer Stack */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('layersTitle', lang)}
              </span>
              <span className="text-[10px] font-mono text-sage-800 font-semibold">
                {Object.values(layers).filter(Boolean).length} {getT('activeLayersCount', lang)}
              </span>
            </div>
            <div className="flex flex-col divide-y divide-stone-200/80 rounded-md bg-white border border-stone-200">
              <label className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-stone-50 transition-colors">
                <span className="text-xs text-stone-800">{getT('layerFacade', lang)}</span>
                <input
                  type="checkbox"
                  checked={layers.facade}
                  onChange={() => toggleLayer('facade')}
                  className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
              </label>
              <label className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-stone-50 transition-colors">
                <span className="text-xs text-stone-800">{getT('layerColumns', lang)}</span>
                <input
                  type="checkbox"
                  checked={layers.columns}
                  onChange={() => toggleLayer('columns')}
                  className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
              </label>
              <label className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-stone-50 transition-colors">
                <span className="text-xs text-stone-800">{getT('layerShearWalls', lang)}</span>
                <input
                  type="checkbox"
                  checked={layers.shearWalls}
                  onChange={() => toggleLayer('shearWalls')}
                  className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
              </label>
              <label className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-stone-50 transition-colors">
                <span className="text-xs text-stone-800">{getT('layerRaft', lang)}</span>
                <input
                  type="checkbox"
                  checked={layers.raft}
                  onChange={() => toggleLayer('raft')}
                  className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
              </label>
              <label className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-800">{getT('layerDampers', lang)}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span>
                </div>
                <input
                  type="checkbox"
                  checked={layers.dampers}
                  onChange={() => toggleLayer('dampers')}
                  className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
              </label>
            </div>
          </div>

          {/* Explode View Scrubber */}
          <div className="flex flex-col gap-2 p-3 rounded-md bg-white border border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('explodeTitle', lang)}
              </span>
              <span className="text-xs font-mono text-terracotta-700 font-semibold">
                {explodePercent}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={explodePercent}
              onChange={(e) => setExplodePercent(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded appearance-none cursor-pointer accent-stone-900"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>{getT('explodeAssembly', lang)}</span>
              <span>{getT('explodeExpanded', lang)}</span>
            </div>
          </div>

          {/* Geometry & Base Isolation */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              {getT('geometryTitle', lang)}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col p-2.5 rounded-md bg-white border border-stone-200">
                <span className="text-[10px] font-mono text-stone-500">{getT('floors', lang)}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-mono text-stone-900 font-semibold">
                    {floors} {getT('floorsUnit', lang)} ({(floors * 3.2).toFixed(1)}{getT('metersUnit', lang)})
                  </span>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setFloors((f) => Math.min(30, f + 1))}
                      className="text-stone-400 hover:text-stone-800 leading-none text-xs"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => setFloors((f) => Math.max(1, f - 1))}
                      className="text-stone-400 hover:text-stone-800 leading-none text-xs"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-2.5 rounded-md bg-white border border-stone-200">
                <span className="text-[10px] font-mono text-stone-500">{getT('span', lang)}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-mono text-stone-900 font-semibold">
                    {columnSpan.toFixed(1)} × {columnSpan.toFixed(1)} {getT('metersUnit', lang)}
                  </span>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setColumnSpan((s) => Math.min(12, Number((s + 0.6).toFixed(1))))}
                      className="text-stone-400 hover:text-stone-800 leading-none text-xs"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => setColumnSpan((s) => Math.max(3.6, Number((s - 0.6).toFixed(1))))}
                      className="text-stone-400 hover:text-stone-800 leading-none text-xs"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-2.5 rounded-md bg-white border border-stone-200">
              <span className="text-[10px] font-mono text-stone-500">{getT('isolation', lang)}</span>
              <div className="mt-1 flex flex-col gap-1">
                <select
                  value={isolation}
                  onChange={(e) => setIsolation(e.target.value as IsolationType)}
                  className="text-xs font-semibold text-stone-900 bg-stone-50 border border-stone-200 rounded p-1.5 focus:border-stone-900 focus:outline-none"
                >
                  <option value="LRB-800">{getT('isolationOptLRB', lang)}</option>
                  <option value="friction-pendulum">{getT('isolationOptFPS', lang)}</option>
                  <option value="viscous-damper">{getT('isolationOptFVD', lang)}</option>
                  <option value="none">{getT('isolationOptNone', lang)}</option>
                </select>
                <span className="text-[10px] font-mono text-sage-800 font-medium">
                  {isolation !== 'none' ? getT('isolationShearNorm', lang) : getT('isolationRigidWarning', lang)}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER VIEWPORT: Minimalist Architectural Canvas & 3D Twin */}
        <main className="relative flex flex-col justify-between overflow-hidden bg-stone-100/60 min-h-[640px] select-none border-x xl:border-x-0">
          {/* Architectural Dot Matrix / Drawing Board Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#c7c3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Top Viewport HUD Readouts */}
          <div className="relative z-10 flex items-center justify-between p-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="flex flex-col p-2.5 px-3 rounded-md bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-2xs pointer-events-auto">
                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500">
                  {lang === 'KZ' ? '3D ЦИФРЛЫҚ ЕГІЗ // ГИДРАВЛИКАЛЫҚ СТЕНД' : lang === 'EN' ? '3D DIGITAL TWIN // HYDRAULIC BENCH' : '3D ЦИФРОВОЙ ДВОЙНИК // ГИДРОСТЕНД'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-terracotta-600 animate-ping' : 'bg-sage-600'}`}></span>
                  <span className="text-xs font-mono text-stone-800 font-semibold">
                    {isSimulating ? getT('benchPlatformSimulating', lang) : getT('benchPlatformReady', lang)}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-stone-500 bg-stone-50/80 px-2 py-1 rounded border border-stone-200/60">
                <span>{lang === 'KZ' ? 'ТОР: 1000мм' : lang === 'EN' ? 'GRID: 1000mm' : 'СЕТКА: 1000мм'}</span>
                <span>•</span>
                <span>{lang === 'KZ' ? 'ӨС: X+ (ШЫҒЫС), Y+ (СОЛТҮСТІК), Z+ (ЗЕНИТ)' : lang === 'EN' ? 'AXIS: X+ (EAST), Y+ (NORTH), Z+ (ZENITH)' : 'ОСИ: X+ (ВОСТОК), Y+ (СЕВЕР), Z+ (ЗЕНИТ)'}</span>
              </div>
            </div>

            {/* Viewport Overlay Tools */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={() => setExplodePercent(0)}
                className="p-1.5 rounded bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 shadow-2xs transition-colors"
                title={getT('resetExplode', lang)}
              >
                <span className="material-symbols-outlined text-base">filter_center_focus</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDeformationGrid(!showDeformationGrid)}
                className={`p-1.5 rounded border shadow-2xs transition-colors ${
                  showDeformationGrid ? 'bg-stone-900 text-white border-stone-900' : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
                }`}
                title={getT('deformationGrid', lang)}
              >
                <span className="material-symbols-outlined text-base">grid_4x4</span>
              </button>
              <button
                type="button"
                onClick={() => setShowStressHeatmap(!showStressHeatmap)}
                className={`p-1.5 rounded border shadow-2xs transition-colors ${
                  showStressHeatmap ? 'bg-terracotta-700 text-white border-terracotta-700' : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
                }`}
                title={getT('stressHeatmap', lang)}
              >
                <span className="material-symbols-outlined text-base">thermostat</span>
              </button>
            </div>
          </div>

          {/* Architectural SVG Twin Projection Canvas */}
          <div className="relative z-0 flex-1 flex items-center justify-center p-4">
            <TwinSvgCanvas
              archetype={archetype}
              floors={floors}
              columnSpan={columnSpan}
              isolation={isolation}
              explodePercent={explodePercent}
              layers={layers}
              projection={projection}
              isSimulating={isSimulating}
              intensityMsk={intensityMsk}
              resilience={resilience}
              showDeformationGrid={showDeformationGrid}
              showStressHeatmap={showStressHeatmap}
              simTimeSec={simTimeSec}
              lang={lang}
            />
          </div>

          {/* Bottom Floating Simulation HUD Control Dock */}
          <div className="relative z-20 w-full px-4 pb-4 flex justify-center">
            <div className="w-full max-w-4xl p-3.5 rounded-lg bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Intensity Scrubber */}
              <div className="flex flex-col w-full md:w-64 gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                    {getT('intensity', lang)}
                  </span>
                  <span className="text-xs font-mono text-terracotta-700 font-bold">
                    {intensityMsk.toFixed(1)} {getT('pointsUnit', lang)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="110"
                  value={Math.round(intensityMsk * 10)}
                  onChange={(e) => setIntensityMsk(Number(e.target.value) / 10)}
                  className="w-full h-1.5 bg-stone-200 rounded appearance-none cursor-pointer accent-terracotta-700"
                />
                <div className="flex justify-between text-[9px] font-mono text-stone-500">
                  <span>{getT('intensityPerceptible', lang)}</span>
                  <span className="text-terracotta-700 font-semibold">{getT('intensityDestructive', lang)}</span>
                  <span>{getT('intensityCatastrophic', lang)}</span>
                </div>
              </div>

              {/* Soil Category Selector (СП РК 2.03-2017) */}
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                  {getT('soil', lang)}
                </span>
                <div className="flex items-center bg-stone-100 p-0.5 rounded border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSoil('I')}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors rounded ${
                      soil === 'I'
                        ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {getT('soilCategory1', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSoil('II')}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors rounded ${
                      soil === 'II'
                        ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {getT('soilCategory2', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSoil('III')}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors rounded ${
                      soil === 'III'
                        ? 'font-semibold text-stone-50 bg-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {getT('soilCategory3', lang)}
                  </button>
                </div>
              </div>

              {/* Simulation Triggers */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded font-medium text-xs tracking-wide transition-all shadow-xs active:scale-98 ${
                    isSimulating
                      ? 'bg-stone-900 hover:bg-black text-stone-50'
                      : 'bg-terracotta-700 hover:bg-terracotta-800 text-stone-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isSimulating ? 'stop' : 'play_arrow'}
                  </span>
                  <span>
                    {isSimulating ? getT('stopTest', lang) : `${getT('runTest', lang)} ${intensityMsk.toFixed(1)}g`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEvacModalOpen(true)}
                  className="flex items-center justify-center p-2 rounded bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-stone-200 transition-colors"
                  title={getT('evacuationSim', lang)}
                >
                  <span className="material-symbols-outlined text-base text-stone-600">directions_run</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT RAIL: Analytics & Structural Health */}
        <aside className="flex flex-col bg-stone-50 border-l border-stone-200/80 overflow-y-auto p-4 gap-4">
          {/* Card 1: Resilience Index & Safety Grade */}
          <div className="flex flex-col p-3.5 rounded-md bg-white border border-stone-200 gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('resilienceIndex', lang)}
              </span>
              <span
                className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  resilience.grade === 'GRADE A'
                    ? 'bg-sage-50 text-sage-800 border-sage-200'
                    : resilience.grade === 'GRADE B'
                    ? 'bg-stone-100 text-stone-800 border-stone-300'
                    : 'bg-terracotta-50 text-terracotta-700 border-terracotta-200'
                }`}
              >
                {resilience.grade}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight text-stone-900">
                  {resilience.score}
                </span>
                <span className="text-sm font-medium text-stone-400">/100</span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-xs font-mono font-semibold ${
                    resilience.isSafe ? 'text-sage-800' : 'text-terracotta-700'
                  }`}
                >
                  {getT('willWithstand', lang)} {resilience.survivableMagnitude} {getT('pointsUnit', lang)[0]}.
                </span>
                <span className="text-[10px] text-stone-500">
                  {resilience.isSafe ? getT('categorySafe', lang) : getT('categoryCritical', lang)}
                </span>
              </div>
            </div>

            {/* Structural Progress Bar */}
            <div className="w-full h-1 bg-stone-200 rounded overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  resilience.score >= 80 ? 'bg-stone-900' : resilience.score >= 60 ? 'bg-amber-600' : 'bg-terracotta-700'
                }`}
                style={{ width: `${resilience.score}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 mt-1 border-t border-stone-150">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-stone-500">
                  {getT('residualResource', lang)}
                </span>
                <span className="text-xs font-mono text-stone-900 font-semibold mt-0.5">
                  {resilience.residualResourcePercent}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-stone-500">
                  {getT('interstoryDrift', lang)}
                </span>
                <span className="text-xs font-mono text-stone-900 font-semibold mt-0.5">
                  {resilience.interstoryDriftPercent}%{' '}
                  <span className="text-stone-400 font-normal">(&lt;1.5%)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Live Seismic Waveform / Accelerogram */}
          <div className="flex flex-col p-3.5 rounded-md bg-white border border-stone-200 gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('waveformTitle', lang)}
              </span>
              <span className="text-[10px] font-mono text-terracotta-700 font-medium">
                {isSimulating ? getT('simulatingLive', lang) : getT('liveRate', lang)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>PGA: <strong className="text-stone-800 font-semibold">{(0.04 * Math.pow(1.9, intensityMsk - 5.0)).toFixed(2)} g</strong></span>
              <span>Δx: <strong className="text-stone-800 font-semibold">{resilience.maxDisplacementMm} {lang === 'EN' ? 'cm' : 'см'}</strong></span>
              <span>T_fund: <strong className="text-stone-800 font-semibold">{archetype.fundamentalPeriodSec} {lang === 'EN' ? 's' : 'c'}</strong></span>
            </div>

            {/* Waveform Canvas */}
            <div className="relative w-full h-24 bg-stone-50 rounded border border-stone-200 overflow-hidden flex items-center mt-1">
              {/* Threshold Grids */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-40">
                <div className="border-b border-dashed border-stone-300 w-full"></div>
                <div className="border-b border-stone-200 w-full"></div>
                <div className="border-b border-dashed border-stone-300 w-full"></div>
              </div>

              {/* P and S wave phase indicators */}
              <div className="absolute left-6 top-1 text-[9px] font-mono text-stone-500">{getT('pWaveLabel', lang)}</div>
              <div className="absolute left-28 top-1 text-[9px] font-mono text-terracotta-700">{getT('sWaveLabel', lang)}</div>

              {/* Crisp vector seismogram in warm charcoal */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 80">
                <path
                  d={`M 0,40 L 25,40 L 30,${40 - (isSimulating ? Math.sin(simTimeSec * 4) * 12 : 3)} L 35,${40 + (isSimulating ? Math.cos(simTimeSec * 5) * 14 : 3)} L 40,40 L 45,41 L 50,38 L 55,42 L 60,40 L 70,40 L 75,32 L 80,48 L 85,28 L 90,52 L 95,35 L 100,45 L 110,40 L 120,40 L 125,18 L 130,64 L 135,12 L 140,70 L 145,15 L 150,62 L 155,24 L 160,54 L 165,30 L 170,49 L 180,36 L 190,44 L 200,38 L 220,42 L 240,40 L 270,40 L 300,40`}
                  fill="none"
                  stroke="#292524"
                  strokeLinecap="round"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Needle Scrubber */}
              <div
                className="absolute top-0 bottom-0 w-px bg-terracotta-600 transition-all duration-75"
                style={{
                  left: isSimulating ? `${((simTimeSec % 30) / 30) * 100}%` : '55%',
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>0.00 {lang === 'EN' ? 's' : 'c'}</span>
              <span className="text-stone-800 font-semibold">
                T = {isSimulating ? (simTimeSec % 30).toFixed(2) : '16.42'} {lang === 'EN' ? 's' : 'c'}
              </span>
              <span>30.00 {lang === 'EN' ? 's' : 'c'}</span>
            </div>
          </div>

          {/* Card 3: Finite Element Stress Analysis (FEA Table) */}
          <div className="flex flex-col p-3.5 rounded-md bg-white border border-stone-200 gap-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('feaTitle', lang)}
              </span>
              <span className="text-[10px] font-mono text-stone-400">FEA/МКЭ</span>
            </div>

            <div className="flex flex-col divide-y divide-stone-150 text-xs">
              {feaRows.map((row, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-stone-800">
                      {lang === 'KZ' ? row.elementKz : lang === 'EN' ? row.elementEn : row.element}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {lang === 'KZ' ? row.stressTypeKz : lang === 'EN' ? row.stressTypeEn : row.stressType}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`font-mono text-xs font-semibold ${row.status === 'danger' ? 'text-terracotta-700' : 'text-stone-900'}`}>
                      {row.stressMpa} {index === 3 ? '%' : 'МПа'}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        row.status === 'safe'
                          ? 'text-sage-800'
                          : row.status === 'warning'
                          ? 'text-amber-700'
                          : 'text-terracotta-700'
                      }`}
                    >
                      {lang === 'KZ' ? row.statusTextKz : lang === 'EN' ? row.statusTextEn : row.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Audit Note */}
          <div className="p-3 rounded-md bg-stone-100/70 border border-stone-200 flex items-start gap-2.5 mt-auto">
            <span className="material-symbols-outlined text-base text-stone-500 shrink-0 mt-0.5">
              verified_user
            </span>
            <span className="text-[10px] text-stone-600 leading-relaxed">
              {getT('auditComplianceNote', lang)}
            </span>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <EvacuationModal
        isOpen={isEvacModalOpen}
        onClose={() => setIsEvacModalOpen(false)}
        floors={floors}
        buildingName={lang === 'KZ' ? archetype.nameKz : lang === 'EN' ? archetype.nameEn : archetype.name}
        lang={lang}
      />

      <ExportModal
        isOpen={exportModalType !== null}
        onClose={() => setExportModalType(null)}
        exportType={exportModalType || '4k'}
        buildingName={lang === 'KZ' ? archetype.nameKz : lang === 'EN' ? archetype.nameEn : archetype.name}
        lang={lang}
      />

      <JsonConfigModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        config={fullConfigJson}
      />
    </div>
  );
};
