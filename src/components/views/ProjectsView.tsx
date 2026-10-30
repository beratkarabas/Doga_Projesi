import React, { useState } from 'react';
import { 
  FolderTree, 
  Trees, 
  Recycle, 
  Droplet, 
  Sun, 
  MapPin, 
  Users, 
  CheckCircle, 
  HeartHandshake, 
  Calculator,
  ArrowRight
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'forest' | 'waste' | 'water' | 'energy'>('all');
  const [joinedProjects, setJoinedProjects] = useState<number[]>([1]);
  const [joinModal, setJoinModal] = useState<string | null>(null);

  // Calculator states
  const [treeCount, setTreeCount] = useState<number>(5);
  const [plasticKg, setPlasticKg] = useState<number>(12);

  const projects = [
    {
      id: 1,
      title: '1 Milyon Yeşil Vaha Hatıra Ormanı',
      category: 'forest',
      categoryName: 'Ağaçlandırma',
      location: 'İç Anadolu & Ege Bölgesi',
      target: '1.000.000 Fidan',
      current: '640.000',
      pct: 64,
      volunteers: 4820,
      image: '/public/assets/aistudio/yeseren_agac_406d06ac.png',
      desc: 'Kuraklık ve erozyon riski altındaki alanları dayanıklı fidan türleriyle yeşillendirerek karbon yutağı alanlar oluşturuyoruz.'
    },
    {
      id: 2,
      title: 'Okulda & Mahallede Sıfır Atık Kutuları',
      category: 'waste',
      categoryName: 'Sıfır Atık',
      location: '81 İlde Pilot Okullar',
      target: '5.000 Okul',
      current: '3.850',
      pct: 77,
      volunteers: 1240,
      image: '/public/assets/aistudio/yesil_kutu_3a1b4c80.png',
      desc: 'Öğrencilerimize geri dönüşüm alışkanlığı kazandırmak amacıyla organik kompost ve ambalaj ayrıştırma istasyonları kuruyoruz.'
    },
    {
      id: 3,
      title: 'Temiz Su Havzaları & Gölet Kurtarma',
      category: 'water',
      categoryName: 'Su ve Deniz',
      location: 'Marmara & Göller Yöresi',
      target: '150 Gölet & Kıyı',
      current: '98',
      pct: 65,
      volunteers: 890,
      image: '/public/assets/aistudio/cop_plastik_d7390b91.png',
      desc: 'Göl ve dere yataklarındaki mikroplastik ve katı atıkları temizleyerek su ekosistemindeki su samurları, balıklar ve kuşları koruyoruz.'
    },
    {
      id: 4,
      title: 'Güneşle Aydınlanan Köy Okulları',
      category: 'energy',
      categoryName: 'Yenilenebilir Enerji',
      location: 'Doğu ve Güneydoğu Anadolu',
      target: '200 Köy Okulu',
      current: '142',
      pct: 71,
      volunteers: 640,
      image: '/public/assets/aistudio/park_arka_plan_284f01d3.jpg',
      desc: 'Kırsal bölgelerdeki okullara çatı tipi güneş panelleri kurarak hem temiz elektrik üretiyor hem de çocuklara yeşil enerji bilinci aşılıyoruz.'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const toggleJoin = (proj: { id: number; title: string }) => {
    if (joinedProjects.includes(proj.id)) {
      setJoinedProjects(joinedProjects.filter(id => id !== proj.id));
    } else {
      setJoinedProjects([...joinedProjects, proj.id]);
      setJoinModal(proj.title);
    }
  };

  // Eco impact math
  const co2Saved = Math.round(treeCount * 22 + plasticKg * 2.5); // kg CO2
  const oxygenProduced = Math.round(treeCount * 110); // kg oxygen/yr
  const waterSaved = Math.round(plasticKg * 18); // Liters of water

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Filter Bar */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-emerald-600" />
              Sürdürülebilirlik Projelerimiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Toplumsal etki yaratan, şeffaf ve ölçülebilir çevre projelerimizi inceleyin veya gönüllü olun.
            </p>
          </div>

          {/* Filter segment */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'forest', label: 'Ağaçlandırma' },
              { id: 'waste', label: 'Sıfır Atık' },
              { id: 'water', label: 'Su & Gölet' },
              { id: 'energy', label: 'Yenilenebilir' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-emerald-800 shadow-xs border border-emerald-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => {
            const isJoined = joinedProjects.includes(p.id);
            return (
              <div 
                key={p.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      {p.categoryName}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {p.location}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-tight">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Proje İlerlemesi:</span>
                      <span className="font-bold font-mono text-emerald-800">%{p.pct} ({p.current} / {p.target})</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700" 
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {p.volunteers} Aktif Gönüllü
                      </span>
                      <span>Hedef Yıl: 2026</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => toggleJoin(p)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isJoined
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>{isJoined ? 'Gönüllüsünüz ✓' : 'Projeye Gönüllü Ol'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Impact Calculator Box */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Kendi Ekolojik Etkini Hesapla
            </h3>
            <p className="text-xs text-slate-600">
              Yapacağın küçük katkıların çevreye ve atmosfere geri dönüşünü anında gör.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-4 bg-white/80 p-5 rounded-2xl border border-emerald-100">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Dikeceğin Fidan Sayısı:</span>
                <span className="text-emerald-700 font-mono text-sm">{treeCount} adet</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={treeCount}
                onChange={(e) => setTreeCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Dönüştüreceğin Plastik Miktarı:</span>
                <span className="text-teal-700 font-mono text-sm">{plasticKg} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={plasticKg}
                onChange={(e) => setPlasticKg(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Results KPI boxes */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Önlenen CO₂</span>
              <span className="text-xl font-black font-mono text-emerald-800 tabular-nums">-{co2Saved}</span>
              <span className="text-[11px] font-semibold text-emerald-600 block">kg / yıl</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Üretilen O₂</span>
              <span className="text-xl font-black font-mono text-teal-800 tabular-nums">+{oxygenProduced}</span>
              <span className="text-[11px] font-semibold text-teal-600 block">kg / yıl</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Korunan Su</span>
              <span className="text-xl font-black font-mono text-sky-800 tabular-nums">+{waterSaved}</span>
              <span className="text-[11px] font-semibold text-sky-600 block">Litre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Confirmation Modal */}
      {joinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-2 border-emerald-500">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-slate-900 mb-2">Tebrikler Doğa Dostu!</h4>
            <p className="text-xs text-slate-600 mb-6">
              <strong>"{joinModal}"</strong> projemize gönüllü kaydınız başarıyla alındı. Koordinasyon ekibimiz etkinlik takvimini e-posta ile iletecektir.
            </p>
            <button
              onClick={() => setJoinModal(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Tamamdır, Teşekkürler!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
