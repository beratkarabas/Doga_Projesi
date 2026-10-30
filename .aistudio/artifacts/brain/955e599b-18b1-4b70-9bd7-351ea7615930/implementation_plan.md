# Doğa Kahramanları & Sosyal Farkındalık Web Platformu

Doğa ve çevre bilincini artırmayı hedefleyen; sol menü navigasyonu, zengin orta içerik panelleri, Puki ile interaktif eğitsel çevre oyunu, ilham veren sözler paneli ve gerçek zamanlı tarih/saat göstergesini bir araya getiren modern bir sosyal farkındalık web platformu.

### User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı mülakatında kesinleşen tercihler plana dahil edilmiştir:
> - **Eğitsel Oyun**: Sayfa içine doğrudan gömülü, 4 farklı seviye (Park, Orman, Göl, Şehir Temizliği), ses efektleri ve Puki rehberliği içeren tam oynanabilir interaktif oyun motoru.
> - **Navigasyon Deneyimi**: Sol menüden seçilen 6 kategoriye ("Ana Sayfa", "Projelerimiz", "Bilgilendirme", "Etkinlikler", "Eğitsel Oyunlar", "İletişim") göre dinamik panel geçişleri ve akıcı geçiş animasyonları.
> - **Özel Görsel Üretimi**: Mevcut Puki ve çevre çizimleriyle tam uyumlu fırça/illüstrasyon tarzında; Projeler & Etkinlikler çizimleri, Doğa Kahramanı başarı rozetleri ve Geri Dönüşüm Rehberi kart görselleri oluşturulacaktır.

---

### 1. Overview & Core Concept

- **What It Does**: Çocuklar, gençler ve çevre gönüllüleri için ekolojik sürdürülebilirlik, sıfır atık, orman koruma, temiz su ve yenilenebilir enerji konularını hem bilgilendirici paneller hem de interaktif bir oyun deneyimiyle sunar.
- **Target Audience / Persona**: Öğrenciler, öğretmenler, çevre kulüpleri ve doğa farkındalığı kazanmak isteyen her yaştan kullanıcı.
- **Key Value**: Eğlenceli oyunlaştırma (gamification) ile çevre eğitimini birleştirerek pasif okuma yerine aktif katılım ve kalıcı çevre bilinci sağlar.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Giriş & Karşılama (Ana Sayfa)**: Canlı ekolojik sayaçlar (kurtarılan ağaçlar, dönüştürülen atıklar), güncel çevre kampanyaları, hızlı keşif kartları ve Puki'nin günün mesajı.
2. **Kategori Navigasyonu (Sol Menü)**:
   - *Ana Sayfa*: Kahraman vitrini, hızlı istatistikler, farkındalık kartları.
   - *Projelerimiz*: "Yeşil Vaha", "Mavi Göller", "Sıfır Atık Okulu" gibi somut projelerin interaktif detay kartları ve ilerleme çubukları.
   - *Bilgilendirme*: Atık türleri (Plastik, Cam, Kağıt, Organik, Elektronik), ayrıştırma kuralları ve karbon ayak izi ipuçları.
   - *Etkinlikler*: Fidan dikim şenlikleri, kıyı temizleme günleri, atölye takvimi ve katılım formu.
   - *Eğitsel Oyunlar*: Puki rehberliğinde Park, Orman, Göl ve Şehir seviyelerinden oluşan Web Audio ses efektli tam interaktif Doğa Kahramanı oyunu.
   - *İletişim*: Gönüllü katılım formu, okul işbirlikleri ve sosyal medya erişim kanalları.
3. **İlham Veren Sözler (Sağ Panel)**: Atatürk, Rachel Carson, David Attenborough, Jane Goodall gibi isimlerin doğa sözleri; "Yeni Söz Getir" butonu ve otomatik yumuşak geçiş efektleri.
4. **Zaman & Takvim (Sağ Üst)**: Saniyeli dijital saat, Türkçe gün/ay/yıl takvim göstergesi.

#### Visual Identity & Theme
- **Aesthetic Direction**: Canlı, samimi, çocuksu neşeyi kurumsal temizlikle buluşturan çevre dostu modern illüstratif arayüz.
- **Color Palette & Mood (60-30-10 Kuralı)**:
  - *%60 Dominant Tuval*: Taze nötr açık zemin (`#F7FAF7` / `#F0FDF4`).
  - *%30 Yapısal Yüzeyler*: Doğa yeşili ve gökyüzü mavisi zeminler (`#15803D`, `#0284C7`, `#ECFDF5`).
  - *%10 Vurgu*: Güneş turuncusu (`#EA580C`, `#F59E0B`) ile aktif butonlar, ödül pırıltıları ve bildirimler.
