import React, { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon, SunMedium, Compass } from 'lucide-react';

export const ClockAndCalendar: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time with 2 digits
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  // Turkish date formatting
  const day = time.getDate();
  const monthsTr = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const monthName = monthsTr[time.getMonth()];
  const year = time.getFullYear();

  const daysTr = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dayName = daysTr[time.getDay()];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex items-center justify-between gap-4">
      {/* Date Section */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center text-emerald-800 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider -mb-0.5">{monthName.slice(0, 3)}</span>
          <span className="text-base font-extrabold font-mono leading-none">{day}</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>{day} {monthName} {year}</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            {dayName} · Doğa Nöbeti
          </div>
        </div>
      </div>

      {/* Clock Section */}
      <div className="text-right pl-3 border-l border-slate-100">
        <div className="flex items-center justify-end gap-1 text-slate-900 font-mono font-extrabold text-lg tabular-nums tracking-tight">
          <Clock className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>{hours}:{minutes}</span>
          <span className="text-xs text-emerald-600 font-bold">:{seconds}</span>
        </div>
        <div className="text-[10px] text-emerald-600 font-semibold tracking-wide uppercase">
          Canlı Saat
        </div>
      </div>
    </div>
  );
};
