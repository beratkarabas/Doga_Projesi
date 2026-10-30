import React, { useState } from 'react';
import { 
  BookOpen, 
  Recycle, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award,
  Sparkles,
  ChevronDown,
  Info
} from 'lucide-react';
import { BlueRecycleBin } from '../game/gameGraphics';

export const InfoView: React.FC = () => {
  const [selectedWaste, setSelectedWaste] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Carbon Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const wasteTypes = [
    {
      id: 0,
      name: 'Plastik Ambalajlar',
      color: 'bg-sky-50 text-sky-800 border-sky-300',
      badgeColor: 'bg-sky-600',
      binType: 'Sarı / Mavi Geri Dönüşüm Kutusu',
      decomposition: '450 - 1000 Yıl',
      examples: 'Su şişeleri, şampuan kutuları, yoğurt kapları, temiz ambalaj filmleri.',
      tips: 'Şişelerin kapaklarını ayrı biriktirin, içini çalkalayarak kutuya atın. Kirli yağlı plastikler geri dönüşmez.',
      icon: '🧴'
    },
    {
      id: 1,
      name: 'Kağıt ve Karton',
      color: 'bg-blue-50 text-blue-800 border-blue-300',
      badgeColor: 'bg-blue-600',
      binType: 'Mavi Geri Dönüşüm Kutusu',
      decomposition: '2 - 5 Ay',
      examples: 'Gazeteler, kitaplar, karton koliler, temiz yazışma kağıtları.',
      tips: 'Yağlı pizza kutuları ve ıslak mendiller kağıt kutusuna atılamaz. 1 ton kağıt geri dönüşümü 17 ağacı kurtarır.',
      icon: '📦'
    },
    {
      id: 2,
      name: 'Cam Şişe ve Kavanoz',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      badgeColor: 'bg-emerald-600',
      binType: 'Yeşil Cam Kumbarası',
      decomposition: '4000+ Yıl (Sonsuz Geri Dönüşüm)',
      examples: 'Maden suyu şişeleri, reçel kavanozları, içecek şişeleri.',
      tips: 'Cam kalitesini kaybetmeden %100 sonsuz kez geri dönüştürülebilir. Kırık ayna veya pencere camı kumbaraya atılmaz.',
      icon: '🍾'
    },
    {
      id: 3,
      name: 'Organik ve Kompost',
      color: 'bg-amber-50 text-amber-800 border-amber-300',
      badgeColor: 'bg-amber-600',
      binType: 'Kahverengi / Yeşil Kompost Kutusu',
      decomposition: '2 - 8 Hafta',
      examples: 'Meyve ve sebze kabukları, çay posası, yumurta kabuğu, kuru yapraklar.',
      tips: 'Evsel organik atıklar kompost yapılarak zengin bir gübreye dönüştürülebilir. Plastikle karıştırılmamalıdır.',
      icon: '🍌'
    },
    {
      id: 4,
      name: 'Elektronik ve Piller',
      color: 'bg-purple-50 text-purple-800 border-purple-300',
      badgeColor: 'bg-purple-600',
      binType: 'Kırmızı Pil Kutusu & E-Atık Noktası',
      decomposition: 'Doğada Ağır Metal Zehirlenmesi',
      examples: 'Eski telefonlar, şarj aletleri, kalem piller, bataryalar.',
      tips: '1 adet küçük saat pili 800 bin litre suyu zehirleyebilir. Mutlaka atık pil toplama noktalarına teslim edilmelidir.',
      icon: '🔋'
    }
  ];

  const zeroWasteRules = [
    { title: '1. Reddet (Refuse)', desc: 'Gereksiz poşet, plastik pipet, broşür ve tek kullanımlık ambalajları kibarca reddet.' },
    { title: '2. Azalt (Reduce)', desc: 'İhtiyacın kadar satın al, gıda israfını önle, dolabındaki eşyaları maksimum verimle kullan.' },
    { title: '3. Tekrar Kullan (Reuse)', desc: 'Kavanozları, bez çantaları ve dayanıklı kapları tekrar tekrar hayatına dahil et.' },
    { title: '4. Tamir Et (Repair)', desc: 'Bozulan cihazları veya sökülen giysileri atmadan önce tamir etmeyi veya ettirmeyi dene.' },
    { title: '5. Çürüt / Kompostla (Rot)', desc: 'Sebze, meyve ve kahve posası gibi organik atıkları çöpe değil, kompost toprağına kazandır.' },
    { title: '6. Geri Dönüştür (Recycle)', desc: 'Kağıt, cam, metal ve plastik ambalajları temizleyip uygun kumbaralara ulaştır.' },
    { title: '7. Bilinçlendir (Educate)', desc: 'Aileni, sınıf arkadaşlarını ve komşularını çevre dostu alışkanlıklara davet et.' },
  ];

  const quizQuestions = [
    {
      q: '1 ton kağıdın geri dönüştürülmesi yaklaşık kaç yetişkin ağacın kesilmesini önler?',
      options: ['3 Ağaç', '7 Ağaç', '17 Ağaç', '35 Ağaç'],
      correct: 2
    },
    {
      q: 'Cam malzeme doğada kaç kez geri dönüştürülebilir?',
      options: ['Yalnızca 3 kez', '10 kez', '25 kez', 'Sonsuz kez kalite kaybı olmadan'],
      correct: 3
    },
    {
      q: 'Aşağıdakilerden hangisi mavi kağıt geri dönüşüm kutusuna ATILMAMALIDIR?',
      options: ['Kuru gazete kağıdı', 'Yağlı pizza kutusu', 'Ders defteri', 'Koli kartonu'],
      correct: 1
    },
    {
      q: 'Tek bir küçük pilin toprağa karışması ne kadar temiz suyu zehirleyebilir?',
      options: ['80 Litre', '800 Litre', '80.000 Litre', '800.000 Litre'],
      correct: 3
    }
  ];

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          Ekoloji ve Atık Ayrıştırma Rehberi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Geri dönüşümün temelleri, doğru kutu seçimi ve karbon ayak izinizi azaltacak pratik bilgiler.
        </p>
      </div>

      {/* 5 Waste Categories Interactive Selector */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-display font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
          <Recycle className="w-5 h-5 text-emerald-600" />
          Hangi Atık Hangi Kutuya Gitmeli?
        </h3>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {wasteTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedWaste(type.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedWaste === type.id
                  ? `${type.badgeColor} text-white shadow-sm`
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* Active Waste Detail Card */}
        {wasteTypes[selectedWaste] && (
          <div className={`p-6 rounded-2xl border ${wasteTypes[selectedWaste].color} transition-all`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-75">Doğru Ayrıştırma Noktası:</span>
                <h4 className="text-xl font-bold font-display mt-0.5">
                  {wasteTypes[selectedWaste].binType}
                </h4>
              </div>
              <div className="bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-current text-xs font-bold font-mono">
                Doğada Yok Oluş: {wasteTypes[selectedWaste].decomposition}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4 pt-4 border-t border-current/20">
              <div>
                <strong className="block mb-1 text-slate-900">Neler Bu Kategoriye Girer?</strong>
                <p className="opacity-90 leading-relaxed">{wasteTypes[selectedWaste].examples}</p>
              </div>
              <div>
                <strong className="block mb-1 text-slate-900">Kahraman İpucu (Dikkat Edilmesi Gerekenler):</strong>
                <p className="opacity-90 leading-relaxed">{wasteTypes[selectedWaste].tips}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7 Golden Rules of Zero Waste Accordion */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-display font-bold text-base text-slate-900 mb-1 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Evde ve Okulda Sıfır Atık İçin 7 Altın Kural
        </h3>
        <p className="text-xs text-slate-500 mb-4">Uluslararası sürdürülebilirlik ilkelerini günlük alışkanlıklarınıza dönüştürün.</p>

        <div className="space-y-2.5">
          {zeroWasteRules.map((rule, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{rule.title}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                    {rule.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Eco Knowledge Mini Quiz */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-emerald-100">
                Doğa Kahramanı Eko-Testi
              </h3>
              <p className="text-xs text-emerald-200/80">
                4 soruluk mini testi çözerek çevre bilginizi ölçün!
              </p>
            </div>
          </div>

          {quizSubmitted && (
            <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full font-bold text-xs">
              Skor: {calculateScore()} / 4
            </span>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-5 my-6">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <div className="text-xs sm:text-sm font-semibold text-emerald-100 mb-3">
                {q.q}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[qIdx] === optIdx;
                  const isCorrect = q.correct === optIdx;

                  let optClass = 'bg-white/5 hover:bg-white/15 text-white/90 border-white/10';
                  if (quizSubmitted) {
                    if (isCorrect) optClass = 'bg-emerald-500/80 text-white border-emerald-400 font-bold';
                    else if (isSelected && !isCorrect) optClass = 'bg-red-500/60 text-white border-red-400';
                  } else if (isSelected) {
                    optClass = 'bg-amber-400 text-slate-900 font-bold border-amber-300';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                      className={`p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />}
                      {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-200 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit & Retake Buttons */}
        <div className="flex items-center justify-between pt-2">
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(quizAnswers).length < 4}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                Object.keys(quizAnswers).length === 4
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-md'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              {Object.keys(quizAnswers).length === 4 ? 'Cevapları Kontrol Et' : `Tüm Soruları Yanıtla (${Object.keys(quizAnswers).length}/4)`}
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Testi Yeniden Çöz
            </button>
          )}

          {quizSubmitted && calculateScore() >= 3 && (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Award className="w-4 h-4" />
              <span>Harika Bilgi Düzeyi! Başarı Rozeti Kazandın.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
