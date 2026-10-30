export interface Quote {
  id: number;
  text: string;
  author: string;
  title: string;
  topic: string;
}

export const NATURE_QUOTES: Quote[] = [
  {
    id: 1,
    text: "Yurt toprağı! Sana her şey feda olsun. Kutlu olan sensin. Hepimiz senin için can veririz; fakat sen yaşayacaksın.",
    author: "Mustafa Kemal Atatürk",
    title: "Türkiye Cumhuriyeti Kurucusu",
    topic: "Vatan & Toprak Sevgisi"
  },
  {
    id: 2,
    text: "Doğayı korumak sadece bir sorumluluk değil; gelecek kuşaklara olan en büyük borcumuzdur.",
    author: "Hayrettin Karaca",
    title: "TEMA Vakfı Kurucusu (Toprak Dede)",
    topic: "Toprak & Ağaç Bilinci"
  },
  {
    id: 3,
    text: "Doğada hiçbir şey tek başına var olmaz; her yaprak, her damla su birbirine görünmez bağlarla bağlıdır.",
    author: "Rachel Carson",
    title: "Biyolog & 'Sessiz Bahar' Yazarı",
    topic: "Ekolojik Denge"
  },
  {
    id: 4,
    text: "Gezegenimizi kurtarmak için tek bir kahramana değil; milyarlarca insanın küçük ama kararlı adımlarına ihtiyacımız var.",
    author: "Sir David Attenborough",
    title: "Doğa Tarihçisi & Yayıncı",
    topic: "Küresel Eylem"
  },
  {
    id: 5,
    text: "Yaptığınız her şey bir fark yaratır. Ne tür bir fark yaratmak istediğinize karar vermeniz gerekir.",
    author: "Dr. Jane Goodall",
    title: "Primatolog & BM Barış Elçisi",
    topic: "Bireysel Sorumluluk"
  },
  {
    id: 6,
    text: "Ağaç dikmek, geleceğe bırakılan en somut umut tohumudur.",
    author: "Wangari Maathai",
    title: "Nobel Barış Ödüllü Çevreci",
    topic: "Orman ve Yaşam"
  },
  {
    id: 7,
    text: "Denizler temiz kaldığı sürece bu mavi gezegen nefes almaya devam edecektir.",
    author: "Jacques-Yves Cousteau",
    title: "Oşinograf & Deniz Kaşifi",
    topic: "Okyanus ve Su Koruması"
  },
  {
    id: 8,
    text: "Doğanın hızına ayak uydur; onun en büyük sırrı sonsuz sabrında gizlidir.",
    author: "Ralph Waldo Emerson",
    title: "Düşünür & Yazar",
    topic: "Doğa Felsefesi"
  },
  {
    id: 9,
    text: "Dünya herkesin ihtiyacına yetecek kadarını sunar, fakat herkesin hırsına yetecek kadarını asla.",
    author: "Mahatma Gandhi",
    title: "Düşünür & Lider",
    topic: "Sürdürülebilirlik"
  },
  {
    id: 10,
    text: "Gittiğin her yerde doğayı bir sanat eseri gibi koru; çünkü o eşsiz bir mirastır.",
    author: "John Muir",
    title: "Milli Parklar Öncüsü & Doğasever",
    topic: "Yaban Hayatı Koruma"
  }
];
