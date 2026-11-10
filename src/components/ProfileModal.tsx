import React from 'react';
import { Language } from '../types.js';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-lg border border-stone-200 p-5 shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center font-display font-bold text-stone-800 text-sm border border-stone-300">
              ДЖ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-stone-900">
                {lang === 'KZ' ? 'Д-р Динара Жұмабаева' : lang === 'EN' ? 'Dr. Dinara Zhumabayeva' : 'Д-р Динара Жумабаева'}
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {lang === 'KZ' ? 'Бас сейсмоқұрылымдық инженер • ҚазҚСҒЗИ' : lang === 'EN' ? 'Lead Structural Seismic Engineer • KazNIISA' : 'Ведущий инженер-сейсмолог • КазНИИСА'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-stone-150 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs text-stone-700 leading-relaxed">
          <p>
            {lang === 'KZ'
              ? 'Алматы және Солтүстік Тянь-Шань өңірлерінің 9–10 баллдық сейсмикалық аймақтарындағы ғимараттар мен биік құрылыстарды динамикалық есептеу бойынша 18 жылдық тәжірибесі бар сарапшы.'
              : lang === 'EN'
              ? 'Doctor of Technical Sciences, leading expert in finite element modeling and base isolation systems for high-rise buildings in Tian Shan seismic zone 9-10 (MSK-64).'
              : 'Доктор технических наук, эксперт по расчету высотных зданий на сейсмические воздействия 9–10 баллов по шкале MSK-64, автор методик расчета свинцово-резиновых опор (LRB) для СП РК 2.03-2017.'}
          </p>

          <div className="grid grid-cols-2 gap-2 p-2.5 rounded bg-stone-50 border border-stone-200 font-mono text-[11px]">
            <div className="flex flex-col">
              <span className="text-stone-500">{lang === 'KZ' ? 'СЕРТИФИКАТ' : lang === 'EN' ? 'CERTIFICATE' : 'СЕРТИФИКАТ'}</span>
              <span className="font-semibold text-stone-800">KZ-SEISMO-8842</span>
            </div>
            <div className="flex flex-col">
              <span className="text-stone-500">{lang === 'KZ' ? 'РҰҚСАТ ДӘРЕЖЕСІ' : lang === 'EN' ? 'CLEARANCE' : 'ДОПУСК'}</span>
              <span className="font-semibold text-sage-800">CLASS I (CRITICAL)</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
              {lang === 'KZ' ? 'СОҢҒЫ ТЕКСЕРІСТЕР' : lang === 'EN' ? 'ACTIVE AUDITS' : 'АКТИВНЫЕ ЭКСПЕРТИЗЫ'}
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                <span>Kok-Tobe Tower B-12</span>
                <span className="font-mono text-sage-700 font-semibold">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                <span>ЖК Серия 1-464 (Ретрофит)</span>
                <span className="font-mono text-terracotta-700 font-semibold">IN REVIEW</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-stone-900 text-stone-50 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          {lang === 'KZ' ? 'Жабу' : lang === 'EN' ? 'Close Inspector' : 'Закрыть карточку'}
        </button>
      </div>
    </div>
  );
};
