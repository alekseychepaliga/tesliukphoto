/* ============================================================
   TESLIUK TETIANA — единственный файл, который нужно править,
   чтобы поменять контент сайта.

   Структура (фото, пропорции, раскладка) — общая для двух языков.
   Все тексты лежат в i18n.uk и i18n.en.
   ============================================================ */

window.SITE = {

  /* Язык по умолчанию: "uk" или "en". Выбор посетителя запоминается. */
  defaultLang: "uk",

  name: "Tesliuk Tetiana",

  contact: {
    phone: "+380 66 597 10 51",
    instagram: "https://www.instagram.com/tes.look/",
    telegram: "https://t.me/teslook"
  },

  /* ---------------------------------------------------------
     КОЛЛАЖ НА ПЕРВОМ ЭКРАНЕ.
     Раскладка один в один с макетом. Лента едет по кругу
     бесконечно, все кадры идут ПОД заголовком.
       src   — путь к фото
       x     — отступ слева в % ширины экрана
       w     — ширина в % ширины экрана
       t     — отступ сверху в % высоты экрана
               (минус = кадр подрезан верхним краем)
       ratio — пропорция кадра: "3/2", "4/3", "16/9"
     Блок раскладки шириной 100% экрана повторяется по кругу.
     --------------------------------------------------------- */
  hero: [
    { src: "images/hero/carina.jpg",       x:  0.0, w: 20.5, t:  10.5, ratio: "4/3"  },
    { src: "images/hero/drift-sunset.jpg", x: 23.9, w: 16.1, t:  -6.1, ratio: "3/2"  },
    { src: "images/hero/drift-bmw.jpg",    x: 63.1, w: 26.9, t:  -0.8, ratio: "16/9" },
    { src: "images/hero/carwash.jpg",      x: 22.5, w: 36.3, t:  31.0, ratio: "3/2"  },
    { src: "images/hero/mechanic.jpg",     x: 63.1, w: 14.2, t:  40.2, ratio: "3/2"  },
    { src: "images/hero/hilux.jpg",        x: 85.3, w:  8.8, t:  53.6, ratio: "3/2"  },
    { src: "images/hero/driver.jpg",       x: 60.8, w: 21.8, t:  68.3, ratio: "3/2"  }
  ],

  /* ---------------------------------------------------------
     ПРОЕКТЫ — только структура.
     Названия, описания и локации — в i18n.<язык>.projects.<slug>
     ratio: "portrait" (4:5) | "landscape" | "square"
     --------------------------------------------------------- */
  projects: [
    {
      slug: "night-practice",
      category: "Racing",
      year: "2025",
      cover: "images/hero/drift-bmw.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/drift-bmw.jpg", ratio: "portrait" },
        { src: "images/hero/mechanic.jpg",  ratio: "portrait" }
      ]
    },
    {
      slug: "apex",
      category: "Racing",
      year: "2025",
      cover: "images/hero/drift-sunset.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/drift-sunset.jpg", ratio: "portrait" }
      ]
    },
    {
      slug: "chrome",
      category: "Automotive",
      year: "2025",
      cover: "images/hero/carwash.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/carwash.jpg", ratio: "portrait" }
      ]
    },
    {
      slug: "coastal-roll",
      category: "Automotive",
      year: "2024",
      cover: "images/hero/carina.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/carina.jpg", ratio: "portrait" }
      ]
    },
    {
      slug: "brand-day",
      category: "Commerce",
      year: "2025",
      cover: "images/hero/hilux.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/hilux.jpg", ratio: "portrait" }
      ]
    },
    {
      slug: "lookbook",
      category: "Commerce",
      year: "2024",
      cover: "images/hero/driver.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/driver.jpg", ratio: "portrait" }
      ]
    },
    {
      slug: "garage-light",
      category: "CarStories",
      year: "2025",
      cover: "images/hero/mechanic.jpg",
      ratio: "portrait",
      images: [
        { src: "images/hero/mechanic.jpg", ratio: "portrait" }
      ]
    }
  ],

  /* Клиенты в бегущей строке — имена собственные, не переводятся */
  clients: ["Hungaroring", "Red Bull Ring", "Porsche Club UA", "Autodrom", "RRT Racing", "Open Drift UA"],

  /* ==========================================================
     ТЕКСТЫ
     ========================================================== */
  i18n: {

    /* ---------------------- УКРАЇНСЬКА ---------------------- */
    uk: {
      htmlLang: "uk",
      label: "UA",

      titles: {
        index:   "Tesliuk Tetiana — фотографка · перегони, автомобілі, комерція",
        about:   "Про мене — Tesliuk Tetiana",
        contact: "Контакти — Tesliuk Tetiana",
        project: "Проєкт — Tesliuk Tetiana"
      },
      description: "Фотографка Тетяна Теслюк. Перегони, автомобільна та комерційна зйомка.",

      nav: { work: "Роботи", about: "Про мене", contact: "Контакти", talk: "Напишіть мені" },

      hero: {
        role: "Фотографка",
        tagline: "Перегони · Автомобілі · Авто комерція",
        based: "База — Одеса",
        available: "Працюю по всьому світу",
        scroll: "Гортай",
        tags: ["01 — Перегони", "02 — Автомобілі", "03 — Авто комерція"]
      },

      sections: {
        selectedWork: "Вибрані роботи",
        whatIShoot:   "Що я знімаю",
        services:     "Послуги",
        servicesNum:  "01 — 04",
        about:        "Про мене",
        aboutSub:     "Тетяна Теслюк — фотографка",
        intro:        "Вступ",
        nextProject:  "Наступний проєкт",
        contact:      "Контакти"
      },

      filterAll: "Усі",
      categories: { Racing: "Перегони", Automotive: "Автомобілі", Commerce: "Авто комерція", CarStories: "Car Stories" },

      services: [
        { title: "Перегони",   desc: "Трек, піт-лейн, падок. Репортаж з гоночного вікенду та зйомка для команд і спонсорів." },
        { title: "Автомобілі", desc: "Статика і ролінг-шоти. Зйомка автомобілів для дилерів, тюнінг-ательє та приватних власників." },
        { title: "Авто комерція", desc: "Комерційна зйомка для брендів: предметка, лукбуки, рекламні кампанії та контент для соцмереж." },
        { title: "Car Stories", desc: "Зйомка власників разом з їхніми машинами — в гаражі, у дворі, на улюбленій дорозі. Живі кадри про те, як люблять своє авто." }
      ],

      bio: [
        "Знімаю швидкість і речі, які її оточують. Перегони, автомобільна та комерційна зйомка — три різні дисципліни, в яких мене цікавить одне й те саме: момент, коли людина або машина перестають позувати.",
        "Працюю з гоночними командами, автомобільними брендами та приватними клієнтами. Знімаю на треку, в студії та на локації по всій Україні."
      ],
      facts: ["років знімаю", "гоночних вікендів", "зйомок"],

      teaser: "Мене цікавить момент, коли людина або машина перестають позувати. На треку це частки секунди, у студії — година тиші.",
      more: "Детальніше про мене →",

      meta: { category: "Категорія", year: "Рік", location: "Локація", frames: "Кадрів" },

      projects: {
        "night-practice": {
          title: "Night Practice",
          location: "Hungaroring",
          intro: "Нічна практика перед етапом. Дві години, в які вміщується весь сезон — механіки, дощ на асфальті та світло фар у піт-лейні.",
          captions: ["Піт-лейн, 23:40", "Механіка"]
        },
        "apex": {
          title: "Apex",
          location: "Red Bull Ring",
          intro: "Серія про точку повороту. Довгі витримки, в яких машина лишається різкою, а світ навколо — ні.",
          captions: ["Поворот 3"]
        },
        "chrome": {
          title: "Chrome",
          location: "Студія",
          intro: "Студійна зйомка кузова як обʼєкта. Одне джерело світла, чорний фон і вісім годин на відображення.",
          captions: [""]
        },
        "coastal-roll": {
          title: "Coastal Roll",
          location: "Карпати",
          intro: "Ролінг-шоти на серпантині. Зйомка з відкритого багажника на швидкості 60 км/год, світанок і один дубль на кожен поворот.",
          captions: [""]
        },
        "brand-day": {
          title: "Brand Day",
          location: "Одеса",
          intro: "Знімальний день для бренду: кампейн, предметка і контент для соцмереж за одну зміну. Знято на локації, з командою клієнта.",
          captions: [""]
        },
        "lookbook": {
          title: "Lookbook",
          location: "Студія",
          intro: "Сезонний лукбук для локального бренду. Рівне світло, чистий фон і сто кадрів, з яких у каталог пішло двадцять.",
          captions: [""]
        },
        "garage-light": {
          title: "Garage Light",
          location: "Гараж",
          intro: "Вечір у гаражі з власником і його машиною. Руки в мастилі, лампа під стелею і розмова, яка триває довше за зйомку.",
          captions: [""]
        }
      },

      contactPage: {
        sub: "Відкрита для зйомок і колаборацій",
        phone: "Телефон",
        socials: "Соцмережі",
        base: "База",
        baseValue: "Одеса, UA — зйомки по всьому світу",
        tgLink: "Звʼязок в Telegram",
        formName: "Як вас звати",
        formContact: "Телеграм або телефон",
        formMsg: "Про зйомку",
        send: "Надіслати",
        mailSubject: "Заявка з сайту",
        mailName: "Імʼя",
        mailContact: "Контакт",
        copied: "Текст скопійовано — вставте його в чат"
      },

      footer: { big1: "Працюймо", big2: "разом" }
    },

    /* ------------------------ ENGLISH ----------------------- */
    en: {
      htmlLang: "en",
      label: "EN",

      titles: {
        index:   "Tesliuk Tetiana — Photographer · Racing, Automotive, Auto Commerce",
        about:   "About — Tesliuk Tetiana",
        contact: "Contact — Tesliuk Tetiana",
        project: "Project — Tesliuk Tetiana"
      },
      description: "Photographer Tetiana Tesliuk. Racing, automotive and commercial work.",

      nav: { work: "Work", about: "About", contact: "Contact", talk: "Let’s talk" },

      hero: {
        role: "Photographer",
        tagline: "Racing · Automotive · Auto Commerce",
        based: "Based in Odesa",
        available: "Available worldwide",
        scroll: "Scroll",
        tags: ["01 — Racing", "02 — Automotive", "03 — Auto Commerce"]
      },

      sections: {
        selectedWork: "Selected Work",
        whatIShoot:   "What I shoot",
        services:     "Services",
        servicesNum:  "01 — 04",
        about:        "About",
        aboutSub:     "Tetiana Tesliuk — Photographer",
        intro:        "Intro",
        nextProject:  "Next project",
        contact:      "Contact"
      },

      filterAll: "All",
      categories: { Racing: "Racing", Automotive: "Automotive", Commerce: "Auto Commerce", CarStories: "Car Stories" },

      services: [
        { title: "Racing",     desc: "Track, pit lane, paddock. Race-weekend reportage and shoots for teams and sponsors." },
        { title: "Automotive", desc: "Static and rolling shots. Cars for dealers, tuning shops and private owners." },
        { title: "Auto Commerce", desc: "Commercial work for brands: product, lookbooks, campaigns and social content." },
        { title: "Car Stories", desc: "Owners together with their cars — in the garage, in the yard, on a favourite road. Living frames about loving your car." }
      ],

      bio: [
        "I shoot speed and the things around it. Racing, automotive and commercial work — three different disciplines where I’m after the same thing: the moment a person or a car stops posing.",
        "I work with racing teams, car brands and private clients. On track, in the studio and on location across Ukraine."
      ],
      facts: ["years shooting", "race weekends", "shoots"],

      teaser: "I’m after the moment a person or a car stops posing. On track that’s a fraction of a second; in the studio, an hour of silence.",
      more: "More about me →",

      meta: { category: "Category", year: "Year", location: "Location", frames: "Frames" },

      projects: {
        "night-practice": {
          title: "Night Practice",
          location: "Hungaroring",
          intro: "Night practice before the round. Two hours that hold a whole season — mechanics, rain on asphalt and headlights in the pit lane.",
          captions: ["Pit lane, 23:40", "Mechanics"]
        },
        "apex": {
          title: "Apex",
          location: "Red Bull Ring",
          intro: "A series about the turning point. Long exposures where the car stays sharp and the world around it doesn’t.",
          captions: ["Turn 3"]
        },
        "chrome": {
          title: "Chrome",
          location: "Studio",
          intro: "A studio shoot of a body as an object. One light source, a black backdrop and eight hours spent on reflections.",
          captions: [""]
        },
        "coastal-roll": {
          title: "Coastal Roll",
          location: "Carpathians",
          intro: "Rolling shots on a mountain road. Shot from an open boot at 60 km/h, at dawn, one take per corner.",
          captions: [""]
        },
        "brand-day": {
          title: "Brand Day",
          location: "Odesa",
          intro: "A shooting day for a brand: campaign, product and social content in a single session. On location, with the client’s team.",
          captions: [""]
        },
        "lookbook": {
          title: "Lookbook",
          location: "Studio",
          intro: "A seasonal lookbook for a local brand. Even light, a clean backdrop and a hundred frames, twenty of which made the catalogue.",
          captions: [""]
        },
        "garage-light": {
          title: "Garage Light",
          location: "Garage",
          intro: "An evening in the garage with an owner and his car. Oil on his hands, a lamp under the ceiling and a conversation that outlasts the shoot.",
          captions: [""]
        }
      },

      contactPage: {
        sub: "Open for shoots and collaborations",
        phone: "Phone",
        socials: "Socials",
        base: "Based",
        baseValue: "Odesa, UA — shooting worldwide",
        tgLink: "Message on Telegram",
        formName: "Your name",
        formContact: "Telegram or phone",
        formMsg: "About the shoot",
        send: "Send",
        mailSubject: "Enquiry from the website",
        mailName: "Name",
        mailContact: "Contact",
        copied: "Text copied — paste it into the chat"
      },

      footer: { big1: "Let’s", big2: "work" }
    }
  }
};
