// FloorVerdict texts that only one country's languages had: a type or a product not sold in Sweden
// or in Spain still needs Swedish and Spanish, because every language can be read in every country
// (src/i18n/editions.ts). Keyed by the Italian text (see lib/translate.ts).
type Dict = Record<string, string>;

// The robot every country but Sweden, Spain and Poland lists.
const ecovacsT80s = {
  es: {
    'Lava con un rullo che si pulisce mentre gira, e la base lo lava in acqua calda e lo asciuga: l’essenziale per casa, spendendo meno.':
      'Friega con un rodillo que se limpia mientras gira, y la base lo lava con agua caliente y lo seca: lo esencial para casa, gastando menos.',
    'miglior robot economico nella classifica di 20 robot di Vacuum Wars (settembre 2026)': 'mejor robot económico en la clasificación de 20 robots de Vacuum Wars (septiembre de 2026)',
    'Rullo che si lava mentre gira': 'Rodillo que se lava mientras gira',
    'In acqua calda fino a 75 °C': 'Con agua caliente hasta 75 °C',
    'Aria a 63 °C': 'Aire a 63 °C',
    'Telecamera con intelligenza artificiale': 'Cámara con inteligencia artificial',
  },
  pl: {
    'Lava con un rullo che si pulisce mentre gira, e la base lo lava in acqua calda e lo asciuga: l’essenziale per casa, spendendo meno.':
      'Myje wałkiem, który czyści się podczas obracania, a stacja pierze go w gorącej wodzie i suszy: to, co najważniejsze w domu, za mniejsze pieniądze.',
    'miglior robot economico nella classifica di 20 robot di Vacuum Wars (settembre 2026)': 'najlepszy tani robot w rankingu 20 robotów Vacuum Wars (wrzesień 2026)',
    'Rullo che si lava mentre gira': 'Wałek myty podczas obracania',
    'In acqua calda fino a 75 °C': 'W gorącej wodzie do 75 °C',
    'Aria a 63 °C': 'Powietrze o temperaturze 63 °C',
    'Telecamera con intelligenza artificiale': 'Kamera ze sztuczną inteligencją',
  },
  sv: {
    'Lava con un rullo che si pulisce mentre gira, e la base lo lava in acqua calda e lo asciuga: l’essenziale per casa, spendendo meno.':
      'Den moppar med en rulle som rengörs medan den snurrar, och basen tvättar den i varmt vatten och torkar den: det viktigaste för hemmet, till ett lägre pris.',
    'miglior robot economico nella classifica di 20 robot di Vacuum Wars (settembre 2026)': 'bästa budgetrobot i Vacuum Wars ranking av 20 robotar (september 2026)',
    'Rullo che si lava mentre gira': 'Rulle som rengörs medan den snurrar',
    'In acqua calda fino a 75 °C': 'I varmt vatten upp till 75 °C',
    'Aria a 63 °C': 'Luft på 63 °C',
    'Telecamera con intelligenza artificiale': 'Kamera med artificiell intelligens',
  },
} satisfies Record<string, Dict>;

