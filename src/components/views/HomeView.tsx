import React from 'react';
import { 
  Trees, 
  Recycle, 
  Droplets, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Gamepad2, 
  CheckCircle, 
  ShieldCheck,
  Award,
  Leaf,
  Globe2
} from 'lucide-react';
import { NavCategory } from '../Sidebar';

interface HomeViewProps {
  onNavigate: (tab: NavCategory) => void;
  completedGameLevels: number;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, completedGameLevels }) => {
  const impactStats = [
    { label: 'Dönüştürülen Atık', value: '14.850', unit: 'kg', icon: <Recycle className="w-5 h-5 text-emerald-600" /> },
    { label: 'Toprakla Buluşan Fidan', value: '5.420', unit: 'adet', icon: <Trees className="w-5 h-5 text-emerald-600" /> },
    { label: 'Tasarruf Edilen Su', value: '92.400', unit: 'Litre', icon: <Droplets className="w-5 h-5 text-sky-600" /> },
    { label: 'Aktif Doğa Gönüllüsü', value: '1.280', unit: 'kişi', icon: <Users className="w-5 h-5 text-amber-600" /> },
  ];

  const featuredCards = [
    {
      title: 'Okullarda Sıfır Atık Seferberliği',
      desc: 'Öğrencilerle birlikte okul bahçelerinde kompost alanları kuruyor ve ayrıştırma atölyeleri düzenliyoruz.',
      category: 'Eğitim & Ekoloji',
      image: '/public/assets/aistudio/yeseren_agac_406d06ac.png',
      badge: 'Aktif Proje',
      tab: 'projects' as NavCategory
    },
    {
      title: 'Kıyı ve Su Havzaları Temizliği',
      desc: 'Göllerimizi, derelerimizi ve denizlerimizi tek kullanımlık plastik atıklardan arındırarak canlılara nefes oluyoruz.',
      category: 'Mavi Gezegen',
      image: '/public/assets/aistudio/cop_plastik_d7390b91.png',
      badge: 'Bu Hafta Sonu',
      tab: 'events' as NavCategory
    },
    {
      title: 'Doğru Atık Ayrıştırma Rehberi',
      desc: 'Hangi atık mavi kutuya, hangisi yeşil kutuya atılmalı? 5 temel kategoride evde geri dönüşüm rehberi.',
      category: 'Rehber & Bilinç',
      image: '/public/assets/aistudio/yesil_kutu_3a1b4c80.png',
      badge: 'Öğren & Uygula',
      tab: 'info' as NavCategory
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white overflow-hidden shadow-lg p-6 sm:p-10 border border-emerald-600/30">
        {/* Decorative circle glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-emerald-100 text-xs font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Geleceğe Birlikte Yeşil Bir İz Bırakalım</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
              Doğanın Kahramanı Olmaya Hazır Mısın?
            </h2>

            <p className="text-emerald-50 text-sm sm:text-base leading-relaxed max-w-xl">
              Çevre bilinci, ekolojik denge ve kentsel sürdürülebilirlik için bir aradayız. 
              Bilgi edin, projelere katıl ve Puki ile eğlenceli çevre görevlerini tamamlayarak rozetler kazan!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('game')}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-lg shadow-amber-950/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Puki ile Oyuna Başla</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Projelerimizi Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Mascot Puki visual */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => onNavigate('game')}>
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/15 backdrop-blur-md p-4 flex items-center justify-center border-2 border-white/30 shadow-2xl transition-transform group-hover:scale-105">
                <img 
                  src="/public/assets/aistudio/puki_baykus_c089bd51.png" 
                  alt="Bilge Baykuş Puki" 
                  className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md whitespace-nowrap">
                Puki: "Hadi Başlayalım!"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Impact Counters (Tabular Numbers) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-600" />
            Topluluk Ekolojik Etkimiz
          </h3>
          <span className="text-xs text-slate-500 font-medium">Canlı Veri Takibi</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactStats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100 flex flex-col justify-between hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  {stat.icon}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-emerald-600">
                  {stat.unit} katkı sağlandı
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Awareness & Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Sosyal Farkındalık Alanlarımız
            </h3>
            <p className="text-xs text-slate-500">Doğa dostu uygulamalar, toplumsal hareketler ve eğitimler</p>
          </div>
          <button 
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="h-40 bg-gradient-to-tr from-emerald-50 to-teal-50 flex items-center justify-center p-4 border-b border-slate-100 relative">
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-emerald-800 shadow-xs border border-emerald-100">
                    {card.badge}
                  </span>
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="max-h-28 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                  />
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-bold text-emerald-600 mb-1">
                    {card.category}
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate(card.tab)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  <span>Bölüme Git</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Achievement Tier Banner */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm">
              Eko-Kahraman Seviye Durumu
            </h4>
            <p className="text-xs text-slate-600">
              Eğitsel oyunda 4 seviyenin {completedGameLevels} tanesini tamamladın.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('game')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Oyunu Aç & Puan Kazan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
