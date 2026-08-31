import type { Category } from '@/types';

// Katalóg služieb.
// Štruktúra: Kategória → Podkategória → Služba → Otázky → Ceny

export const categories: Category[] = [
  {
    id: 'opravy',
    name: 'Opravy',
    icon: 'Wrench',
    description: 'Niečo sa pokazilo? Napíš mi rovno, čo treba opraviť.',
    subcategories: [
      {
        id: 'oprava',
        name: 'Oprava',
        services: [
          {
            id: 'oprava',
            name: 'Oprava',
            description: 'Niečo sa pokazilo? Napíš mi rovno, čo treba opraviť — čo je to za zariadenie a čo je zlé.',
            priceFrom: 'od 5 €',
            descriptionPrompt: 'Napíš, čo treba opraviť.',
            questions: [
              { id: 'co-opravit', label: 'Čo treba opraviť', type: 'textarea', placeholder: 'napr. rozbitý displej na Samsung Galaxy A52, nabíjací port na notebooku, televízor sa nezapaľuje...', required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'vymena-montaz',
    name: 'Výmena / montáž',
    icon: 'Replace',
    description: 'Treba niečo vymeniť alebo namontovať? Napíš mi rovno, čo treba.',
    subcategories: [
      {
        id: 'vymena',
        name: 'Výmena / montáž',
        services: [
          {
            id: 'vymena',
            name: 'Výmena / montáž',
            description: 'Treba niečo vymeniť alebo namontovať? Napíš mi rovno, čo treba vymeniť a v akom zariadení.',
            priceFrom: 'od 5 €',
            descriptionPrompt: 'Napíš, čo treba vymeniť.',
            questions: [
              { id: 'co-vymenit', label: 'Čo treba vymeniť', type: 'textarea', placeholder: 'napr. displej na Samsung Galaxy A52, SSD v notebooku, batéria v tablete...', required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mobily-pc',
    name: 'Mobily / PC',
    icon: 'Smartphone',
    description: 'Operačné systémy, nastavenia, root, ROM, aktualizácie — pre telefóny aj počítače.',
    subcategories: [
      {
        id: 'windows',
        name: 'Windows',
        services: [
          {
            id: 'instalacia-windows',
            name: 'Inštalácia Windows',
            description:
              'Inštalácia Windowsu od nuly. Cena 5–10 € za inštaláciu. Legálna licencia cca 40 € podľa licencie.',
            priceFrom: '5–10 €',
            pricing: { label: '5–10 € za inštaláciu, licencia cca 40 €', negotiable: false },
            hasMaterial: true,
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'pocitac', label: 'Aký máš počítač', type: 'text' },
              { id: 'typ', label: 'Notebook alebo PC', type: 'select', options: ['Notebook', 'Stolný PC'] },
              { id: 'model', label: 'Model', type: 'text' },
              { id: 'zachovat-data', label: 'Chceš zachovať dáta', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'zaloha', label: 'Máš zálohu', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'verzia', label: 'Akú verziu Windows chceš', type: 'text', placeholder: 'napr. Windows 11' },
              { id: 'licencia', label: 'Máš vlastnú licenciu', type: 'select', options: ['Áno', 'Nie', 'Potrebujem'] },
            ],
          },
          {
            id: 'programy-ovladadace',
            name: 'Programy / ovládače',
            description: 'Inštalácia programov a ovládačov pre počítač.',
            priceFrom: '5 €',
            descriptionPrompt: 'Opíš, čo potrebuješ nainštalovať.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie ide', type: 'text' },
              { id: 'programy', label: 'Ktoré programy / ovládače', type: 'textarea', required: true },
              { id: 'os', label: 'Operačný systém', type: 'text' },
            ],
          },
        ],
      },
      {
        id: 'linux-mac',
        name: 'Linux / macOS',
        services: [
          {
            id: 'zmena-os',
            name: 'Zmena operačného systému',
            description: 'Prechod na iný operačný systém — Linux, iná verzia Windows, čokoľvek.',
            priceFrom: '10 €',
            hasMaterial: true,
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie ide', type: 'text', required: true },
              { id: 'z', label: 'Z akého OS prechádzaš', type: 'text' },
              { id: 'na', label: 'Na aký OS chceš prejsť', type: 'text', required: true },
              { id: 'data', label: 'Chceš zachovať dáta', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
          {
            id: 'instalacia-linux',
            name: 'Inštalácia Linuxu',
            description: 'Inštalácia Linuxu na počítač alebo notebook.',
            priceFrom: '10 €',
            hasMaterial: true,
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie ide', type: 'text', required: true },
              { id: 'distribucia', label: 'Ktorú distribúciu chceš', type: 'text', placeholder: 'napr. Ubuntu, Mint, Arch' },
              { id: 'data', label: 'Chceš zachovať dáta', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
        ],
      },
      {
        id: 'android',
        name: 'Android',
        services: [
          {
            id: 'nastavenie-androidu',
            name: 'Nastavenie Androidu',
            description: 'Základné alebo pokročilé nastavenie telefónu s Androidom.',
            priceFrom: '5 €',
            descriptionPrompt: 'Opíš, čo potrebuješ nastaviť.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'verzia', label: 'Aktuálna verzia Androidu', type: 'text' },
              { id: 'co', label: 'Čo chceš nastaviť', type: 'textarea', required: true },
            ],
          },
          {
            id: 'zvysenie-verzie-androidu',
            name: 'Zvýšenie verzie Androidu',
            description:
              'Nie každý telefón podporuje novšiu verziu Androidu. Najskôr potrebujem vedieť presný model a aktuálnu verziu.',
            priceFrom: 'od 7 €',
            example: 'Ahoj, mám Samsung Galaxy A52, momentálne mám Android 12 a chcel by som zistiť, či sa dá dať Android 14. Telefón funguje normálne.',
            descriptionPrompt: 'Opíš svoju požiadavku.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'aktualna', label: 'Aktuálna verzia Androidu', type: 'text', required: true },
              { id: 'cielova', label: 'Na akú verziu chceš prejsť', type: 'text', required: true },
              { id: 'funguje', label: 'Či telefón funguje normálne', type: 'select', options: ['Áno', 'Nie', 'Čiastočne'] },
              { id: 'foto', label: 'Fotka obrazovky „Informácie o telefóne"', type: 'file' },
            ],
          },
          {
            id: 'root-androidu',
            name: 'Root',
            description: 'Rootovanie telefónu s Androidom pre plný prístup k systému.',
            priceFrom: '10 €',
            riskWarning: true,
            descriptionPrompt: 'Opíš svoju požiadavku.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'verzia', label: 'Aktuálna verzia Androidu', type: 'text', required: true },
              { id: 'dovod', label: 'Prečo chceš rootovať', type: 'textarea' },
              { id: 'zaloha', label: 'Máš zálohu dát', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
          {
            id: 'odomknutie-bootloadera',
            name: 'Odomknutie bootloadera',
            description: 'Odomknutie bootloadera pre inštaláciu vlastného softvéru.',
            priceFrom: '10 €',
            riskWarning: true,
            descriptionPrompt: 'Opíš svoju požiadavku.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'verzia', label: 'Aktuálna verzia Androidu', type: 'text', required: true },
              { id: 'zaloha', label: 'Máš zálohu dát', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
          {
            id: 'instalacia-rom',
            name: 'Inštalácia ROM',
            description: 'Inštalácia custom ROM alebo oficiálnej ROM do telefónu.',
            priceFrom: '10 €',
            riskWarning: true,
            hasMaterial: true,
            descriptionPrompt: 'Opíš svoju požiadavku.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'rom', label: 'Ktorú ROM chceš nainštalovať', type: 'text', required: true },
              { id: 'aktualna', label: 'Aktuálna verzia Androidu', type: 'text' },
              { id: 'zaloha', label: 'Máš zálohu dát', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
          {
            id: 'obnova-systemu',
            name: 'Obnova systému',
            description: 'Obnova nefunkčného alebo pomalého systému telefónu.',
            priceFrom: '10 €',
            riskWarning: true,
            descriptionPrompt: 'Opíš problém vlastnými slovami.',
            questions: [
              { id: 'vyrobca', label: 'Značka telefónu', type: 'text', required: true },
              { id: 'model', label: 'Presný model', type: 'text', required: true },
              { id: 'problem', label: 'Aký problém máš', type: 'textarea', required: true },
              { id: 'zaloha', label: 'Máš zálohu dát', type: 'select', options: ['Áno', 'Nie'] },
            ],
          },
        ],
      },
      {
        id: 'ine-os',
        name: 'Iné',
        services: [
          {
            id: 'pomaly-pocitac',
            name: 'Pomalý počítač',
            description: 'Diagnostika a riešenie pomalého chodu počítača alebo notebooku.',
            priceFrom: 'od 5 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš problém vlastnými slovami.',
            questions: [
              { id: 'typ', label: 'Stolný PC alebo notebook', type: 'select', options: ['Stolný PC', 'Notebook'], required: true },
              { id: 'vyrobca', label: 'Značka', type: 'text' },
              { id: 'model', label: 'Model', type: 'text' },
              { id: 'os', label: 'Operačný systém', type: 'text', placeholder: 'napr. Windows 11' },
              { id: 'ram', label: 'RAM', type: 'text', placeholder: 'napr. 8 GB' },
              { id: 'cpu', label: 'Procesor, ak ho poznáš', type: 'text' },
              { id: 'co-pomale', label: 'Čo je pomalé', type: 'text', placeholder: 'napr. štart, otváranie programov, celé fungovanie', required: true },
              { id: 'odkedy', label: 'Odkedy je problém', type: 'text' },
              { id: 'skusal', label: 'Čo si už skúšal', type: 'textarea' },
              { id: 'foto', label: 'Fotka / snímka obrazovky', type: 'file' },
            ],
          },
          {
            id: 'diagnostika',
            name: 'Diagnostika',
            description: 'Kompletná diagnostika hardvéru a softvéru.',
            priceFrom: '5 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš problém vlastnými slovami.',
            questions: [
              { id: 'typ', label: 'Stolný PC alebo notebook', type: 'select', options: ['Stolný PC', 'Notebook'] },
              { id: 'vyrobca', label: 'Značka / model', type: 'text' },
              { id: 'problem', label: 'Aký problém riešiš', type: 'textarea', required: true },
              { id: 'foto', label: 'Snímka obrazovky / fotka', type: 'file' },
            ],
          },
          {
            id: 'riesenie-problemu',
            name: 'Riešenie problému',
            description: 'Riešenie akéhokoľvek problému s telefónom alebo počítačom.',
            priceFrom: 'dohodou',
            descriptionPrompt: 'Opíš problém vlastnými slovami.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie ide', type: 'text' },
              { id: 'problem', label: 'Aký problém máš', type: 'textarea', required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cistenie',
    name: 'Čistenie',
    icon: 'Sparkles',
    description: 'Vyčistenie akejkoľvek elektroniky — telefón, počítač, notebook, čokoľvek. Od 7 €.',
    subcategories: [
      {
        id: 'cistenie-elektronika',
        name: 'Elektronika',
        services: [
          {
            id: 'cistenie-elektroniky',
            name: 'Vyčistenie elektroniky',
            description: 'Vyčistím ti akúkoľvek elektroniku — telefón, počítač, notebook, slúchadlá, myš, klávesnicu, hocičo. Od 7 €.',
            priceFrom: 'od 7 €',
            descriptionPrompt: 'Napíš, čo chceš vyčistiť.',
            questions: [
              { id: 'co-vycistit', label: 'Čo chceš vyčistiť', type: 'textarea', placeholder: 'napr. nabíjací port na Samsung Galaxy A52, klávesnica na notebooku, vnútro počítača od prachu, slúchadlá...', required: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'data',
    name: 'Dáta',
    icon: 'HardDrive',
    description: 'Záloha, prenos, obnova a správa dát.',
    subcategories: [
      {
        id: 'data-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'zaloha-dat-d',
            name: 'Záloha dát',
            description: 'Vytvorenie zálohy dát zo zariadenia.',
            priceFrom: '5–10 €',
            descriptionPrompt: 'Opíš, čo potrebuješ zálohovať.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie ide', type: 'text', required: true },
              { id: 'co', label: 'Čo chceš zálohovať', type: 'textarea' },
              { id: 'kam', label: 'Kam chceš zálohu', type: 'text' },
              { id: 'mnozstvo', label: 'Približné množstvo dát', type: 'text' },
            ],
          },
          {
            id: 'prenos-dat-d',
            name: 'Prenos dát',
            description: 'Prenos dát medzi zariadeniami alebo médiami.',
            priceFrom: '5–10 €',
            descriptionPrompt: 'Opíš, čo potrebuješ preniesť.',
            questions: [
              { id: 'z', label: 'Z akého zariadenia / média', type: 'text', required: true },
              { id: 'na', label: 'Na aké zariadenie / médium', type: 'text', required: true },
              { id: 'co', label: 'Čo chceš preniesť', type: 'textarea' },
              { id: 'mnozstvo', label: 'Približné množstvo dát', type: 'text' },
            ],
          },
          {
            id: 'obnova-dat',
            name: 'Obnova dát',
            description: 'Obnova stratených alebo vymazaných dát.',
            priceFrom: 'od 10 €',
            descriptionPrompt: 'Opíš, aké dáta potrebuješ obnoviť.',
            questions: [
              { id: 'zariadenie', label: 'O aké zariadenie / médium ide', type: 'text', required: true },
              { id: 'co', label: 'Aké dáta chceš obnoviť', type: 'textarea', required: true },
              { id: 'ako', label: 'Ako došlo k strate dát', type: 'text', placeholder: 'napr. vymazanie, formátovanie, chyba' },
              { id: 'kedy', label: 'Kedy došlo k strate', type: 'text' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'licencie',
    name: 'Legálne licencie',
    icon: 'BadgeCheck',
    description: 'Legálne licencie na Windows, Office a ďalší softvér. Žiadne pirátstvo.',
    subcategories: [
      {
        id: 'licencie-sluzby',
        name: 'Licencie',
        services: [
          {
            id: 'windows-licencia',
            name: 'Windows licencia',
            description:
              'Legálna licencia na Windows. Cena cca 40 € podľa typu licencie a verzie.',
            priceFrom: 'cca 40 €',
            pricing: { label: 'cca 40 € podľa licencie', negotiable: false },
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'verzia', label: 'Ktorú verziu Windows chceš', type: 'text', placeholder: 'napr. Windows 11 Home, Pro', required: true },
              { id: 'pocitac', label: 'Aký máš počítač', type: 'text' },
              { id: 'terajsia', label: 'Akú máš teraz licenciu', type: 'text', placeholder: 'napr. nemám, mám ale neviem aktivovať' },
              { id: 'klic', label: 'Máš už kľúč', type: 'select', options: ['Áno', 'Nie', 'Neviem'] },
            ],
          },
          {
            id: 'office-licencia',
            name: 'Office licencia',
            description:
              'Legálna licencia na Microsoft Office (Word, Excel, PowerPoint).',
            priceFrom: 'podľa verzie',
            pricing: { label: 'podľa verzie a typu licencie', negotiable: true },
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'verzia', label: 'Ktorú verziu Office chceš', type: 'text', placeholder: 'napr. Office 2021, Microsoft 365', required: true },
              { id: 'na-co', label: 'Na čo to potrebuješ', type: 'text', placeholder: 'napr. škola, práca, doma' },
              { id: 'klic', label: 'Máš už kľúč', type: 'select', options: ['Áno', 'Nie', 'Neviem'] },
            ],
          },
          {
            id: 'ina-licencia',
            name: 'Iná licencia',
            description:
              'Iný softvér — Antivírus, Photoshop, CAD, čokoľvek. Napíš, čo potrebuješ.',
            priceFrom: 'podľa softvéru',
            pricing: { label: 'podľa softvéru', negotiable: true },
            descriptionPrompt: 'Opíš, akú licenciu potrebuješ.',
            questions: [
              { id: 'softver', label: 'O aký softvér ide', type: 'text', required: true },
              { id: 'na-co', label: 'Na čo to potrebuješ', type: 'text' },
              { id: 'klic', label: 'Máš už kľúč', type: 'select', options: ['Áno', 'Nie', 'Neviem'] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'web',
    name: 'Weby',
    icon: 'Globe',
    description: 'Tvorba, úprava a správa webových stránok.',
    subcategories: [
      {
        id: 'web-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'vytvorenie-webu',
            name: 'Jednoduchý web',
            description: 'Tvorba novej webovej stránky na mieru.',
            priceFrom: 'od 10 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, aký web chceš.',
            questions: [
              { id: 'typ', label: 'Aký web chceš', type: 'text', required: true },
              { id: 'pre-koho', label: 'Pre koho je', type: 'text' },
              { id: 'ucel', label: 'Aký má byť účel', type: 'textarea' },
              { id: 'stranky', label: 'Koľko stránok', type: 'text' },
              { id: 'kontakt-form', label: 'Potrebuješ kontaktný formulár', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'prihlasovanie', label: 'Potrebuješ prihlasovanie', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'databaza', label: 'Potrebuješ databázu', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'logo', label: 'Máš logo', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'domena', label: 'Máš doménu', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'hosting', label: 'Máš hosting', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'priklady', label: 'Pošli príklady webov, ktoré sa ti páčia', type: 'textarea' },
              { id: 'rozpocet', label: 'Aký máš približný rozpočet', type: 'text' },
              { id: 'subory', label: 'Nahrať obrázky alebo dokument', type: 'file' },
            ],
          },
          {
            id: 'uprava-webu',
            name: 'Úprava webu',
            description: 'Úprava existujúcej webovej stránky.',
            priceFrom: 'od 5 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, čo treba upraviť.',
            questions: [
              { id: 'url', label: 'URL webu', type: 'text', required: true },
              { id: 'co', label: 'Čo treba upraviť', type: 'textarea', required: true },
              { id: 'pristup', label: 'Máš prístup do administrácie', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'subory', label: 'Nahrať obrázky alebo dokument', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eshop',
    name: 'E-shopy',
    icon: 'ShoppingCart',
    description: 'Tvorba, úprava a správa internetových obchodov.',
    subcategories: [
      {
        id: 'eshop-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'vytvorenie-eshopu',
            name: 'E-shop',
            description: 'Tvorba nového internetového obchodu na mieru.',
            priceFrom: 'od 20 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, aký e-shop chceš.',
            questions: [
              { id: 'predaj', label: 'Čo budeš predávať', type: 'textarea', required: true },
              { id: 'mnozstvo', label: 'Koľko produktov približne', type: 'text' },
              { id: 'typ-produktov', label: 'Fyzické alebo digitálne produkty', type: 'select', options: ['Fyzické', 'Digitálne', 'Oboje'] },
              { id: 'karta', label: 'Potrebuješ platbu kartou', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'dobierka', label: 'Potrebuješ dobierku', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'doprava', label: 'Aké možnosti dopravy', type: 'textarea' },
              { id: 'logo', label: 'Máš logo', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'domena', label: 'Máš doménu', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'hosting', label: 'Máš hosting', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'foto-produkty', label: 'Máš fotografie produktov', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'sprava-objednavok', label: 'Potrebuješ správu objednávok', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'subory', label: 'Nahrať obrázky alebo dokument', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'video-grafika',
    name: 'Video / grafika',
    icon: 'Clapperboard',
    description: 'Editovanie videa, grafika a vizuálny obsah.',
    subcategories: [
      {
        id: 'video',
        name: 'Video',
        services: [
          {
            id: 'editovanie-videa',
            name: 'Editovanie videa',
            description: 'Strih, úprava a postprodukcia videa.',
            priceFrom: '3–20 €',
            pricing: { label: '3–20 € podľa dohody', negotiable: true },
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, aké video potrebuješ.',
            questions: [
              { id: 'ucel', label: 'Na čo je video', type: 'text', required: true },
              { id: 'platforma', label: 'TikTok / Instagram / YouTube / iné', type: 'text' },
              { id: 'dlzka', label: 'Aká bude približná dĺžka', type: 'text' },
              { id: 'mnozstvo-materialu', label: 'Koľko materiálu máš', type: 'text' },
              { id: 'titulky', label: 'Potrebuješ titulky', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'hudba', label: 'Hudbu', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'efekty', label: 'Efekty', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'strih', label: 'Strih', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'pocet', label: 'Koľko videí', type: 'text' },
              { id: 'subor', label: 'Nahrať video', type: 'file' },
            ],
          },
        ],
      },
      {
        id: 'grafika',
        name: 'Grafika',
        services: [
          {
            id: 'grafika-design',
            name: 'Grafika',
            description: 'Tvorba grafiky, loga, bannerov a ďalšieho vizuálu.',
            priceFrom: 'od 5 €',
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, akú grafiku potrebuješ.',
            questions: [
              { id: 'typ', label: 'Aký typ grafiky', type: 'text', placeholder: 'napr. logo, banner, plagát', required: true },
              { id: 'ucel', label: 'Na čo je grafika', type: 'text' },
              { id: 'styl', label: 'Aký štýl preferuješ', type: 'text' },
              { id: 'farby', label: 'Má konkrétne farby', type: 'text' },
              { id: 'text', label: 'Aký text má obsahovať', type: 'textarea' },
              { id: 'subor', label: 'Nahrať referencie / inšpiráciu', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'socialne-siete',
    name: 'Sociálne siete',
    icon: 'Share2',
    description: 'Správa a tvorba obsahu pre sociálne siete.',
    subcategories: [
      {
        id: 'socialne-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'sprava-socialnych-sieti',
            name: 'Správa sociálnych sietí',
            description: 'Komplexná správa sociálnych sietí.',
            priceFrom: '10 € / mesiac',
            pricing: { label: '10 € / mesiac', negotiable: false },
            descriptionPrompt: 'Opíš, čo potrebuješ.',
            questions: [
              { id: 'siet', label: 'Ktorá sociálna sieť', type: 'text' },
              { id: 'facebook', label: 'Facebook', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'instagram', label: 'Instagram', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'tiktok', label: 'TikTok', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'prispevky', label: 'Koľko príspevkov', type: 'text' },
              { id: 'videa', label: 'Koľko videí', type: 'text' },
              { id: 'spravy', label: 'Potrebuješ odpovedanie na správy', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'obsah', label: 'Potrebuješ vytvárať obsah', type: 'select', options: ['Áno', 'Nie'] },
              { id: 'frekvencia', label: 'Ako často', type: 'text' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ai-automatizacia',
    name: 'AI',
    icon: 'Bot',
    description: 'AI asistenti, automatizácia procesov a inteligentné riešenia.',
    subcategories: [
      {
        id: 'ai-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'ai-asistent',
            name: 'AI asistent',
            description: 'Tvorba jednoduchého AI asistenta na mieru.',
            priceFrom: '1–35 €',
            pricing: { label: '1–35 € podľa rozsahu', negotiable: true },
            descriptionPrompt: 'Opíš, akého AI asistenta potrebuješ.',
            questions: [
              { id: 'ucel', label: 'Na čo má asistent slúžiť', type: 'textarea', required: true },
              { id: 'platforma', label: 'Kde má fungovať', type: 'text', placeholder: 'napr. web, Telegram, Discord' },
              { id: 'funkcie', label: 'Aké funkcie potrebuje', type: 'textarea' },
              { id: 'data', label: 'Má pracovať s konkrétnymi dátami', type: 'textarea' },
            ],
          },
          {
            id: 'automatizacia',
            name: 'Automatizácia',
            description: 'Automatizácia opakujúcich sa procesov a úloh.',
            priceFrom: '1–35 €',
            pricing: { label: '1–35 € podľa rozsahu', negotiable: true },
            descriptionPrompt: 'Opíš, čo chceš automatizovať.',
            questions: [
              { id: 'co', label: 'Čo chceš automatizovať', type: 'textarea', required: true },
              { id: 'aktualne', label: 'Ako to robíš teraz', type: 'textarea' },
              { id: 'nastroje', label: 'Aké nástroje používaš', type: 'text' },
              { id: 'frekvencia', label: 'Ako často sa úloha opakuje', type: 'text' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'mix',
    name: 'Mix',
    icon: 'Shuffle',
    description: 'Nevieš, do akej kategórie to patrí? Nevadí. Napíš mi, čo potrebuješ, a dohodneme sa.',
    subcategories: [
      {
        id: 'mix-sluzby',
        name: 'Napíš čo treba',
        services: [
          {
            id: 'mix-napis-co-treba',
            name: 'Napíš, čo potrebuješ',
            description:
              'Nevieš, do akej kategórie to patrí? Nevadí. Proste mi napíš, čo potrebuješ vyriešiť, a uvidíme sa na to.',
            priceFrom: 'dohodou',
            pricing: { label: 'Dohodou podľa toho, čo to bude', negotiable: true },
            descriptionPrompt: 'Napíš mi, čo potrebuješ.',
            questions: [
              {
                id: 'popis',
                label: 'Čo potrebuješ',
                type: 'textarea',
                placeholder: 'Proste napíš, čo potrebuješ. Nemusíš vedieť, do akej kategórie to patrí.',
                required: true,
              },
              {
                id: 'tyka-sa',
                label: 'Čoho sa to týka (ak vieš)',
                type: 'text',
                placeholder: 'napr. počítač, telefón, web, niečo iné',
              },
              {
                id: 'termin',
                label: 'Približný termín',
                type: 'text',
                placeholder: 'napr. čo najskôr, do týždňa, nie je núhli',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'vlastny-projekt',
    name: 'Vlastný projekt',
    icon: 'Hammer',
    description: 'Máš nápad a chceš, aby sa zrealizoval? Napíš, čo chceš vytvoriť, a dohodneme sa.',
    subcategories: [
      {
        id: 'vlastny-projekt-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'vytvorit-na-mieru',
            name: 'Vytvor mi niečo',
            description:
              'Môže ísť o program, web, aplikáciu, automatizáciu, grafiku, dokument, nástroj, jednoduchého AI asistenta alebo iný projekt. Čokoľvek, čo vymyslíš.',
            priceFrom: 'dohodou',
            pricing: { label: 'Dohodou podľa rozsahu', negotiable: true },
            hasFileUpload: true,
            descriptionPrompt: 'Opíš, čo chceš vytvoriť.',
            questions: [
              { id: 'co', label: 'Čo chceš vytvoriť', type: 'textarea', required: true },
              { id: 'ucel', label: 'Na čo to bude slúžiť', type: 'textarea' },
              { id: 'funkcie', label: 'Aké funkcie má mať', type: 'textarea' },
              { id: 'termin', label: 'Aký máš termín', type: 'text' },
              { id: 'rozpocet', label: 'Aký máš približný rozpočet', type: 'text' },
              { id: 'subory', label: 'Nahrať obrázky alebo dokument', type: 'file' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'domace-veci',
    name: 'Domáce veci',
    icon: 'Home',
    description: 'Niečo doma potrebuje poriadok, opravu alebo pomoc? Napíš mi, čo by si chcel vyriešiť.',
    subcategories: [
      {
        id: 'domace-veci-sluzby',
        name: 'Služby',
        services: [
          {
            id: 'domaca-vec',
            name: 'Napíš mi, čo by si chcel',
            description:
              'Ide o čokoľvek domáce — upratať, niečo opraviť, zmontovať, pomôcť s niečím. Napíš mi, čo by si chcel vyriešiť.',
            priceFrom: 'dohodou',
            pricing: { label: 'Dohodou podľa toho, čo to bude', negotiable: true },
            descriptionPrompt: 'Napíš, čo by si chcel vyriešiť.',
            questions: [
              {
                id: 'popis',
                label: 'Čo by si chcel vyriešiť',
                type: 'textarea',
                placeholder: 'napr. zmontovať nábytok, opraviť dvere, upratať garáž, zavesiť poličku...',
                required: true,
              },
              {
                id: 'termin',
                label: 'Približný termín',
                type: 'text',
                placeholder: 'napr. čo najskôr, do týždňa, nie je núhli',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'nieco-ine',
    name: 'Niečo iné',
    icon: 'HelpCircle',
    description: 'Nenájdenie si svoju požiadavku? Napíš mi vlastnú požiadavku.',
    subcategories: [
      {
        id: 'ine',
        name: 'Iné',
        services: [
          {
            id: 'vlastna-poziadavka',
            name: 'Niečo iné',
            description:
              'Napíš mi, čo potrebuješ. Nemusíš vedieť, do akej kategórie to patrí. Jednoducho mi opíš, čo chceš vyriešiť.',
            priceFrom: 'dohodou',
            pricing: { label: 'Dohodou podľa služby', negotiable: true },
            descriptionPrompt: 'Opíš svoju požiadavku.',
            questions: [
              {
                id: 'popis',
                label: 'Čo potrebuješ',
                type: 'textarea',
                placeholder: 'Napíš mi, čo potrebuješ vyriešiť.',
                required: true,
              },
              {
                id: 'tyka-sa',
                label: 'Čoho sa to týka',
                type: 'text',
                placeholder: 'napr. počítač, telefón, web, niečo iné',
              },
              {
                id: 'termin',
                label: 'Približný termín',
                type: 'text',
                placeholder: 'napr. čo najskôr, do týždňa, nie je núhli',
              },
              {
                id: 'dalsie',
                label: 'Ďalšie informácie',
                type: 'textarea',
              },
            ],
          },
        ],
      },
    ],
  },
];

export function findCategory(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function findSubcategory(categoryId: string, subcategoryId: string) {
  return findCategory(categoryId)?.subcategories.find((subcategory) => subcategory.id === subcategoryId);
}

export function findService(categoryId: string, subcategoryId: string, serviceId: string) {
  return findSubcategory(categoryId, subcategoryId)?.services.find((service) => service.id === serviceId);
}

export interface PriceListEntry {
  service: string;
  price: string;
}

export const priceList: PriceListEntry[] = [
  { service: 'Diagnostika', price: '5 €' },
  { service: 'Oprava', price: 'od 5 € podľa náročnosti' },
  { service: 'Výmena / montáž', price: 'od 5 € podľa náročnosti' },
  { service: 'Čistenie (všetko)', price: '7 €' },
  { service: 'Windows inštalácia', price: '5–10 €' },
  { service: 'Legálna Windows licencia', price: 'približne 40 € podľa licencie' },
  { service: 'Office licencia', price: 'podľa verzie' },
  { service: 'Iná licencia', price: 'podľa softvéru' },
  { service: 'Zmena operačného systému', price: '10 €' },
  { service: 'Inštalácia Linuxu', price: '10 €' },
  { service: 'Programy / ovládače', price: '5 €' },
  { service: 'Android nastavenie', price: '5 €' },
  { service: 'Zvýšenie Androidu', price: 'od 7 €' },
  { service: 'Root / Bootloader / ROM', price: '10 €' },
  { service: 'Záloha dát', price: '5–10 €' },
  { service: 'Prenos dát', price: '5–10 €' },
  { service: 'Obnova dát', price: 'od 10 € podľa problému' },
  { service: 'Jednoduchý web', price: 'od 10 €' },
  { service: 'E-shop', price: 'od 20 €' },
  { service: 'Úprava webu', price: 'od 5 €' },
  { service: 'Editovanie videa', price: '3–20 € podľa dohody' },
  { service: 'Grafika', price: 'od 5 €' },
  { service: 'Sociálne siete', price: '10 € / mesiac' },
  { service: 'AI / automatizácia', price: '1–35 € podľa rozsahu' },
  { service: 'Mix — čokoľvek', price: 'dohodou' },
  { service: 'Vlastný projekt', price: 'dohodou podľa rozsahu' },
  { service: 'Domáce veci', price: 'dohodou' },
  { service: 'Iná služba', price: 'dohodou' },
];
