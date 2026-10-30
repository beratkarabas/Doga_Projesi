import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Award, 
  HelpCircle,
  Play,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import {
  BlueRecycleBin,
  NewspaperTrash,
  BananaPeelTrash,
  GlassShard,
  EmberCoal,
  FireBucket,
  SmallSapling,
  RainCloud,
  PondPlasticBag,
  PondCupTrash,
  RescueScissors,
  TurtleGraphic,
  ChimneyFilter,
  SolarRoofPanel,
  MedalAward
} from './game/gameGraphics';

interface NatureGameProps {
  onLevelCompleteGlobal?: (level: number) => void;
}

export const NatureGame: React.FC<NatureGameProps> = ({ onLevelCompleteGlobal }) => {
  const [level, setLevel] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bubbleText, setBubbleText] = useState<string>(
    'Merhaba Doğa Kahramanı! Parkımızı temizlemek için hazır mısın? Sağ alttaki kutulara tıkla ve parka yerleştir!'
  );
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedTrash, setSelectedTrash] = useState<{ id: string; name: string; target: 'blue' | 'green' } | null>(null);
  
  // Level 1 State
  const [lvl1PlacedBins, setLvl1PlacedBins] = useState<{ blue: boolean; green: boolean }>({ blue: false, green: false });
  const [lvl1TrashedIds, setLvl1TrashedIds] = useState<string[]>([]);
  const [lvl1SignClaimed, setLvl1SignClaimed] = useState<boolean>(false);
  const [lvl1FlowerClaimed, setLvl1FlowerClaimed] = useState<boolean>(false);
  const [showSignReward, setShowSignReward] = useState<boolean>(false);
  const [showFlowerReward, setShowFlowerReward] = useState<boolean>(false);

  // Level 2 State
  const [collectedGlasses, setCollectedGlasses] = useState<string[]>([]);
  const [extinguishedCoals, setExtinguishedCoals] = useState<string[]>([]);
  const [saplingInInv, setSaplingInInv] = useState<boolean>(false);
  const [showSaplingAward, setShowSaplingAward] = useState<boolean>(false);
  const [saplingPlanted, setSaplingPlanted] = useState<boolean>(false);
  const [forestRained, setForestRained] = useState<boolean>(false);
  const [showTreeAward, setShowTreeAward] = useState<boolean>(false);

  // Level 3 State
  const [collectedPondTrash, setCollectedPondTrash] = useState<string[]>([]);
  const [showScissorAward, setShowScissorAward] = useState<boolean>(false);
  const [hasScissors, setHasScissors] = useState<boolean>(false);
  const [turtleRescued, setTurtleRescued] = useState<boolean>(false);
  const [showTurtleAward, setShowTurtleAward] = useState<boolean>(false);

  // Level 4 State
  const [filteredChimneys, setFilteredChimneys] = useState<string[]>([]);
  const [paneledRoofs, setPaneledRoofs] = useState<string[]>([]);
  const [showCityAward, setShowCityAward] = useState<boolean>(false);

  // Modals
  const [rewardModal, setRewardModal] = useState<{ title: string; desc: string; type: string } | null>(null);
  const [levelMenu, setLevelMenu] = useState<{ title: string; message: string } | null>(null);

  // Web Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTone = (freq: number, type: OscillatorType, duration: number, delay = 0) => {
    if (!soundEnabled) return;
    setTimeout(() => {
      try {
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio fallback
      }
    }, delay);
  };

  const playPop = () => playTone(540, 'sine', 0.1);
  const playSizzle = () => playTone(210, 'sawtooth', 0.28);
  const playWrong = () => {
    playTone(180, 'sawtooth', 0.2, 0);
    playTone(130, 'sawtooth', 0.35, 150);
  };
  const playFanfare = () => {
    playTone(440, 'triangle', 0.18, 0);
    playTone(554, 'triangle', 0.18, 120);
    playTone(659, 'triangle', 0.22, 240);
    playTone(880, 'triangle', 0.4, 380);
  };
  const playLevelComplete = () => {
    playTone(523, 'sine', 0.16, 0);
    playTone(659, 'sine', 0.16, 160);
    playTone(784, 'sine', 0.16, 320);
    playTone(1046, 'sine', 0.5, 480);
  };

  // Reset when level changes
  const resetLevel = (lvlNum: number) => {
    setLevel(lvlNum);
    setSelectedTool(null);
    setSelectedTrash(null);
    setRewardModal(null);
    setLevelMenu(null);

    if (lvlNum === 1) {
      setLvl1PlacedBins({ blue: false, green: false });
      setLvl1TrashedIds([]);
      setLvl1SignClaimed(false);
      setLvl1FlowerClaimed(false);
      setShowSignReward(false);
      setShowFlowerReward(false);
      setBubbleText('Seviye 1: Parkı Kurtar! Önce sağ alttaki Mavi ve Yeşil kutulara tıklayarak parka yerleştir.');
    } else if (lvlNum === 2) {
      setCollectedGlasses([]);
      setExtinguishedCoals([]);
      setSaplingInInv(false);
      setShowSaplingAward(false);
      setSaplingPlanted(false);
      setForestRained(false);
      setShowTreeAward(false);
      setBubbleText('Seviye 2: Ormanı Yangından Kurtar! Mercek görevi gören yerdeki 3 cam kırığını topla.');
    } else if (lvlNum === 3) {
      setCollectedPondTrash([]);
      setShowScissorAward(false);
      setHasScissors(false);
      setTurtleRescued(false);
      setShowTurtleAward(false);
      setBubbleText('Seviye 3: Göldeki Dostumuz! Sudaki plastik poşet ve bardakları toplayarak gölü temizle.');
    } else if (lvlNum === 4) {
      setFilteredChimneys([]);
      setPaneledRoofs([]);
      setShowCityAward(false);
      setBubbleText('Seviye 4: Temiz Enerjili Şehir! Filtre alıp bacalara, güneş paneli alıp çatılara yerleştir.');
    }
  };

  // Level 1 logic
  const handlePlaceBin = (color: 'blue' | 'green') => {
    initAudio();
    playPop();
    const updated = { ...lvl1PlacedBins, [color]: true };
    setLvl1PlacedBins(updated);
    if (updated.blue && updated.green) {
      playFanfare();
      setBubbleText('Kutular yerleşti! Şimdi yerdeki bir çöpe tıkla, ardından uygun renkli kutuya tıkla.');
    } else {
      setBubbleText(`${color === 'blue' ? 'Mavi' : 'Yeşil'} kutu yerleşti! Diğer kutuyu da yerleştir.`);
    }
  };

  const handleSelectTrash = (trash: { id: string; name: string; target: 'blue' | 'green' }) => {
    if (!lvl1PlacedBins.blue || !lvl1PlacedBins.green) {
      setBubbleText('Önce iki kutuyu da parka yerleştirmelisin!');
      return;
    }
    initAudio();
    playPop();
    setSelectedTrash(trash);
    setBubbleText(`"${trash.name}" seçildi. Şimdi Mavi (Geri Dönüşüm) veya Yeşil (Organik) kutuya tıkla!`);
  };

  const handleBinClick = (binColor: 'blue' | 'green') => {
    if (!selectedTrash) {
      setBubbleText('Önce yerdeki çöplerden birine tıklayarak seçmelisin!');
      return;
    }
    initAudio();
    if (selectedTrash.target === binColor) {
      playPop();
      const newTrashed = [...lvl1TrashedIds, selectedTrash.id];
      setLvl1TrashedIds(newTrashed);
      const wasSelected = selectedTrash;
      setSelectedTrash(null);

      // Check blue & green counts
      const blueCount = newTrashed.filter(id => id.startsWith('t-b') || id.startsWith('t-p')).length;
      const greenCount = newTrashed.filter(id => id.startsWith('t-m')).length;

      if (wasSelected.target === 'blue') {
        setBubbleText(`Harika! ${wasSelected.name} Mavi kutuya atıldı.`);
        if (blueCount >= 4 && !lvl1SignClaimed) {
          setShowSignReward(true);
          setBubbleText('Mavi kutu doldu! Sağ altta beliren Çevre Koruma Tabelası ödülüne tıkla!');
        }
      } else {
        setBubbleText(`Süper! ${wasSelected.name} Yeşil kompost kutusuna atıldı.`);
        if (greenCount >= 3 && !lvl1FlowerClaimed) {
          setShowFlowerReward(true);
          setBubbleText('Yeşil kutu doldu! Sağ altta beliren Rengarenk Çiçekler ödülüne tıkla!');
        }
      }
    } else {
      playWrong();
      setBubbleText('Yanlış kutu! Plastik/Kağıt maviye, meyve kabukları yeşil organik kutuya gitmelidir.');
    }
  };

  // Check Level 1 completion
  useEffect(() => {
    if (level === 1 && lvl1TrashedIds.length === 7 && lvl1SignClaimed && lvl1FlowerClaimed) {
      playLevelComplete();
      setLevelMenu({
        title: '1. Seviye Tamamlandı!',
        message: 'Parkı tertemiz yaptın, tüm atıkları doğru ayrıştırdın ve ödülleri topladın!'
      });
      if (onLevelCompleteGlobal) onLevelCompleteGlobal(1);
    }
  }, [level, lvl1TrashedIds, lvl1SignClaimed, lvl1FlowerClaimed]);

  // Level 2 logic
  const handleCollectGlass = (id: string) => {
    initAudio();
    playPop();
    const newGlasses = [...collectedGlasses, id];
    setCollectedGlasses(newGlasses);
    if (newGlasses.length >= 3) {
      playFanfare();
      setBubbleText('Tüm camlar toplandı! Şimdi sağ alttaki su kovasını seçerek yanan közleri söndür.');
    } else {
      setBubbleText(`Cam kırığı toplandı (${newGlasses.length}/3). Yangın riskini önlüyoruz!`);
    }
  };

  const handleExtinguishCoal = (id: string) => {
    initAudio();
    if (selectedTool !== 'bucket') {
      setBubbleText('Közleri söndürmek için önce sağ alttaki su kovasını seçmelisin!');
      return;
    }
    playSizzle();
    const newCoals = [...extinguishedCoals, id];
    setExtinguishedCoals(newCoals);
    if (newCoals.length >= 2) {
      setSelectedTool(null);
      setShowSaplingAward(true);
      setBubbleText('Yangın söndürüldü! Sağ altta beliren Fidan ödülüne tıkla.');
    } else {
      setBubbleText('Köz söndürüldü! Diğer közü de su kovasıyla söndür.');
    }
  };

  const handlePlantSapling = () => {
    if (selectedTool === 'sapling' && saplingInInv && !saplingPlanted) {
      initAudio();
      playPop();
      setSaplingPlanted(true);
      setSaplingInInv(false);
      setSelectedTool(null);
      setBubbleText('Fidan ormana dikildi! Şimdi gökyüzündeki yağmur bulutuna tıkla ve ormana can suyu ver!');
    }
  };

  const handleMakeRain = () => {
    initAudio();
    playFanfare();
    setForestRained(true);
    setShowTreeAward(true);
    setBubbleText('Yağmur yağdı ve orman yeniden hayat buldu! Sağ alttaki Ulu Ağaç ödülüne tıkla.');
  };

  // Level 3 logic
  const handleCollectPondTrash = (id: string) => {
    initAudio();
    playPop();
    const newPond = [...collectedPondTrash, id];
    setCollectedPondTrash(newPond);
    if (newPond.length >= 6) {
      playFanfare();
      setShowScissorAward(true);
      setBubbleText('Göl masmavi oldu! Sağ alttaki Kurtarma Makası ödülüne tıkla ve kaplumbağayı kurtar!');
    } else {
      setBubbleText(`Gölden atık çıkarıldı (${newPond.length}/6). Suyu temizlemeye devam et!`);
    }
  };

  const handleRescueTurtle = () => {
    initAudio();
    if (selectedTool !== 'scissors') {
      setBubbleText('Kaplumbağayı ağlardan kurtarmak için önce sağ alttaki kurtarma makasını seçmelisin!');
      return;
    }
    playFanfare();
    setTurtleRescued(true);
    setSelectedTool(null);
    setShowTurtleAward(true);
    setBubbleText('Harika iş! Kaplumbağa özgürce yüzüyor! Sağ altta beliren ödülüne tıkla.');
  };

  // Level 4 logic
  const handlePlaceFilter = (id: string) => {
    initAudio();
    if (selectedTool !== 'filter') {
      setBubbleText('Fabrika bacasını temizlemek için Baca Filtresini seçmelisin!');
      return;
    }
    playPop();
    const newFilters = [...filteredChimneys, id];
    setFilteredChimneys(newFilters);
    checkCityStatus(newFilters.length, paneledRoofs.length);
  };

  const handlePlacePanel = (id: string) => {
    initAudio();
    if (selectedTool !== 'panel') {
      setBubbleText('Temiz elektrik üretmek için Güneş Panelini seçmelisin!');
      return;
    }
    playPop();
    const newPanels = [...paneledRoofs, id];
    setPaneledRoofs(newPanels);
    checkCityStatus(filteredChimneys.length, newPanels.length);
  };

  const checkCityStatus = (filters: number, panels: number) => {
    if (filters >= 2 && panels >= 3) {
      playFanfare();
      setShowCityAward(true);
      setBubbleText('Tebrikler! Şehrin havası tertemiz oldu! Sağ alttaki ödülüne tıkla.');
    } else {
      setBubbleText(`İlerleme: ${filters}/2 Baca Filtresi, ${panels}/3 Güneş Paneli yerleştirildi.`);
    }
  };

  const airPurityPct = Math.round(((filteredChimneys.length + paneledRoofs.length) / 5) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Game Header Bar */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-display tracking-wide">Doğa Kahramanı: Puki ile Çevre Görevi</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 font-medium">
                Seviye {level} / 4
              </span>
            </div>
            <p className="text-xs text-emerald-100/90">
              {level === 1 && 'Bölüm 1: Şehir Parkı Atık Ayrıştırma ve Geri Dönüşüm'}
              {level === 2 && 'Bölüm 2: Orman Yangını Önleme ve Ağaçlandırma'}
              {level === 3 && 'Bölüm 3: Göl Ekosistemi ve Su Canlılarını Kurtarma'}
              {level === 4 && 'Bölüm 4: Temiz Enerji ve Sıfır Emisyonlu Şehir'}
            </p>
          </div>
        </div>

        {/* Level Controls & Audio Toggle */}
        <div className="flex items-center gap-2">
          {/* Level Switcher Buttons */}
          <div className="flex items-center bg-black/20 p-1 rounded-xl border border-white/10 text-xs">
            {[1, 2, 3, 4].map(lvl => (
              <button
                key={lvl}
                onClick={() => resetLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  level === lvl
                    ? 'bg-amber-400 text-slate-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {lvl}. Bölüm
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-red-500/20 border-red-400/30 text-red-200'
            }`}
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => resetLevel(level)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            title="Bölümü Baştan Başlat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative w-full aspect-[16/10] max-h-[620px] bg-slate-900 overflow-hidden select-none">
        {/* Background Layers based on Level */}
        {level === 1 && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ 
              backgroundImage: `url('/public/assets/aistudio/park_arka_plan_284f01d3.jpg')`,
              backgroundColor: '#aed581'
            }}
          />
        )}

        {level === 2 && (
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              forestRained ? 'bg-emerald-800' : 'bg-amber-950'
            }`}
            style={{
              background: forestRained 
                ? 'linear-gradient(to bottom, #7dd3fc 0%, #bae6fd 40%, #15803d 70%, #14532d 100%)' 
                : 'linear-gradient(to bottom, #fdba74 0%, #fed7aa 35%, #78350f 70%, #451a03 100%)'
            }}
          >
            {/* Forest Background Elements */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute top-12 left-1/4 text-xs font-semibold px-3 py-1 rounded-full bg-white/30 backdrop-blur-xs text-slate-800 border border-white/40">
              {forestRained ? 'Yeşeren Huzurlu Orman' : 'Yangın Tehlikesi Altındaki Kurak Orman'}
            </div>
          </div>
        )}

        {level === 3 && (
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: collectedPondTrash.length >= 6
                ? 'linear-gradient(to bottom, #38bdf8 0%, #0284c7 35%, #0369a1 70%, #075985 100%)'
                : 'linear-gradient(to bottom, #94a3b8 0%, #64748b 35%, #475569 70%, #334155 100%)'
            }}
          >
            {/* Water Waves Animation Effect */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-cyan-950/50 to-transparent pointer-events-none" />
            <div className="absolute top-12 left-1/4 text-xs font-semibold px-3 py-1 rounded-full bg-white/30 backdrop-blur-xs text-white border border-white/40">
              {collectedPondTrash.length >= 6 ? 'Masmavi Temiz Göl Ekosistemi' : 'Atıklarla Kirlenmiş Bulanık Göl'}
            </div>
          </div>
        )}

        {level === 4 && (
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: airPurityPct >= 100
                ? 'linear-gradient(to bottom, #38bdf8 0%, #7dd3fc 40%, #bbf7d0 80%, #86efac 100%)'
                : 'linear-gradient(to bottom, #64748b 0%, #475569 40%, #334155 80%, #1e293b 100%)'
            }}
          >
            {/* City Skyline Silhouette */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-around px-8 opacity-90 pointer-events-none">
              <div className="w-24 h-56 bg-slate-700/80 rounded-t-lg border-t-2 border-slate-600" />
              <div className="w-32 h-72 bg-slate-800/80 rounded-t-lg border-t-2 border-slate-600" />
              <div className="w-28 h-48 bg-slate-700/80 rounded-t-lg border-t-2 border-slate-600" />
              <div className="w-36 h-64 bg-slate-800/80 rounded-t-lg border-t-2 border-slate-600" />
              <div className="w-32 h-52 bg-slate-700/80 rounded-t-lg border-t-2 border-slate-600" />
            </div>
          </div>
        )}

        {/* Puki Guide Character & Speech Bubble (Top Left) */}
        <div className="absolute top-4 left-4 z-40 flex items-start gap-3 max-w-[85%] sm:max-w-xl pointer-events-none">
          <div className="relative shrink-0 pointer-events-auto">
            <img 
              src="/public/assets/aistudio/puki_baykus_c089bd51.png" 
              alt="Puki Baykuş Rehber" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
          <div className="relative bg-white/95 backdrop-blur-xs text-slate-800 p-3 sm:p-4 rounded-2xl shadow-lg border-2 border-emerald-500 text-xs sm:text-sm font-medium leading-relaxed pointer-events-auto">
            <span className="font-bold text-emerald-800 block mb-0.5">Puki Diyor Ki:</span>
            {bubbleText}
          </div>
        </div>

        {/* Level 4: Air Quality Gauge (Top Right) */}
        {level === 4 && (
          <div className="absolute top-4 right-4 z-40 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border-2 border-teal-500 w-48 text-center">
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Hava Temizliği:</span>
              <span className="text-teal-700 font-extrabold font-mono">%{airPurityPct}</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${airPurityPct}%` }}
              />
            </div>
          </div>
        )}

        {/* ================= LEVEL 1 PLAY AREA ================= */}
        {level === 1 && (
          <div className="absolute inset-0">
            {/* Placed Blue Bin */}
            {lvl1PlacedBins.blue && (
              <div 
                onClick={() => handleBinClick('blue')}
                className="absolute left-16 sm:left-24 bottom-12 z-20 cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
                title="Mavi Geri Dönüşüm Kutusu (Plastik & Kağıt)"
              >
                <BlueRecycleBin className="w-24 h-28 sm:w-28 sm:h-32 drop-shadow-xl" />
              </div>
            )}

            {/* Placed Green Bin */}
            {lvl1PlacedBins.green && (
              <div 
                onClick={() => handleBinClick('green')}
                className="absolute right-20 sm:right-32 bottom-12 z-20 cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
                title="Yeşil Kompost Kutusu (Organik Atıklar)"
              >
                <img 
                  src="/public/assets/aistudio/yesil_kutu_3a1b4c80.png" 
                  alt="Yeşil Kutu" 
                  className="w-24 h-28 sm:w-28 sm:h-32 object-contain drop-shadow-xl"
                />
              </div>
            )}

            {/* Trash Items scattered on ground */}
            {/* 1. Plastic bottle 1 */}
            {!lvl1TrashedIds.includes('t-b1') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-b1', name: 'Plastik Şişe', target: 'blue' })}
                className={`absolute left-[34%] top-[62%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-b1' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#38bdf8]' : 'hover:scale-110'
                }`}
              >
                <img src="/public/assets/aistudio/cop_plastik_d7390b91.png" alt="Plastik Şişe" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              </button>
            )}

            {/* 2. Plastic bottle 2 */}
            {!lvl1TrashedIds.includes('t-b2') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-b2', name: 'Plastik Su Şişesi', target: 'blue' })}
                className={`absolute left-[54%] top-[58%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-b2' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#38bdf8]' : 'hover:scale-110'
                }`}
              >
                <img src="/public/assets/aistudio/cop_plastik_d7390b91.png" alt="Plastik Şişe" className="w-12 h-12 sm:w-14 sm:h-14 object-contain rotate-45" />
              </button>
            )}

            {/* 3. Newspaper 1 */}
            {!lvl1TrashedIds.includes('t-p1') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-p1', name: 'Eski Gazete', target: 'blue' })}
                className={`absolute left-[44%] top-[72%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-p1' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#38bdf8]' : 'hover:scale-110'
                }`}
              >
                <NewspaperTrash className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" />
              </button>
            )}

            {/* 4. Newspaper 2 */}
            {!lvl1TrashedIds.includes('t-p2') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-p2', name: 'Atık Dergi', target: 'blue' })}
                className={`absolute left-[64%] top-[65%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-p2' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#38bdf8]' : 'hover:scale-110'
                }`}
              >
                <NewspaperTrash className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md -rotate-12" />
              </button>
            )}

            {/* 5. Banana peel 1 */}
            {!lvl1TrashedIds.includes('t-m1') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-m1', name: 'Muz Kabuğu', target: 'green' })}
                className={`absolute left-[38%] top-[80%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-m1' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#22c55e]' : 'hover:scale-110'
                }`}
              >
                <BananaPeelTrash className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" />
              </button>
            )}

            {/* 6. Banana peel 2 */}
            {!lvl1TrashedIds.includes('t-m2') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-m2', name: 'Organik Meyve Kabuğu', target: 'green' })}
                className={`absolute left-[58%] top-[78%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-m2' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#22c55e]' : 'hover:scale-110'
                }`}
              >
                <BananaPeelTrash className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md rotate-45" />
              </button>
            )}

            {/* 7. Banana peel 3 */}
            {!lvl1TrashedIds.includes('t-m3') && (
              <button
                onClick={() => handleSelectTrash({ id: 't-m3', name: 'Çürük Elma & Muz', target: 'green' })}
                className={`absolute left-[48%] top-[64%] z-30 cursor-pointer transition-all ${
                  selectedTrash?.id === 't-m3' ? 'scale-125 -translate-y-2 drop-shadow-[0_0_12px_#22c55e]' : 'hover:scale-110'
                }`}
              >
                <BananaPeelTrash className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md -rotate-45" />
              </button>
            )}

            {/* Collectible Awards in Level 1 */}
            {showSignReward && !lvl1SignClaimed && (
              <button
                onClick={() => {
                  initAudio();
                  playFanfare();
                  setLvl1SignClaimed(true);
                  setShowSignReward(false);
                  setRewardModal({
                    title: 'Çevre Koruma Tabelası!',
                    desc: 'Mavi geri dönüşüm kutusunu başarıyla doldurdun ve çevre tabelası ödülü kazandın!',
                    type: 'tabela'
                  });
                }}
                className="absolute right-44 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-amber-300 rounded-2xl shadow-xl border-4 border-amber-500"
                title="Tabela Ödülü - Tıkla!"
              >
                <MedalAward type="tabela" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-amber-900 bg-white/80 rounded px-1">ÖDÜLÜ AL</span>
              </button>
            )}

            {showFlowerReward && !lvl1FlowerClaimed && (
              <button
                onClick={() => {
                  initAudio();
                  playFanfare();
                  setLvl1FlowerClaimed(true);
                  setShowFlowerReward(false);
                  setRewardModal({
                    title: 'Rengarenk Çiçekler!',
                    desc: 'Organik atıkları kompost kutusuna atarak toprağı besledin ve çiçekler açtırdın!',
                    type: 'cicek'
                  });
                }}
                className="absolute right-64 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-pink-200 rounded-2xl shadow-xl border-4 border-pink-400"
                title="Çiçek Ödülü - Tıkla!"
              >
                <MedalAward type="cicek" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-pink-900 bg-white/80 rounded px-1">ÖDÜLÜ AL</span>
              </button>
            )}
          </div>
        )}

        {/* ================= LEVEL 2 PLAY AREA ================= */}
        {level === 2 && (
          <div className="absolute inset-0">
            {/* 3 Glass Shards */}
            {!collectedGlasses.includes('g1') && (
              <button
                onClick={() => handleCollectGlass('g1')}
                className="absolute left-[20%] top-[65%] z-30 cursor-pointer hover:scale-125 transition-transform"
                title="Cam Kırığı - Topla!"
              >
                <GlassShard className="w-16 h-16" />
              </button>
            )}
            {!collectedGlasses.includes('g2') && (
              <button
                onClick={() => handleCollectGlass('g2')}
                className="absolute left-[45%] top-[60%] z-30 cursor-pointer hover:scale-125 transition-transform"
                title="Cam Kırığı - Topla!"
              >
                <GlassShard className="w-16 h-16" />
              </button>
            )}
            {!collectedGlasses.includes('g3') && (
              <button
                onClick={() => handleCollectGlass('g3')}
                className="absolute left-[70%] top-[68%] z-30 cursor-pointer hover:scale-125 transition-transform"
                title="Cam Kırığı - Topla!"
              >
                <GlassShard className="w-16 h-16" />
              </button>
            )}

            {/* 2 Smoking Coals */}
            {!extinguishedCoals.includes('c1') && (
              <button
                onClick={() => handleExtinguishCoal('c1')}
                className="absolute left-[33%] top-[74%] z-30 cursor-pointer hover:scale-110 transition-transform"
                title="Yanan Köz - Suyla Söndür!"
              >
                <EmberCoal className="w-16 h-16" />
              </button>
            )}
            {!extinguishedCoals.includes('c2') && (
              <button
                onClick={() => handleExtinguishCoal('c2')}
                className="absolute left-[56%] top-[72%] z-30 cursor-pointer hover:scale-110 transition-transform"
                title="Yanan Köz - Suyla Söndür!"
              >
                <EmberCoal className="w-16 h-16" />
              </button>
            )}

            {/* Center Planting Box */}
            {saplingInInv && !saplingPlanted && (
              <button
                onClick={handlePlantSapling}
                className="absolute left-1/2 -translate-x-1/2 bottom-20 z-40 w-32 h-32 border-4 border-dashed border-amber-400 bg-amber-500/30 rounded-3xl flex flex-col items-center justify-center animate-pulse cursor-pointer hover:bg-amber-500/50"
              >
                <span className="text-xs font-black text-amber-200 uppercase text-center leading-tight">
                  Fidanı Buraya<br />Dik!
                </span>
              </button>
            )}

            {/* Planted Sapling */}
            {saplingPlanted && !forestRained && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-16 z-30">
                <SmallSapling className="w-20 h-20" />
              </div>
            )}

            {/* Rain Cloud */}
            {saplingPlanted && !forestRained && (
              <button
                onClick={handleMakeRain}
                className="absolute left-1/2 -translate-x-1/2 top-16 z-40 cursor-pointer hover:scale-110 animate-bounce transition-transform"
                title="Yağmur Bulutu - Ormanı Yeşert!"
              >
                <RainCloud className="w-32 h-20" />
              </button>
            )}

            {/* Grown Tree when rained */}
            {forestRained && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-12 z-30 animate-pulse">
                <img 
                  src="/public/assets/aistudio/yeseren_agac_406d06ac.png" 
                  alt="Ulu Ağaç" 
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-2xl"
                />
              </div>
            )}

            {/* Sapling Award */}
            {showSaplingAward && (
              <button
                onClick={() => {
                  initAudio();
                  playFanfare();
                  setShowSaplingAward(false);
                  setSaplingInInv(true);
                  setSelectedTool('sapling');
                  setRewardModal({
                    title: 'Can Veren Fidan!',
                    desc: 'Yangını söndürdün ve bir fidan kazandın! Fidanı ortadaki kutucuğa dik.',
                    type: 'agac'
                  });
                }}
                className="absolute right-40 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-emerald-200 rounded-2xl shadow-xl border-4 border-emerald-500"
              >
                <MedalAward type="agac" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-emerald-900 bg-white/80 rounded px-1">ÖDÜLÜ AL</span>
              </button>
            )}

            {/* Final Tree Award */}
            {showTreeAward && (
              <button
                onClick={() => {
                  initAudio();
                  playLevelComplete();
                  setShowTreeAward(false);
                  setLevelMenu({
                    title: '2. Seviye Tamamlandı!',
                    message: 'Ormanı yangından kurtardın, can suyu verdin ve ulu bir ağaç yeşerttin!'
                  });
                  if (onLevelCompleteGlobal) onLevelCompleteGlobal(2);
                }}
                className="absolute right-40 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-amber-300 rounded-2xl shadow-xl border-4 border-amber-500"
              >
                <MedalAward type="agac" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-amber-900 bg-white/80 rounded px-1">BÖLÜMÜ BİTİR</span>
              </button>
            )}
          </div>
        )}

        {/* ================= LEVEL 3 PLAY AREA ================= */}
        {level === 3 && (
          <div className="absolute inset-0">
            {/* Lake Turtle */}
            <button
              onClick={handleRescueTurtle}
              className={`absolute left-1/2 -translate-x-1/2 bottom-20 z-30 transition-transform ${
                turtleRescued ? 'scale-125' : 'hover:scale-105'
              }`}
              title={turtleRescued ? 'Mutlu Kaplumbağa' : 'Ağlara Takılmış Üzgün Kaplumbağa'}
            >
              <TurtleGraphic isHappy={turtleRescued} className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-xl" />
            </button>

            {/* Floating Trash in Pond */}
            {!collectedPondTrash.includes('p1') && (
              <button
                onClick={() => handleCollectPondTrash('p1')}
                className="absolute left-[25%] top-[45%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Poşet - Topla!"
              >
                <PondPlasticBag className="w-16 h-16" />
              </button>
            )}
            {!collectedPondTrash.includes('p2') && (
              <button
                onClick={() => handleCollectPondTrash('p2')}
                className="absolute left-[65%] top-[40%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Poşet - Topla!"
              >
                <PondPlasticBag className="w-16 h-16" />
              </button>
            )}
            {!collectedPondTrash.includes('p3') && (
              <button
                onClick={() => handleCollectPondTrash('p3')}
                className="absolute left-[60%] top-[60%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Poşet - Topla!"
              >
                <PondPlasticBag className="w-16 h-16" />
              </button>
            )}
            {!collectedPondTrash.includes('c1') && (
              <button
                onClick={() => handleCollectPondTrash('c1')}
                className="absolute left-[35%] top-[55%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Bardak - Topla!"
              >
                <PondCupTrash className="w-14 h-14" />
              </button>
            )}
            {!collectedPondTrash.includes('c2') && (
              <button
                onClick={() => handleCollectPondTrash('c2')}
                className="absolute left-[75%] top-[52%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Bardak - Topla!"
              >
                <PondCupTrash className="w-14 h-14" />
              </button>
            )}
            {!collectedPondTrash.includes('c3') && (
              <button
                onClick={() => handleCollectPondTrash('c3')}
                className="absolute left-[28%] top-[65%] z-25 hover:scale-125 cursor-pointer transition-transform"
                title="Plastik Bardak - Topla!"
              >
                <PondCupTrash className="w-14 h-14" />
              </button>
            )}

            {/* Scissors Award */}
            {showScissorAward && (
              <button
                onClick={() => {
                  initAudio();
                  playFanfare();
                  setShowScissorAward(false);
                  setHasScissors(true);
                  setSelectedTool('scissors');
                  setRewardModal({
                    title: 'Kurtarma Makası!',
                    desc: 'Gölü temizledin ve kurtarma makası kazandın! Makasla kaplumbağayı ağlardan kurtar.',
                    type: 'tabela'
                  });
                }}
                className="absolute right-40 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-sky-200 rounded-2xl shadow-xl border-4 border-sky-500"
              >
                <RescueScissors className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-sky-900 bg-white/80 rounded px-1">MAKASI AL</span>
              </button>
            )}

            {/* Turtle Rescued Award */}
            {showTurtleAward && (
              <button
                onClick={() => {
                  initAudio();
                  playLevelComplete();
                  setShowTurtleAward(false);
                  setLevelMenu({
                    title: '3. Seviye Tamamlandı!',
                    message: 'Gölü tertemiz yaptın ve deniz canlılarını plastik kirliliğinden kurtardın!'
                  });
                  if (onLevelCompleteGlobal) onLevelCompleteGlobal(3);
                }}
                className="absolute right-40 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-emerald-200 rounded-2xl shadow-xl border-4 border-emerald-500"
              >
                <MedalAward type="cicek" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-emerald-900 bg-white/80 rounded px-1">BÖLÜMÜ BİTİR</span>
              </button>
            )}
          </div>
        )}

        {/* ================= LEVEL 4 PLAY AREA ================= */}
        {level === 4 && (
          <div className="absolute inset-0">
            {/* Smokestack 1 */}
            <div className="absolute left-[12%] top-[30%] z-20 flex flex-col items-center">
              {!filteredChimneys.includes('chim1') ? (
                <>
                  <div className="w-16 h-16 bg-slate-500/70 rounded-full blur-md animate-pulse -mb-4" />
                  <button
                    onClick={() => handlePlaceFilter('chim1')}
                    className="w-12 h-20 border-2 border-dashed border-amber-400 bg-amber-500/30 rounded-t cursor-pointer hover:bg-amber-500/50 flex items-center justify-center"
                    title="Filtre Tak"
                  >
                    <span className="text-[10px] font-bold text-amber-200">FİLTRE</span>
                  </button>
                </>
              ) : (
                <div className="w-12 h-20 bg-slate-700 rounded-t flex flex-col items-center justify-start pt-2">
                  <ChimneyFilter className="w-10 h-10" />
                </div>
              )}
            </div>

            {/* Smokestack 2 */}
            <div className="absolute left-[26%] top-[25%] z-20 flex flex-col items-center">
              {!filteredChimneys.includes('chim2') ? (
                <>
                  <div className="w-20 h-20 bg-slate-500/70 rounded-full blur-md animate-pulse -mb-4" />
                  <button
                    onClick={() => handlePlaceFilter('chim2')}
                    className="w-14 h-24 border-2 border-dashed border-amber-400 bg-amber-500/30 rounded-t cursor-pointer hover:bg-amber-500/50 flex items-center justify-center"
                    title="Filtre Tak"
                  >
                    <span className="text-[10px] font-bold text-amber-200">FİLTRE</span>
                  </button>
                </>
              ) : (
                <div className="w-14 h-24 bg-slate-700 rounded-t flex flex-col items-center justify-start pt-2">
                  <ChimneyFilter className="w-12 h-12" />
                </div>
              )}
            </div>

            {/* Rooftops for solar panels */}
            <div className="absolute left-[45%] bottom-[28%] z-20">
              {!paneledRoofs.includes('roof1') ? (
                <button
                  onClick={() => handlePlacePanel('roof1')}
                  className="w-24 h-12 border-2 border-dashed border-sky-400 bg-sky-500/30 rounded cursor-pointer hover:bg-sky-500/50 flex items-center justify-center"
                  title="Güneş Paneli Kur"
                >
                  <span className="text-[10px] font-bold text-sky-200">GÜNEŞ PANELİ</span>
                </button>
              ) : (
                <SolarRoofPanel className="w-24 h-12" />
              )}
            </div>

            <div className="absolute left-[62%] bottom-[35%] z-20">
              {!paneledRoofs.includes('roof2') ? (
                <button
                  onClick={() => handlePlacePanel('roof2')}
                  className="w-24 h-12 border-2 border-dashed border-sky-400 bg-sky-500/30 rounded cursor-pointer hover:bg-sky-500/50 flex items-center justify-center"
                  title="Güneş Paneli Kur"
                >
                  <span className="text-[10px] font-bold text-sky-200">GÜNEŞ PANELİ</span>
                </button>
              ) : (
                <SolarRoofPanel className="w-24 h-12" />
              )}
            </div>

            <div className="absolute left-[78%] bottom-[25%] z-20">
              {!paneledRoofs.includes('roof3') ? (
                <button
                  onClick={() => handlePlacePanel('roof3')}
                  className="w-24 h-12 border-2 border-dashed border-sky-400 bg-sky-500/30 rounded cursor-pointer hover:bg-sky-500/50 flex items-center justify-center"
                  title="Güneş Paneli Kur"
                >
                  <span className="text-[10px] font-bold text-sky-200">GÜNEŞ PANELİ</span>
                </button>
              ) : (
                <SolarRoofPanel className="w-24 h-12" />
              )}
            </div>

            {/* City Completion Award */}
            {showCityAward && (
              <button
                onClick={() => {
                  initAudio();
                  playLevelComplete();
                  setShowCityAward(false);
                  setLevelMenu({
                    title: 'DÜNYAYI KURTARDIN!',
                    message: 'Parkı, Ormanı, Gölü ve Şehri başarıyla temizledin! Doğa Kahramanı Büyük Başarı Sertifikasını kazandın!'
                  });
                  if (onLevelCompleteGlobal) onLevelCompleteGlobal(4);
                }}
                className="absolute right-40 bottom-14 z-40 animate-bounce cursor-pointer p-2 bg-amber-300 rounded-2xl shadow-xl border-4 border-amber-500"
              >
                <MedalAward type="bisiklet" className="w-16 h-16" />
                <span className="block text-[10px] font-bold text-amber-900 bg-white/80 rounded px-1">ÖDÜLÜ AL</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom Right Inventory Tray */}
        <div className="absolute right-4 bottom-4 z-40 bg-white/95 backdrop-blur-xs border-2 border-emerald-400 rounded-2xl p-2.5 shadow-xl flex items-center gap-2">
          {level === 1 && (
            <>
              {!lvl1PlacedBins.blue && (
                <button
                  onClick={() => handlePlaceBin('blue')}
                  className="p-1 rounded-xl hover:bg-emerald-50 border-2 border-dashed border-sky-400 transition-all cursor-pointer"
                  title="Mavi Kutuyu Parka Yerleştir"
                >
                  <BlueRecycleBin className="w-12 h-14" />
                </button>
              )}
              {!lvl1PlacedBins.green && (
                <button
                  onClick={() => handlePlaceBin('green')}
                  className="p-1 rounded-xl hover:bg-emerald-50 border-2 border-dashed border-emerald-400 transition-all cursor-pointer"
                  title="Yeşil Kutuyu Parka Yerleştir"
                >
                  <img src="/public/assets/aistudio/yesil_kutu_3a1b4c80.png" alt="Yeşil Kutu" className="w-12 h-14 object-contain" />
                </button>
              )}
              {lvl1PlacedBins.blue && lvl1PlacedBins.green && (
                <div className="text-[11px] font-bold text-emerald-800 px-2 py-1">
                  Kutular Parkta! Çöplere tıkla.
                </div>
              )}
            </>
          )}

          {level === 2 && (
            <>
              {collectedGlasses.length >= 3 && extinguishedCoals.length < 2 && (
                <button
                  onClick={() => {
                    initAudio();
                    playPop();
                    setSelectedTool('bucket');
                    setBubbleText('Su kovası elinde! Yanan közlere tıkla ve söndür.');
                  }}
                  className={`p-1 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedTool === 'bucket' ? 'border-red-500 bg-red-50 scale-110 ring-2 ring-red-400' : 'border-slate-300'
                  }`}
                  title="Yangın Söndürme Kovası"
                >
                  <FireBucket className="w-12 h-12" />
                </button>
              )}
              {saplingInInv && (
                <button
                  onClick={() => {
                    initAudio();
                    playPop();
                    setSelectedTool('sapling');
                    setBubbleText('Fidan elinde! Ortadaki kutucuğa tıklayarak dik.');
                  }}
                  className={`p-1 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedTool === 'sapling' ? 'border-emerald-500 bg-emerald-50 scale-110 ring-2 ring-emerald-400' : 'border-slate-300'
                  }`}
                  title="Fidan"
                >
                  <SmallSapling className="w-12 h-12" />
                </button>
              )}
              {collectedGlasses.length < 3 && (
                <div className="text-[11px] font-bold text-slate-700 px-2">
                  Camları Topla: {collectedGlasses.length}/3
                </div>
              )}
            </>
          )}

          {level === 3 && (
            <>
              {hasScissors && (
                <button
                  onClick={() => {
                    initAudio();
                    playPop();
                    setSelectedTool('scissors');
                    setBubbleText('Makas elinde! Kaplumbağaya tıkla ve ağları kes.');
                  }}
                  className={`p-1 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedTool === 'scissors' ? 'border-sky-500 bg-sky-50 scale-110 ring-2 ring-sky-400' : 'border-slate-300'
                  }`}
                  title="Kurtarma Makası"
                >
                  <RescueScissors className="w-12 h-12" />
                </button>
              )}
              {!hasScissors && (
                <div className="text-[11px] font-bold text-slate-700 px-2">
                  Göl Atıkları: {collectedPondTrash.length}/6
                </div>
              )}
            </>
          )}

          {level === 4 && (
            <>
              <button
                onClick={() => {
                  initAudio();
                  playPop();
                  setSelectedTool('filter');
                  setBubbleText('Baca Filtresi seçildi! Sarı işaretli fabrika bacalarına tıkla.');
                }}
                className={`p-1 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedTool === 'filter' ? 'border-amber-500 bg-amber-50 scale-110 ring-2 ring-amber-400' : 'border-slate-300'
                }`}
                title="Baca Filtresi"
              >
                <ChimneyFilter className="w-10 h-10" />
              </button>
              <button
                onClick={() => {
                  initAudio();
                  playPop();
                  setSelectedTool('panel');
                  setBubbleText('Güneş Paneli seçildi! Mavi işaretli ev çatılarına tıkla.');
                }}
                className={`p-1 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedTool === 'panel' ? 'border-sky-500 bg-sky-50 scale-110 ring-2 ring-sky-400' : 'border-slate-300'
                }`}
                title="Güneş Paneli"
              >
                <SolarRoofPanel className="w-14 h-10" />
              </button>
            </>
          )}
        </div>

        {/* Reward Popup Modal */}
        {rewardModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto mb-3 bg-amber-100 rounded-2xl flex items-center justify-center border-2 border-amber-300">
                <MedalAward type={rewardModal.type as 'tabela' | 'cicek' | 'agac' | 'bisiklet'} className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold font-display text-amber-700 mb-1">{rewardModal.title}</h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">{rewardModal.desc}</p>
              <button
                onClick={() => setRewardModal(null)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Harika, Devam Et!
              </button>
            </div>
          </div>
        )}

        {/* 3-Option Level Transition Modal */}
        {levelMenu && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-4 border-emerald-500 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-emerald-800 mb-2">{levelMenu.title}</h3>
              <p className="text-sm text-slate-600 mb-6">{levelMenu.message}</p>
              
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    const next = level === 4 ? 1 : level + 1;
                    resetLevel(next);
                  }}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>1. Seçenek: {level === 4 ? 'Oyunu Baştan Başlat' : 'Sıradaki Seviyeye Geç'}</span>
                </button>

                <button
                  onClick={() => resetLevel(level)}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>2. Seçenek: Aynı Bölümü Tekrar Oyna</span>
                </button>

                {level > 1 && (
                  <button
                    onClick={() => resetLevel(level - 1)}
                    className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    3. Seçenek: Önceki Bölüme Dön
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Footer / Instructions & Tips */}
      <div className="p-4 bg-emerald-50/70 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>
            <strong>İpucu:</strong> Nesnelere tıklayarak envantere alabilir, ardından hedef kutu veya alana dokunarak görevleri tamamlayabilirsiniz.
          </span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-emerald-700">
          <span>✓ Doğal Ses Efektleri</span>
          <span>✓ 4 Farklı Ekolojik Bölüm</span>
          <span>✓ Puki Rehberliği</span>
        </div>
      </div>
    </div>
  );
};
