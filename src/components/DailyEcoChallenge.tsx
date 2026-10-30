import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, Sprout, ArrowRight } from 'lucide-react';

export const DailyEcoChallenge: React.FC = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([1]);

  const challenges = [
    { id: 1, title: 'Matara Kullan', desc: 'Bugün tek kullanımlık plastik şişe yerine cam veya çelik matara tercih et.' },
    { id: 2, title: 'Işıkları Kapat', desc: 'Kullanmadığın odaların ışıklarını ve prizdeki cihazları kapat.' },
    { id: 3, title: 'Geri Dönüşüme Ayır', desc: 'Günün tüm ambalaj atıklarını ayrıştırarak geri dönüşüm kutusuna bırak.' },
  ];

  const toggleChallenge = (id: number) => {
    if (completedChallenges.includes(id)) {
      setCompletedChallenges(completedChallenges.filter(c => c !== id));
    } else {
      setCompletedChallenges([...completedChallenges, id]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-slate-800">Günün Eko Görevleri</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">Küçük Adımlar, Büyük Değişim</span>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          {completedChallenges.length}/{challenges.length}
        </span>
      </div>

      <div className="space-y-2 mt-3">
        {challenges.map((ch) => {
          const isDone = completedChallenges.includes(ch.id);
          return (
            <div
              key={ch.id}
              onClick={() => toggleChallenge(ch.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                isDone 
                  ? 'bg-emerald-50/80 border-emerald-200 text-slate-700' 
                  : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              <button className="mt-0.5 shrink-0 text-emerald-600">
                {isDone ? <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" /> : <Circle className="w-4 h-4 text-slate-300" />}
              </button>
              <div>
                <div className={`text-xs font-bold leading-tight ${isDone ? 'line-through text-emerald-800' : 'text-slate-800'}`}>
                  {ch.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {ch.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
