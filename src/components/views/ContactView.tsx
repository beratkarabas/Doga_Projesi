import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Clock, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSent, setFormSent] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('volunteer');
  const [message, setMessage] = useState('');

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSent(true);
  };

  const faqs = [
    {
      q: 'Doğa Kahramanları gönüllüsü olmak için yaş sınırı var mı?',
      a: 'Hayır, doğa sevgisinin yaşı yoktur! 7\'den 77\'ye tüm çevre dostları etkinliklerimize katılabilir. 18 yaş altındaki genç kahramanlarımız veli onayı ile fidan dikim ve sahil temizliği şenliklerine dahil olabilmektedir.'
    },
    {
      q: 'Okulumuzda Sıfır Atık veya Fidan Dikim projesi düzenleyebilir miyiz?',
      a: 'Kesinlikle! "Okul İşbirlikleri" başlığı altında eğitimcilerimize ücretsiz geri dönüşüm kutuları, tohum kartları ve Puki çizgi broşürleri sağlıyoruz. Form üzerinden okul bilgilerinizi iletmeniz yeterlidir.'
    },
    {
      q: 'Toplanan geri dönüşüm atıkları nereye ulaştırılıyor?',
      a: 'Toplanan tüm plastik, kağıt, cam ve e-atıklar yerel lisanslı geri dönüşüm tesislerine teslim edilmekte ve döngüsel ekonomiye kazandırılmaktadır. Gelirler ise köy okullarına fidan dikimi için fonlanmaktadır.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
          <Mail className="w-6 h-6 text-emerald-600" />
          Bizimle İletişime Geçin & Gönüllü Olun
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Sorularınız, okul işbirlikleri ve gönüllü katılım başvurularınız için buradayız.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (Left/Center) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          {!formSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base text-slate-900">
                  Mesaj & Gönüllülük Formu
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    E-Posta Adresiniz *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@alanadi.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    İlgi Alanı / Konu
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="volunteer">Aktif Saha Gönüllüsü Olmak</option>
                    <option value="school">Okul & Sınıf Projesi Talebi</option>
                    <option value="corporate">Kurumsal Sosyal Sorumluluk</option>
                    <option value="other">Genel Soru & Öneri</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mesajınız *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Doğa için yapmak istediklerinizi veya iletmek istediğiniz notu buraya yazın..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Mesajı Gönder</span>
              </button>
            </form>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-display text-slate-900">
                  Mesajınız Bize Ulaştı!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Teşekkür ederiz Sayın <strong>{name}</strong>. İletişim ekibimiz en geç 24 saat içerisinde <strong>{email}</strong> adresinize dönüş yapacaktır.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormSent(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          )}
        </div>

        {/* Contact Info & Coordinates (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              Doğa Koordinasyon Merkezi
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Ekoloji Vadisi Yerleşkesi, Doğa Parkı No: 12, Kadıköy / İstanbul</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+90 (212) 444 0 364 (EKO)</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>iletisim@dogakahramanlari.org</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hafta İçi & Cumartesi: 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Mini FAQ */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200">
            <h4 className="font-display font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              Sıkça Sorulan Sorular
            </h4>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3 pt-0 text-[11px] text-slate-600 leading-relaxed bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
