import React, { useState } from 'react';

interface JsonConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: Record<string, unknown>;
}

export const JsonConfigModal: React.FC<JsonConfigModalProps> = ({ isOpen, onClose, config }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonStr = JSON.stringify(config, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-lg border border-stone-200 p-5 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-stone-700">code</span>
            <span className="font-bold text-sm text-stone-900">JSON Конфигурация Цифрового Двойника</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-stone-150 text-stone-500">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <pre className="p-3 bg-stone-900 text-stone-100 rounded text-[11px] font-mono overflow-auto max-h-80 select-all leading-relaxed">
          {jsonStr}
        </pre>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
            <span>{copied ? 'СКОПИРОВАНО!' : 'СКОПИРОВАТЬ JSON'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 bg-stone-150 hover:bg-stone-200 text-stone-800 rounded text-xs"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
