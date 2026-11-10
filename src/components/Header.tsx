import React from 'react';
import { Language, ViewMode } from '../types.js';
import { getT } from '../data/translations.js';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateTo112: () => void;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onNavigateTo112,
  onToggleMobileNav,
}) => {
  return (
    <header className="fixed top-0 left-0 xl:left-64 right-0 h-14 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileNav && (
          <button
            type="button"
            onClick={onToggleMobileNav}
            className="xl:hidden p-1.5 rounded hover:bg-stone-200/70 text-stone-700 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        )}

        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-stone-200/70">
          <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase text-sage-800 font-semibold tracking-wider">
            {getT('liveTelemetry', lang)}
          </span>
          <span className="text-stone-400 hidden sm:inline">•</span>
          <span className="text-[10px] font-mono uppercase text-stone-700 font-medium hidden sm:inline">
            {getT('almatySector', lang)}
          </span>
        </div>

        <span className="text-[11px] font-mono text-stone-500 hidden md:inline">
          {getT('stationInfo', lang)}
        </span>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Language Switcher */}
        <div className="flex items-center rounded bg-stone-100 p-0.5 border border-stone-200/80">
          {(['KZ', 'RU', 'EN'] as Language[]).map((l, index) => (
            <React.Fragment key={l}>
              {index > 0 && <span className="w-px h-2.5 bg-stone-300"></span>}
              <button
                type="button"
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase transition-colors rounded ${
                  lang === l
                    ? 'text-stone-900 font-semibold bg-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {l}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* SOS 112 Button */}
        <button
          type="button"
          onClick={onNavigateTo112}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-800 text-[11px] font-mono font-medium transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600 animate-ping"></span>
          <span>112 SOS</span>
        </button>
      </div>
    </header>
  );
};
