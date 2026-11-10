import React from 'react';
import { ViewMode, Language } from '../types.js';
import { getT } from '../data/translations.js';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  lang: Language;
  onOpenProfile: () => void;
  projectName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  lang,
  onOpenProfile,
  projectName,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-stone-50 border-r border-stone-200/80 z-50 flex flex-col justify-between py-5">
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="px-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-stone-900 flex items-center justify-center text-stone-50 font-display font-bold text-base shadow-sm">
            S
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold tracking-tight text-stone-900">
                {getT('appTitle', lang)}
              </span>
              <span className="text-[9px] font-mono font-medium px-1 py-0.2 rounded bg-stone-150 text-stone-600">
                v4.2
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              {getT('appSubtitle', lang)}
            </span>
          </div>
        </div>

        {/* Active Project Pill */}
        <div className="px-3">
          <div className="p-3 rounded-md bg-stone-100/70 border border-stone-200/70 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                {getT('activeTwin', lang)}
              </span>
              <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse"></span>
            </div>
            <span className="text-xs font-semibold text-stone-900 truncate">
              {projectName}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono text-terracotta-700">
              <span className="material-symbols-outlined text-xs">graphic_eq</span>
              <span>FREQ: 1.42Hz // NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-0.5 px-3">
          <button
            type="button"
            onClick={() => onViewChange('3d-constructor')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs transition-all text-left ${
              currentView === '3d-constructor'
                ? 'bg-stone-900 text-stone-50 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
            <span>{getT('nav3D', lang)}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('earthquake-map')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs transition-all text-left ${
              currentView === 'earthquake-map'
                ? 'bg-stone-900 text-stone-50 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span>{getT('navMap', lang)}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('disaster-history')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs transition-all text-left ${
              currentView === 'disaster-history'
                ? 'bg-stone-900 text-stone-50 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">history_toggle_off</span>
            <span>{getT('navHistory', lang)}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('materials')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs transition-all text-left ${
              currentView === 'materials'
                ? 'bg-stone-900 text-stone-50 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span>{getT('navMaterials', lang)}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('emergency-112')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium text-xs transition-all text-left ${
              currentView === 'emergency-112'
                ? 'bg-stone-900 text-stone-50 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-150/70'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
            <span>{getT('nav112', lang)}</span>
          </button>
        </nav>
      </div>

      {/* Sidebar Bottom Status & Profile */}
      <div className="px-4 flex flex-col gap-3">
        <div className="space-y-1.5 text-[10px] font-mono border-t border-stone-200/80 pt-3">
          <div className="flex items-center justify-between text-stone-500">
            <span>{getT('tectonicDrift', lang)}</span>
            <span className="text-stone-800 font-medium">+0.04mm/yr</span>
          </div>
          <div className="flex items-center justify-between text-stone-500">
            <span>{getT('seismicRisk', lang)}</span>
            <span className="text-terracotta-700 font-semibold">{getT('moderateRisk', lang)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProfile}
          className="pt-2 border-t border-stone-200/80 flex items-center gap-2.5 text-left w-full hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-display text-xs font-semibold text-stone-800 border border-stone-300 shrink-0">
            ДЖ
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-stone-900 truncate">
              {lang === 'KZ' ? 'Д-р Жұмабаева' : lang === 'EN' ? 'Dr. Zhumabayeva' : 'Д-р Жумабаева'}
            </span>
            <span className="text-[10px] text-stone-500 truncate">{getT('leadEng', lang)}</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
