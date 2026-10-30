import React from 'react';
import { 
  Home, 
  FolderTree, 
  BookOpen, 
  CalendarDays, 
  Gamepad2, 
  Mail, 
  Leaf, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

export type NavCategory = 'home' | 'projects' | 'info' | 'events' | 'game' | 'contact';

interface SidebarProps {
  activeTab: NavCategory;
  onSelectTab: (tab: NavCategory) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  completedGameLevels: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  completedGameLevels
}) => {
  const navItems: { id: NavCategory; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Ana Sayfa', icon: <Home className="w-5 h-5" /> },
    { id: 'projects', label: 'Projelerimiz', icon: <FolderTree className="w-5 h-5" />, badge: '4 Aktif' },
    { id: 'info', label: 'Bilgilendirme', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'events', label: 'Etkinlikler', icon: <CalendarDays className="w-5 h-5" />, badge: 'Yeni' },
    { id: 'game', label: 'Eğitsel Oyunlar', icon: <Gamepad2 className="w-5 h-5 text-amber-500" />, badge: 'Puki İle Oyna' },
    { id: 'contact', label: 'İletişim', icon: <Mail className="w-5 h-5" /> },
  ];

  const handleItemClick = (id: NavCategory) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-emerald-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-emerald-50">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center shrink-0">
              <img 
                src="/public/assets/aistudio/puki_baykus_c089bd51.png" 
                alt="Doğa Kahramanları Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                Doğa Kahramanları
              </h1>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <Leaf className="w-3 h-3" />
                Sosyal Farkındalık
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Menü Navigasyonu
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-600'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : item.id === 'game' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 opacity-50 transition-transform ${isActive ? 'opacity-100 translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Hero Progress Widget at Bottom of Sidebar */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Kahraman Seviyen
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
              {completedGameLevels}/4 Görev
            </span>
          </div>

          <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.max(15, (completedGameLevels / 4) * 100))}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            {completedGameLevels === 0 
              ? 'Eğitsel oyunda seviyeleri tamamlayarak Doğa Rozeti kazan!'
              : completedGameLevels === 4
                ? 'Tebrikler! Doğa Başkahramanı unvanını kazandın!'
                : `${4 - completedGameLevels} görev daha tamamla, altın madalyayı kap!`}
          </p>
        </div>
      </aside>
    </>
  );
};
