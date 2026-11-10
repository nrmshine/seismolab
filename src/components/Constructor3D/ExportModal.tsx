import React, { useState } from 'react';
import { Language } from '../../types.js';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportType: '4k' | 'ifc';
  buildingName: string;
  lang: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  exportType,
  buildingName,
  lang,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);

      // Create download blob
      const content =
        exportType === 'ifc'
          ? `ISO-10303-21;\nHEADER;\nFILE_DESCRIPTION(('SeismoLab KazNIISA BIM Export'),'2;1');\nFILE_NAME('${buildingName}.ifc','2026-11-10T12:00:00',('Dr. Zhumabayeva'),('KazNIISA'),'SeismoLab IFC Generator','SeismoLab 4.2','');\nENDSEC;\nDATA;\n#1=IFCPROJECT('1xS3BCk291UvhgP2dvN$Ys',#2,'${buildingName}',$,$,$,$,(#20),#7);\n#2=IFCOWNERHISTORY(#3,#4,$,.ADDED.,$,$,$,1700000000);\n#10=IFCBUILDING('39t4puX518Tvh1$dvN$Ys',#2,'Building A',$,$,#11,$,'Building',.ELEMENT.,$,$,$);\nENDSEC;\nEND-ISO-10303-21;\n`
          : 'SEISMOLAB_4K_RENDER_CANVAS_DATA_METADATA_TIMESTAMP_2026';

      const blob = new Blob([content], {
        type: exportType === 'ifc' ? 'application/x-step' : 'text/plain',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportType === 'ifc' ? `${buildingName.replace(/\s+/g, '_')}.ifc` : `${buildingName.replace(/\s+/g, '_')}_4K_Snapshot.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-lg border border-stone-200 p-5 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-terracotta-700">
              {exportType === '4k' ? 'photo_camera' : 'download'}
            </span>
            <span className="font-bold text-sm text-stone-900">
              {exportType === '4k'
                ? (lang === 'KZ' ? 'Цифрлық егіздің 4K суретін экспорттау' : lang === 'EN' ? 'Export 4K Digital Twin Snapshot' : 'Экспорт 4K Снимка Цифрового Двойника')
                : (lang === 'KZ' ? 'BIM үлгісін экспорттау (IFC / GLB)' : lang === 'EN' ? 'Export BIM Model (IFC / GLB)' : 'Экспорт BIM Модели (IFC / GLB)')}
            </span>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-stone-150 text-stone-500">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-4 rounded bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
          <div className="flex justify-between font-mono">
            <span className="text-stone-500">{lang === 'KZ' ? 'ФАЙЛ:' : lang === 'EN' ? 'FILE:' : 'ФАЙЛ:'}</span>
            <span className="font-semibold">{buildingName}.{exportType === 'ifc' ? 'ifc' : 'png'}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="text-stone-500">{lang === 'KZ' ? 'СПЕЦИФИКАЦИЯ:' : lang === 'EN' ? 'SPECIFICATION:' : 'СПЕЦИФИКАЦИЯ:'}</span>
            <span>{exportType === 'ifc' ? 'IFC4 / buildingSMART Standard' : '3840 × 2160 Ultra-HD Vector'}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="text-stone-500">{lang === 'KZ' ? 'СТАНДАРТ:' : lang === 'EN' ? 'STANDARD:' : 'СТАНДАРТ:'}</span>
            <span className="text-sage-800 font-semibold">{lang === 'KZ' ? 'ҚР ЕЖ 2.03-2017' : 'СП РК 2.03-2017'}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {downloaded ? 'check_circle' : 'download'}
            </span>
            <span>
              {downloading
                ? (lang === 'KZ' ? 'ДАЙЫНДАУДА...' : lang === 'EN' ? 'GENERATING...' : 'ФОРМИРОВАНИЕ...')
                : downloaded
                ? (lang === 'KZ' ? 'СӘТТІ ЖҮКТЕЛДІ' : lang === 'EN' ? 'DOWNLOADED SUCCESSFULLY' : 'СКАЧАНО УСПЕШНО')
                : (lang === 'KZ' ? 'ФАЙЛДЫ ЖҮКТЕУ' : lang === 'EN' ? 'DOWNLOAD FILE' : 'СКАЧАТЬ ФАЙЛ')}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 bg-stone-150 hover:bg-stone-200 text-stone-800 rounded text-xs"
          >
            {lang === 'KZ' ? 'Жабу' : lang === 'EN' ? 'Close' : 'Закрыть'}
          </button>
        </div>
      </div>
    </div>
  );
};
