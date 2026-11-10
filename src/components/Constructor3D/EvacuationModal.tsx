import React, { useState, useEffect } from 'react';
import { Language } from '../../types.js';
import { calculateEvacuation } from '../../utils/seismicCalculations.js';

interface EvacuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  floors: number;
  buildingName: string;
  lang: Language;
}

export const EvacuationModal: React.FC<EvacuationModalProps> = ({
  isOpen,
  onClose,
  floors,
  buildingName,
  lang,
}) => {
  const [occupantsPerFloor, setOccupantsPerFloor] = useState(28);
  const [stairwellWidth, setStairwellWidth] = useState(1.35);
  const [isElevatorBlocked, setIsElevatorBlocked] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const evac = calculateEvacuation(floors, occupantsPerFloor, stairwellWidth);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simulationRunning) {
      interval = setInterval(() => {
        setElapsedSec((prev) => {
          if (prev >= evac.totalSeconds) {
            setSimulationRunning(false);
            return evac.totalSeconds;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, evac.totalSeconds]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((elapsedSec / evac.totalSeconds) * 100));
  const evacuatedCount = Math.round((progressPercent / 100) * evac.totalOccupants);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-lg border border-stone-200 p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-terracotta-700 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-base">directions_run</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                {lang === 'KZ' ? 'Эвакуация жолдарын модельдеу' : lang === 'EN' ? 'Emergency Evacuation Simulation' : 'Трассировка путей эвакуации жильцов'}
              </h2>
              <span className="text-[11px] font-mono text-stone-500">{buildingName} ({floors} эт.)</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-stone-150 text-stone-500 hover:text-stone-800"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded bg-stone-50 border border-stone-200 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-stone-500">
              {lang === 'KZ' ? 'Адам саны / қабат' : lang === 'EN' ? 'People / Floor' : 'Жильцов на этаж'}
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">
                {occupantsPerFloor} {lang === 'KZ' ? 'адам' : lang === 'EN' ? 'people' : 'чел.'}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setOccupantsPerFloor(Math.max(10, occupantsPerFloor - 5))}
                  className="w-6 h-6 rounded bg-white border border-stone-300 text-xs font-mono"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setOccupantsPerFloor(Math.min(80, occupantsPerFloor + 5))}
                  className="w-6 h-6 rounded bg-white border border-stone-300 text-xs font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-stone-50 border border-stone-200 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-stone-500">
              {lang === 'KZ' ? 'Баспалдақ ені' : lang === 'EN' ? 'Stairwell Width' : 'Ширина лестниц'}
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold">{stairwellWidth.toFixed(2)} {lang === 'EN' ? 'm' : 'м'}</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setStairwellWidth(Math.max(1.05, Number((stairwellWidth - 0.15).toFixed(2))))}
                  className="w-6 h-6 rounded bg-white border border-stone-300 text-xs font-mono"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setStairwellWidth(Math.min(2.5, Number((stairwellWidth + 0.15).toFixed(2))))}
                  className="w-6 h-6 rounded bg-white border border-stone-300 text-xs font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-stone-50 border border-stone-200 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-stone-500">
              {lang === 'KZ' ? 'Лифттер жағдайы' : lang === 'EN' ? 'Elevators Status' : 'Блокировка лифтов'}
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-semibold text-terracotta-700">
                {lang === 'KZ' ? 'АЖЫРАТЫЛҒАН (ТЖ)' : lang === 'EN' ? 'DISABLED (EMERGENCY)' : 'ОТКЛЮЧЕНЫ (ЧС)'}
              </span>
              <input
                type="checkbox"
                checked={isElevatorBlocked}
                onChange={(e) => setIsElevatorBlocked(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
              />
            </div>
          </div>
        </div>

        {/* Live Simulation Progress */}
        <div className="p-4 rounded bg-stone-50 border border-stone-200 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-stone-600">
              {lang === 'KZ' ? 'Эвакуацияланған' : lang === 'EN' ? 'Evacuated' : 'Эвакуировано'}: <strong>{evacuatedCount} / {evac.totalOccupants} {lang === 'KZ' ? 'адам' : lang === 'EN' ? 'people' : 'чел.'}</strong>
            </span>
            <span className="font-mono font-semibold text-stone-900">
              {progressPercent}% // {Math.floor(elapsedSec / 60)}:{(elapsedSec % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="w-full h-3 bg-stone-200 rounded overflow-hidden">
            <div
              className="h-full bg-terracotta-700 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Floor-by-floor visual stack */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 mt-2">
            {Array.from({ length: floors }).map((_, i) => {
              const floorNum = floors - i;
              const isBottleneck = floorNum === evac.bottleneckFloor;
              const isCleared = (evacuatedCount / evac.totalOccupants) >= (i / floors);
              return (
                <div
                  key={floorNum}
                  className={`p-1.5 rounded text-center border font-mono text-[10px] ${
                    isBottleneck
                      ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                      : isCleared
                      ? 'bg-sage-100 border-sage-300 text-sage-900'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                  title={isBottleneck ? (lang === 'KZ' ? 'Сын сағатындағы ағынның тарылуы (тар мойын)' : lang === 'EN' ? 'Critical flow bottleneck' : 'Критическое сужение потока (бутылочное горлышко)') : (lang === 'KZ' ? `${floorNum}-қабат` : lang === 'EN' ? `Floor ${floorNum}` : `Этаж ${floorNum}`)}
                >
                  {lang === 'KZ' ? `${floorNum}-қ` : lang === 'EN' ? `FL ${floorNum}` : `эт.${floorNum}`}
                </div>
              );
            })}
          </div>
        </div>

        {/* Results summary */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-stone-100/70 rounded border border-stone-200 text-xs">
          <div>
            <span className="text-stone-500 font-mono text-[10px] block">
              {lang === 'KZ' ? 'ТОЛЫҚ ЭВАКУАЦИЯ УАҚЫТЫ' : lang === 'EN' ? 'TOTAL EGRESS TIME' : 'РАСЧЕТНОЕ ВРЕМЯ ЭВАКУАЦИИ'}
            </span>
            <span className="font-bold text-sm text-stone-900">{evac.formattedTime}</span>
          </div>
          <div>
            <span className="text-stone-500 font-mono text-[10px] block">
              {lang === 'KZ' ? 'НОРМАТИВ ҚР ЕЖ' : lang === 'EN' ? 'REGULATORY CODE' : 'НОРМАТИВ СП РК'}
            </span>
            <span className={`font-semibold ${evac.isWithinNorm ? 'text-sage-800' : 'text-terracotta-700'}`}>
              {evac.isWithinNorm ? (lang === 'KZ' ? 'НОРМАДА (<6 минут)' : lang === 'EN' ? 'WITHIN LIMIT (<6 min)' : 'В НОРМЕ (<6 минут)') : (lang === 'KZ' ? 'НОРМАДАН АСЫП КЕТТІ' : lang === 'EN' ? 'EXCEEDS LIMIT' : 'ПРЕВЫШЕНИЕ НОРМЫ')}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex gap-2 justify-end pt-2">
          <button
            type="button"
            onClick={() => {
              setElapsedSec(0);
              setSimulationRunning(true);
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            <span>
              {simulationRunning
                ? (lang === 'KZ' ? 'ТЕСТТІ ҚАЙТА ҚОСУ' : lang === 'EN' ? 'RESTART SIMULATION' : 'ПЕРЕЗАПУСТИТЬ ТЕСТ')
                : (lang === 'KZ' ? 'СИМУЛЯЦИЯНЫ БАСТАУ' : lang === 'EN' ? 'START SIMULATION' : 'ЗАПУСТИТЬ СИМУЛЯЦИЮ')}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded transition-colors"
          >
            {lang === 'KZ' ? 'Жабу' : lang === 'EN' ? 'Close' : 'Закрыть'}
          </button>
        </div>
      </div>
    </div>
  );
};
