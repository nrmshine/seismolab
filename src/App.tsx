import React, { useState, useEffect } from 'react';
import { ViewMode, Language } from './types.js';
import { Sidebar } from './components/Sidebar.js';
import { Header } from './components/Header.js';
import { ProfileModal } from './components/ProfileModal.js';
import { ConstructorView } from './components/Constructor3D/ConstructorView.js';
import { EarthquakeMapView } from './components/EarthquakeMap/EarthquakeMapView.js';
import { DisasterHistoryView } from './components/DisasterHistory/DisasterHistoryView.js';
import { MaterialsView } from './components/Materials/MaterialsView.js';
import { Emergency112View } from './components/Emergency112/Emergency112View.js';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('3d-constructor');
  const [lang, setLang] = useState<Language>('RU');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [activeArchetypeName, setActiveArchetypeName] = useState<string>('Kok-Tobe Tower B-12');

  // Check URL query params for initial route / autostart
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ViewMode | null;
    if (viewParam && ['3d-constructor', 'earthquake-map', 'disaster-history', 'materials', 'emergency-112'].includes(viewParam)) {
      setCurrentView(viewParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-75 text-stone-900 font-sans selection:bg-terracotta-100 selection:text-terracotta-800">
      {/* Sidebar Desktop */}
      <div className="hidden xl:block">
        <Sidebar
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setIsMobileNavOpen(false);
          }}
          lang={lang}
          onOpenProfile={() => setIsProfileOpen(true)}
          projectName={activeArchetypeName}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileNavOpen(false)}
          ></div>
          <div className="relative w-64 h-full bg-stone-50 z-50">
            <Sidebar
              currentView={currentView}
              onViewChange={(view) => {
                setCurrentView(view);
                setIsMobileNavOpen(false);
              }}
              lang={lang}
              onOpenProfile={() => {
                setIsMobileNavOpen(false);
                setIsProfileOpen(true);
              }}
              projectName={activeArchetypeName}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="xl:pl-64">
        {/* Header Telemetry Bar */}
        <Header
          lang={lang}
          onLanguageChange={setLang}
          onNavigateTo112={() => setCurrentView('emergency-112')}
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />

        {/* View Switching Container */}
        <main className="pt-14">
          {currentView === '3d-constructor' && (
            <ConstructorView lang={lang} onArchetypeChange={setActiveArchetypeName} />
          )}
          {currentView === 'earthquake-map' && <EarthquakeMapView lang={lang} />}
          {currentView === 'disaster-history' && <DisasterHistoryView lang={lang} />}
          {currentView === 'materials' && <MaterialsView lang={lang} />}
          {currentView === 'emergency-112' && <Emergency112View lang={lang} />}
        </main>
      </div>

      {/* Lead Engineer Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        lang={lang}
      />
    </div>
  );
}