- **Typography & Hierarchy**:
  - *Başlıklar & Marka*: `Plus Jakarta Sans` / `Outfit` (Modern, net, davetkar).
  - *Gövde Metinleri*: `Plus Jakarta Sans` (15-16px, yüksek okunabilirlik).
  - *Metrikler & Saat*: Monospace tabular rakamlar (`tabular-nums font-mono`).
- **Component Styling & Layout**:
  - Desktop 3 sütunlu ferah yerleşim: Sabit/şık Sol Kenar Çubuğu (260px) + Canlı Geniş Orta İçerik Alanı (Fluid) + Sağ İlham & Bilgi Paneli (300px).
  - Mobil/Tablet: Gizlenebilir sol menü hamburger çekmecesi ve akıllı sıralama.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Tam Oynanabilir Gömülü Oyun Motoru**
  - *Yaklaşım*: Kullanıcının paylaştığı `Doganin_Kahramani_9225d081.html` oyun mantığını (Puki rehberi, Web Audio ses sentezleyicisi, sürükle/tıkla atık ayrıştırma, yangın söndürme, su arıtma, hava temizliği) modern React bileşen mimarisine optimize ederek "Eğitsel Oyunlar" sekmesine doğrudan entegre etmek.
  - *Neden*: Sayfadan ayrılmadan kusursuz oyun deneyimi ve doğrudan öğrenme etkisi.
- **Decision 2: Dinamik Sekme & Panel Mimarisi**
  - *Yaklaşım*: URL hash veya React state kontrollü akıcı sekme geçişi; gereksiz sayfa yenilenmesi olmadan hızlı render.
  - *Neden*: Uygulama içi akıcılık, anlık yanıt süresi ve bileşen durumlarının (saat, aktif oyun oturumu) korunması.
- **Decision 3: Uyumlu Yeni Görsel Üretimi**
  - *Yaklaşım*: `generate_image` aracıyla mevcut Puki baykuş ve park illüstrasyonlarıyla aynı temiz hatlara ve neşeli palete sahip 4 özel görsel üretimi:
    1. Projelerimiz için yeşil fidan ve çevre temizleme illüstrasyonu (`eco_project_nature`)
    2. Doğa kahramanı rozet & madalya illüstrasyonu (`eco_hero_badge`)
    3. Geri dönüşüm kutuları ve ayrıştırma kılavuz görseli (`recycling_guide_illustration`)
    4. Temiz göl ve su canlıları koruma illüstrasyonu (`water_wildlife_eco`)

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          DOĞA KAHRAMANLARI PLATFORMU                            │
├────────────────────┬───────────────────────────────────────┬────────────────────┤
│    SOL NAVİGASYON  │             ORTA PANEL                │     SAĞ BÖLÜM      │
│  (Sabit Sidebar)   │         (Dinamik İçerik)              │ (İlham & Araçlar)  │
├────────────────────┼───────────────────────────────────────┼────────────────────┤
│ • Logo & Puki Maskot│ [Aktif Sekmeye Göre Değişen İçerik]:  │ • [Sağ Üst Köşe]   │
│ • Ana Sayfa        │  1. Ana Sayfa (İstatistik + Hero)     │   Dijital Saat     │
│ • Projelerimiz     │  2. Projelerimiz (Kartlar + İlerleme) │   Canlı Takvim     │
│ • Bilgilendirme    │  3. Bilgilendirme (Atık & Ekoloji)    │                    │
│ • Etkinlikler      │  4. Etkinlikler (Takvim & Kayıt)      │ • İlham Veren      │
│ • Eğitsel Oyunlar  │  5. Eğitsel Oyun (Puki Mini Oyun)     │   Sözler Kartı     │
│ • İletişim         │  6. İletişim (Gönüllü Formu)          │   - Dinamik Sözler │
│                    │                                       │   - "Yeni Söz" Btn │
│ • Sürdürülebilirlik│ • Canlı Doğal İpuçları Bildirimi      │                    │
│   Durumu           │ • İnteraktif Eko-Eylemler             │ • Mini Doğa        │
│                    │                                       │   İpuçları Kutusu  │
└────────────────────┴───────────────────────────────────────┴────────────────────┘
```

#### Data Model & State
- `activeTab`: "home" | "projects" | "info" | "events" | "game" | "contact"
- `currentTime` & `currentDate`: `setInterval(1000)` ile senkronize edilen anlık zaman verisi.
- `currentQuoteIndex`: İlham veren 15+ çevreci düşünür ve bilim insanı sözü arasında rastgele/sıralı geçiş.
- `gameState`: Oyun seviyesi (1-4), toplanan atıklar, temizlik puanı ve kazanılan rozetler.
- `volunteerFormState`: Kullanıcı kayıt ve mesajlaşma geri bildirimleri.