// The cordless wet-dry vacuums, not sold in Sweden.
const wetSv: Dict = {
  'lavapavimenti-senza-fili': 'vat-och-torrdammsugare',
  'Lavapavimenti senza fili': 'Våt- och torrdammsugare',
  'Quale lavapavimenti senza fili comprare?': 'Vilken våt- och torrdammsugare ska du köpa?',
  'Una lavapavimenti senza fili aspira e lava in una sola passata, poi si pulisce da sola.': 'En våt- och torrdammsugare dammsuger och våttorkar i ett enda drag och rengör sig sedan själv.',
  'lavapavimenti senza fili': 'våt- och torrdammsugare',
  'Lavapavimenti senza fili: quale comprare nel {year}': 'Våt- och torrdammsugare: vilken ska du köpa {year}',
  'Quale lavapavimenti senza fili comprare? Dicci cosa conta per te e vedi subito il modello adatto, con prezzo, test indipendenti, caratteristiche e fonti.':
    'Vilken våt- och torrdammsugare ska du köpa? Berätta vad som är viktigt för dig och se direkt rätt modell, med pris, oberoende tester, egenskaper och källor.',
  'La lavapavimenti senza fili giusta per casa tua': 'Rätt våt- och torrdammsugare för ditt hem',
  'Anche queste lavapavimenti senza fili vanno bene': 'De här våt- och torrdammsugarna fungerar också bra',
  'Una lavapavimenti senza fili fa per te se': 'En våt- och torrdammsugare passar dig om',
  'La lavapavimenti senza fili non fa per te se': 'En våt- och torrdammsugare passar inte dig om',
  'Come scegliere una lavapavimenti senza fili': 'Så väljer du en våt- och torrdammsugare',
  'Domande frequenti sulla lavapavimenti senza fili': 'Vanliga frågor om våt- och torrdammsugare',
  'Hai soprattutto pavimenti duri: piastrelle, gres, laminato.': 'Du har mest hårda golv: kakel, klinker, laminat.',
  'Vuoi aspirare e lavare in una sola passata, senza secchio.': 'Du vill dammsuga och våttorka i ett enda drag, utan hink.',
  'Hai molti tappeti: sui tappeti non si usa.': 'Du har många mattor: den används inte på mattor.',
  'Vuoi che pulisca da sola: guarda i robot.': 'Du vill att den städar själv: titta på robotarna.',
  'Si pulisce da sola': 'Rengör sig själv',
  'Dopo l’uso risciacqua e asciuga il rullo nella base: niente cattivi odori.': 'Efter användning sköljer och torkar den rullen i basen: ingen dålig lukt.',
  'Sotto i mobili': 'Under möblerna',
  'Se si piega fino a terra arriva sotto letti e divani, dove si accumula la polvere.': 'Om den kan fällas ner helt mot golvet kommer den in under sängar och soffor, där dammet samlas.',
  'Acqua calda o vapore': 'Varmvatten eller ånga',
  'Servono per lo sporco secco e unto; per la pulizia di ogni giorno basta l’acqua.': 'De behövs för intorkad och fet smuts; till den dagliga städningen räcker vatten.',
  'La pulizia di ogni giorno': 'Den dagliga städningen',
  'Sporco incrostato, cucina': 'Intorkad smuts, kök',
  'Una lavapavimenti sostituisce mocio e secchio?': 'Ersätter en våt- och torrdammsugare mopp och hink?',
  'Sui pavimenti duri sì: aspira lo sporco e lava nella stessa passata, tenendo l’acqua sporca separata da quella pulita. Sui tappeti invece non va usata.':
    'På hårda golv, ja: den suger upp smutsen och våttorkar i samma drag och håller det smutsiga vattnet skilt från det rena. På mattor ska den däremot inte användas.',
  'Va bene sul parquet?': 'Fungerar den på parkett?',
  'In genere sì, perché usa poca acqua e il pavimento asciuga in fretta; controlla comunque le indicazioni di chi ha posato il tuo parquet.':
    'Oftast ja, eftersom den använder lite vatten och golvet torkar snabbt; kontrollera ändå vad den som lade ditt parkettgolv rekommenderar.',
  'Serve il vapore?': 'Behövs ånga?',
  'Per la pulizia di tutti i giorni no. Aiuta con lo sporco secco o unto, per esempio in cucina: per questo lo consigliamo solo come seconda scelta.':
    'Inte för den dagliga städningen. Den hjälper mot intorkad eller fet smuts, till exempel i köket: därför rekommenderar vi den bara som andraval.',
  'Si piega fino a terra e arriva sotto letti e divani, poi si lava da sola con acqua a 70 °C.':
    'Den kan fällas ner helt mot golvet och kommer in under sängar och soffor, och sedan rengör den sig själv med 70 °C vatten.',
  '2ª su 10 lavapavimenti e la migliore per qualità-prezzo (Vacuum Wars, settembre 2026)': '2:a av 10 våt- och torrdammsugare och bäst valuta för pengarna (Vacuum Wars, september 2026)',
  'Si piega a 180°, alta 13 cm': 'Fälls ner 180°, 13 cm hög',
  'Acqua e asciugatura a 70 °C': 'Vatten och torkning på 70 °C',
  'Vapore a 180 °C e acqua calda a 86 °C nella stessa macchina: per lo sporco secco e i pavimenti della cucina.':
    'Ånga på 180 °C och varmvatten på 86 °C i samma maskin: för intorkad smuts och köksgolv.',
  '5ª su 10 lavapavimenti nei test di Vacuum Wars (settembre 2026)': '5:a av 10 våt- och torrdammsugare i Vacuum Wars tester (september 2026)',
  'Vapore 180 °C, acqua 86 °C': 'Ånga 180 °C, vatten 86 °C',
  'Asciugatura ad aria a 95 °C': 'Lufttorkning på 95 °C',
};

