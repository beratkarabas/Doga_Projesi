import React, { useState } from 'react';
import { Menu, X, Gamepad2, Sparkles, Leaf, Share2, Compass } from 'lucide-react';
import { Sidebar, NavCategory } from './components/Sidebar';
import { ClockAndCalendar } from './components/ClockAndCalendar';
import { InspiringQuotes } from './components/InspiringQuotes';
import { DailyEcoChallenge } from './components/DailyEcoChallenge';
import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { InfoView } from './components/views/InfoView';
import { EventsView } from './components/views/EventsView';
import { ContactView } from './components/views/ContactView';
import { NatureGame } from './components/NatureGame';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavCategory>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [completedGameLevels, setCompletedGameLevels] = useState<number>(0);

  const handleLevelComplete = (lvl: number) => {
    setCompletedGameLevels((prev) => Math.max(prev, lvl));
  };

  return (
    <div className="min-h-screen bg-[#f4f8f4] text-slate-800 flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Mobile Bar (Visible on mobile & tablet) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/public/assets/aistudio/puki_baykus_c089bd51.png" 
              alt="Puki" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-display font-bold text-sm text-slate-900">Doğa Kahramanları</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('game')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-900 text-xs font-bold shadow-xs cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Oyun</span>
        </button>
      </header>

      {/* Main Layout: 3 Columns on Large Screens */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        {/* 1. SOL MENÜ (Navigasyon) */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          completedGameLevels={completedGameLevels}
        />

        {/* 2. ORTA BÖLÜM (Ana İçerik - Canlı ve Estetik) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header Bar within Middle Section for Desktop */}
          <div className="hidden lg:flex items-center justify-between pb-6 mb-6 border-b border-emerald-100/70">
            <div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mb-1">
                <Leaf className="w-3.5 h-3.5" />
                <span>Doğa Kahramanları & Sosyal Farkındalık Platformu</span>
              </div>
              <h1 className="text-2xl font-black font-display text-slate-900 tracking-tight">
                {activeTab === 'home' && 'Hoş Geldiniz, Geleceği Birlikte Yeşertelim'}
                {activeTab === 'projects' && 'Ekolojik Değişim ve Sürdürülebilirlik Projeleri'}
                {activeTab === 'info' && 'Çevre Eğitimi ve Sıfır Atık Bilgi Merkezi'}
                {activeTab === 'events' && 'Gönüllü Çevre Etkinlikleri ve Doğa Takvimi'}
                {activeTab === 'game' && 'Eğitsel Çevre Oyunu: Puki ile Doğayı Kurtar'}
                {activeTab === 'contact' && 'Gönüllülük Başvurusu ve İletişim'}
              </h1>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('game')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  activeTab === 'game' 
                    ? 'bg-emerald-700 text-white shadow-emerald-700/20' 
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-900'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Mini Oyunu Oyna</span>
              </button>
            </div>
          </div>

          {/* Dynamic Content Panels based on Active Tab */}
          <div className="transition-all duration-200">
            {activeTab === 'home' && (
              <HomeView 
                onNavigate={setActiveTab} 
                completedGameLevels={completedGameLevels} 
              />
            )}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'info' && <InfoView />}
            {activeTab === 'events' && <EventsView />}
            {activeTab === 'game' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <NatureGame onLevelCompleteGlobal={handleLevelComplete} />
              </div>
            )}
            {activeTab === 'contact' && <ContactView />}
          </div>
        </main>

        {/* 3. SAĞ BÖLÜM (Zaman, Takvim ve İlham Veren Sözler) */}
        <aside className="hidden xl:flex flex-col gap-6 w-80 2xl:w-88 p-6 pl-0 shrink-0">
          {/* SAĞ ÜST KÖŞE (Zaman ve Takvim Bileşeni) */}
          <ClockAndCalendar />

          {/* SAĞ BÖLÜM (İlham Veren Sözler Paneli) */}
          <InspiringQuotes />

          {/* Günün Eko Görevleri Mini Paneli */}
          <DailyEcoChallenge />

          {/* Doğa İpucu Rozet Kutusu */}
          <div className="rounded-2xl p-4 bg-gradient-to-tr from-amber-50 to-orange-50 border border-amber-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-900 block leading-tight">
                Her Gün 1 Yeşil Adım
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Plastik atıkları ayrıştırarak deniz kaplumbağalarını koruyabilirsin.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Global Compact Footer */}
      <footer className="bg-white border-t border-emerald-100 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Doğa Kahramanları & Sosyal Farkındalık Platformu © 2026</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Temiz Çevre · Sıfır Atık · Biyoçeşitlilik · Puki Eğitim Projesi
        </div>
      </footer>
    </div>
  );
}
