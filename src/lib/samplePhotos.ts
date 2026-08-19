export type Photo = {
  src: string;
  alt: string;
  caption: string;
  span: "normal" | "tall" | "wide";
};

export const MEETING_DATE = new Date("2024-06-15T00:00:00");
export const MEETING_LABEL = "15.06.2024";
export const MEETING_SHORT = "15.06.24";
export const MEETING_LONG = "15 Haziran 2024";

export const photos: Photo[] = [
  {
    src: "/sample-melis/banner-01.jpg",
    alt: "Melis ve sevgilisi, sokakta el ele",
    caption: "Kadife. Omuz. Aynı nefes.",
    span: "wide",
  },
  {
    src: "/sample-melis/banner-02.jpg",
    alt: "Parkta Melis'in yanağına kondurulan öpücük",
    caption: "Kabuk. Gölge. Yanak.",
    span: "wide",
  },
  {
    src: "/sample-melis/banner-03.jpg",
    alt: "Teras kafede Melis'in gülüşü ve öpücüğü",
    caption: "Gülüşün yankısı, ışıkların ötesinde.",
    span: "wide",
  },
  {
    src: "/sample-melis/moment-01.jpg",
    alt: "Kafede sıcak kahve ve derin bakışlar",
    caption: "Dışarı bulanık. İçerisi net.",
    span: "normal",
  },
  {
    src: "/sample-melis/moment-02.jpg",
    alt: "Gece sokakta flaşlı samimi gülüşler",
    caption: "Flaş. Karanlık geri çekilir.",
    span: "normal",
  },
  {
    src: "/sample-melis/moment-03.jpg",
    alt: "Gün batımında tepeden denize bakarken sarılma",
    caption: "Göz kapalı. Dünya dışarıda.",
    span: "wide",
  },
  {
    src: "/sample-melis/moment-04.jpg",
    alt: "Çimlerde karpuz yerken kahkahalar",
    caption: "Kırmızı dilim. Yeşil gürültü.",
    span: "wide",
  },
  {
    src: "/sample-melis/moment-05.jpg",
    alt: "Eğlenceli yanak sıkma selfiesi",
    caption: "Ciddiyetin çatlağı, en saf neşe.",
    span: "tall",
  },
  {
    src: "/sample-melis/moment-06.jpg",
    alt: "Siyah beyaz sessiz ve derin kucaklaşma",
    caption: "Alın alına kilit.",
    span: "tall",
  },
  {
    src: "/sample-melis/moment-07.jpg",
    alt: "Araba yolculuğunda rüzgara karşı gülüşler",
    caption: "Yol uzun, yanındaki sen olunca kısa.",
    span: "tall",
  },
  {
    src: "/sample-melis/moment-08.jpg",
    alt: "Kafede tatlı paylaşma anı",
    caption: "Sıcak bir durak, ortak bir tat.",
    span: "normal",
  },
  {
    src: "/sample-melis/moment-09.jpg",
    alt: "Sahilde gün batımı kumlar üstünde sırtında taşıma",
    caption: "Dalgaların sesi, ayakların bildiği yön.",
    span: "tall",
  },
  {
    src: "/sample-melis/moment-10.jpg",
    alt: "Melis'in kahve içerken sıcacık portresi",
    caption: "Fısıltı kadar net, gözlerin içi gülüyor.",
    span: "normal",
  },
  {
    src: "/sample-melis/moment-11.jpg",
    alt: "Kafede Melis'in objektifinden sevgilisi",
    caption: "Tek çerçeve, sonsuz huzur.",
    span: "normal",
  },
  {
    src: "/sample-melis/moment-12.jpg",
    alt: "Vapurda İstanbul Boğazı gün batımında sarılma",
    caption: "Şehrin ortasında iki kalp, bir nefes.",
    span: "wide",
  },
];

export const featured = [
  {
    src: "/sample-melis/moment-03.jpg",
    title: "Günbatımı",
    text: "Dünya, bir yanağın genişliği kadar küçülür.",
  },
  {
    src: "/sample-melis/moment-12.jpg",
    title: "Boğazda İki Nefes",
    text: "Işıklar asılı. Asıl parlayan başka.",
  },
  {
    src: "/sample-melis/moment-09.jpg",
    title: "Kumsalda Neşe",
    text: "Parmaklar, cümlenin giremediği yere gider.",
  },
];

export const babyPhoto = {
  src: "/sample-melis/baby-01.jpg",
  alt: "Melis'in çocukluk fotoğrafı",
  caption: "İsimlerden önce.",
};