// The steam mops, not sold in Spain.
const steamEs: Dict = {
  'scopa-a-vapore': 'mopa-de-vapor',
  'Scopa a vapore': 'Mopa de vapor',
  'Quale scopa a vapore comprare?': '¿Qué mopa de vapor comprar?',
  'Una scopa a vapore lava i pavimenti duri solo con acqua e vapore, senza detersivi, ed è pronta in mezzo minuto.':
    'Una mopa de vapor friega los suelos duros solo con agua y vapor, sin detergentes, y está lista en medio minuto.',
  'scopa a vapore': 'mopa de vapor',
  'Scopa a vapore: quale comprare nel {year}, secondo i test': 'Mopa de vapor: cuál comprar en {year}, según las pruebas',
  'Quale scopa a vapore comprare? Vedi subito il modello adatto a casa tua, con prezzo, risultati dei test indipendenti e dati ufficiali, tutto con fonte.':
    '¿Qué mopa de vapor comprar? Ve al momento el modelo adecuado para tu casa, con precio, resultados de pruebas independientes y datos oficiales, todo con fuente.',
  'La scopa a vapore giusta per casa tua': 'La mopa de vapor adecuada para tu casa',
  'Anche queste scope a vapore vanno bene': 'Estas mopas de vapor también sirven',
  'Una scopa a vapore fa per te se': 'Una mopa de vapor es para ti si',
  'La scopa a vapore non fa per te se': 'Una mopa de vapor no es para ti si',
  'Come scegliere una scopa a vapore': 'Cómo elegir una mopa de vapor',
  'Domande frequenti sulla scopa a vapore': 'Preguntas frecuentes sobre la mopa de vapor',
  'Hai pavimenti duri: piastrelle, gres, parquet verniciato.': 'Tienes suelos duros: baldosas, gres, parqué barnizado.',
  'Vuoi lavare senza detersivi, per esempio con bambini piccoli o animali.': 'Quieres fregar sin detergentes, por ejemplo con niños pequeños o mascotas.',
  'Hai legno cerato, oliato o non sigillato: il vapore lo rovina.': 'Tienes madera encerada, aceitada o sin sellar: el vapor la estropea.',
  'Ti serve anche aspirare: la scopa a vapore lava, ma non raccoglie briciole e polvere.': 'También necesitas aspirar: la mopa de vapor friega, pero no recoge migas ni polvo.',
  'Pronta subito': 'Lista al momento',
  'Le scope a vapore verticali sono pronte in circa 30 secondi: le accendi e parti.': 'Las mopas de vapor verticales están listas en unos 30 segundos: las enciendes y empiezas.',
  'Serbatoio e metri quadri': 'Depósito y metros cuadrados',
  'Guarda quanti m² lava con un pieno: per un appartamento normale conviene poterlo fare senza fermarsi.':
    'Mira cuántos m² friega con un depósito lleno: en un piso normal conviene poder hacerlo sin parar.',
  'Vapore regolabile': 'Vapor regulable',
  'Meno vapore per il legno sigillato, più per le piastrelle: con un tasto sul manico è comodo.': 'Menos vapor para la madera sellada, más para las baldosas: con un botón en el mango es cómodo.',
  'Per quasi tutte le case': 'Para casi todas las casas',
  'Leggera, per una casa piccola': 'Ligera, para una casa pequeña',
  'La scopa a vapore disinfetta?': '¿La mopa de vapor desinfecta?',
  'Kärcher dichiara che toglie fino al 99,999% dei virus e il 99,9% dei batteri dalle superfici dure, ma con il vapore al massimo tenuto 30 secondi sullo stesso punto. Passandola come si fa di solito, pulisce a fondo senza detersivi; per disinfettare un punto preciso bisogna fermarsi lì.':
    'Kärcher declara que elimina hasta el 99,999 % de los virus y el 99,9 % de las bacterias de las superficies duras, pero con el vapor al máximo durante 30 segundos sobre el mismo punto. Pasándola como se hace normalmente, limpia a fondo sin detergentes; para desinfectar un punto concreto hay que detenerse en él.',
  'Si può usare sul parquet?': '¿Se puede usar en el parqué?',
  'Solo sul legno sigillato, cioè verniciato o laccato, con il vapore al minimo e senza fermarsi a lungo nello stesso punto. Su legno cerato, oliato o grezzo no.':
    'Solo en madera sellada, es decir, barnizada o lacada, con el vapor al mínimo y sin detenerse mucho en el mismo punto. En madera encerada, aceitada o sin tratar, no.',
  'Serve l’acqua distillata?': '¿Hace falta agua destilada?',
  'Con questi Kärcher no: una cartuccia anticalcare toglie il calcare dall’acqua del rubinetto. Va cambiata ogni tanto.':
    'Con estas Kärcher no: un cartucho antical elimina la cal del agua del grifo. Hay que cambiarlo de vez en cuando.',
};

export const more = {
  es: { ...ecovacsT80s.es, ...steamEs },
  pl: ecovacsT80s.pl,
  sv: { ...ecovacsT80s.sv, ...wetSv },
};
