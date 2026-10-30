import React, { useState } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  Ticket, 
  CheckCircle2, 
  Sparkles, 
  Search,
  Filter,
  Check
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [registerModal, setRegisterModal] = useState<any | null>(null);
  const [ticketConfirmed, setTicketConfirmed] = useState<boolean>(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(1);

  const events = [
    {
      id: 1,
      title: 'Bahar Fidan Dikim Şenliği & Kuş Yuvası Atölyesi',
      category: 'planting',
      categoryName: 'Ağaçlandırma',
      date: '15 Kasım 2026',
      time: '10:00 - 15:00',
      location: 'İstanbul, Belgrad Ormanı Doğa Parkı',
      spotsLeft: 42,
      registered: 158,
      desc: 'Aileler ve öğrencilerle birlikte 1000 adet meşe ve çam fidanını toprakla buluşturuyor, kuşlar için ahşap yuvalar boyuyoruz.',
      badge: 'Kontenjan Sınırlı'
    },
    {
      id: 2,
      title: 'Büyük Caddebostan & Adalar Sahil Temizliği',
      category: 'cleanup',
      categoryName: 'Kıyı Temizliği',
      date: '22 Kasım 2026',
      time: '09:30 - 13:00',
      location: 'İstanbul, Caddebostan Sahil Şeridi',
      spotsLeft: 85,
      registered: 215,
      desc: 'Eldivenlerimiz ve biyobozunur torbalarımızla kıyı şeridindeki plastik atıkları topluyor, deniz biyologlarıyla atıkları türlerine göre tasnif ediyoruz.',
      badge: 'Ekipman Sağlanır'
    },
    {
      id: 3,
      title: 'Evde Pratik Kompost & Solucan Gübresi Atölyesi',
      category: 'workshop',
      categoryName: 'Atölye',
      date: '28 Kasım 2026',
      time: '14:00 - 16:30',
      location: 'Ankara, Çankaya Ekolojik Yaşam Merkezi',
      spotsLeft: 18,
      registered: 32,
      desc: 'Mutfak atıklarınızı balkonunuzda koku yapmadan nasıl zengin bir bitki besinine dönüştürebileceğinizi uygulamalı olarak öğrenin.',
      badge: 'Sertifikalı'
    },
    {
      id: 4,
      title: 'Temiz Hava İçin Şehir İçi Bisiklet Konvoyu',
      category: 'mobility',
      categoryName: 'Sürdürülebilir Ulaşım',
      date: '06 Aralık 2026',
      time: '11:00 - 14:00',
      location: 'İzmir, Kordon Boyu & Alsancak Meydanı',
      spotsLeft: 120,
      registered: 380,
      desc: 'Fosil yakıt kullanımına dikkat çekmek ve bisiklet yollarının yaygınlaşmasını desteklemek için yeşil tişörtlerimizle pedallıyoruz.',
      badge: 'Herkese Açık'
    }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setTicketConfirmed(true);
  };

  const closeRegisterModal = () => {
    setRegisterModal(null);
    setTicketConfirmed(false);
    setFormName('');
    setFormEmail('');
    setAttendeeCount(1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-emerald-600" />
            Topluluk Etkinlikleri & Atölyeler
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fidan dikimlerinden sahil temizliklerine, çevre buluşmalarına ücretsiz katılın.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'planting', label: 'Fidan Dikimi' },
            { id: 'cleanup', label: 'Kıyı Temizliği' },
            { id: 'workshop', label: 'Atölyeler' },
            { id: 'mobility', label: 'Bisiklet' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-white text-emerald-800 shadow-xs font-bold border border-emerald-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {evt.categoryName}
                </span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {evt.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-tight">
                {evt.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {evt.desc}
              </p>

              {/* Event Metadata (Clean text, zero-pill) */}
              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{evt.date}</span>
                  <span className="text-slate-300">·</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{evt.registered} Katılımcı</span>
                <span className="text-emerald-700 font-bold">({evt.spotsLeft} Boş Kontenjan)</span>
              </span>

              <button
                onClick={() => setRegisterModal(evt)}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                <span>Kayıt Ol / Yer Ayırt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal Form */}
      {registerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-emerald-500 animate-in zoom-in-95 duration-200">
            {!ticketConfirmed ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Etkinlik Kaydı
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                    {registerModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {registerModal.date} · {registerModal.location}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Örn: Ayşe Yılmaz"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    E-Posta Adresiniz
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="ornek@eposta.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Katılımcı Sayısı
                  </label>
                  <select
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value={1}>1 Kişi (Yalnızca Ben)</option>
                    <option value={2}>2 Kişi (Ben ve Arkadaşım)</option>
                    <option value={3}>3 Kişi (Aile / Küçük Grup)</option>
                    <option value={4}>4+ Kişi (Grup)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeRegisterModal}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Vazgeç
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Kaydı Onayla
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display text-slate-900">
                    Biletiniz Hazır!
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Tebrikler Sayın <strong>{formName}</strong>, {attendeeCount} kişilik kaydınız oluşturuldu.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Etkinlik:</span>
                    <strong className="text-slate-800">{registerModal.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tarih:</span>
                    <strong className="text-slate-800">{registerModal.date}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Konum:</span>
                    <strong className="text-slate-800">{registerModal.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">E-Bilet No:</span>
                    <strong className="font-mono text-emerald-800">DK-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
                  </div>
                </div>

                <button
                  onClick={closeRegisterModal}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Tamamla ve Kapat
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
