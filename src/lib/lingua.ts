export default (name?: string) => {
  switch (name) {
    default: return en
    case "es": return es
    case "fr": return fr
    case "lfn": return lfn
  }
}

const fn = (singular: string, plural = 's') => {
  return (cuantia: number) => `${singular}${cuantia === 1 ? '' : plural}`
}

const en: Lingua = {
  age: {
    year:   fn('year'),
    month:  fn('month'),
    week:   fn('week'),
    day:    fn('day'),
    hour:   fn('hour'),
    minute: fn('minute'),
    second: fn('second'),
    since: 'since',
    to: 'to'
  },
  day: {
    name: [
      "Monday", "Tuesday",  "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday"
    ],
    abbr: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
    symbol: ["M", "T", "W", "Th", "F", "S", "Su"]
  },
  month: {
    name: [
      "January",   "February", "March",    "April",
      "May",       "June",     "July",     "August",
      "September", "October",  "November", "December"
    ],
    abbr: [
      "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
      "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ],
    symbol: [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]
  }
}

const es: Lingua = {
  age: {
    year:   fn('año'),
    month:  fn('mes', 'es'),
    week:   fn('semana'),
    day:    fn('día'),
    hour:   fn('hora'),
    minute: fn('minuto'),
    second: fn('segundo'),
    since: 'desde',
    to: 'para'
  },
  day: {
    name: [
      "Domingo", "Lunes",   "Martes", "Miércoles",
      "Jueves",  "Viernes", "Sábado"
    ],
    abbr: ["do.", "lu.", "ma.", "mi.", "ju.", "vi.", "sá."],
    symbol: ["D", "L", "M", "X", "J", "V", "S"]
  },
  month: {
    name: [
      "Enero‎",      "Febrero‎", "Marzo‎",     "Abril‎",
      "Mayo‎",       "Junio‎",   "Julio‎",     "Agosto‎",
      "Septiembre‎", "Octubre‎", "Noviembre‎", "Diciembre‎"
    ],
    abbr: [
      "ene.", "feb.", "mar.", "abr.", "may.", "jun.",
      "jul.", "ago.", "sep.", "oct.", "nov.", "dic."
    ],
    symbol: [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ]
  }
}

const fr: Lingua = {
  age: {
    year:   fn('année'),
    month:  fn('mois', ''),
    week:   fn('semaine'),
    day:    fn('jour'),
    hour:   fn('heure'),
    minute: fn('minute'),
    second: fn('seconde'),
    since: 'depuis',
    to: 'à'
  },
  day: {
    name: [
      "Lundi",    "Mardi",  "Mercredi", "Jeudi",
      "Vendredi", "Samedi", "Dimanche"
    ],
    abbr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    symbol: ["L", "M", "M", "J", "V", "S", "D"]
  },
  month: {
    name: [
      "Janvier",   "Février", "Mars",     "Avril",
      "Mai",       "Juin",    "Juillet",  "Août",
      "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    abbr: [
      "janv.",  "févr.", "mars",  "avr.", "mai",  "juin",
      "juill.", "août",  "sept.", "oct.", "nov.", "déc."
    ],
    symbol: [
      "JAN", "FÉV", "MAR", "AVR", "MAI", "JUN",
      "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"
    ]
  }
}

const lfn: Lingua = {
  age: {
    year:   fn('anio'),
    month:  fn('mense'),
    week:   fn('semana'),
    day:    fn('dia'),
    hour:   fn('ora'),
    minute: fn('minuto'),
    second: fn('secondo'),
    since: 'de',
    to: 'a'
  },
  day: {
    name: [
      "Lundi", "Martedi",  "Mercudi", "Jovedi",
      "Venerdi", "Saturdi", "Soldi"
    ],
    abbr: ["Lun.", "Mar.", "Mer.", "Jov.", "Ven.", "Sat.", "Sol."],
    symbol: ["L", "M", "Me", "J", "V", "S", "So"]
  },
  month: {
    name: [
      "Janero",   "Febrero", "Marci",    "April",
      "Maio",     "Junio",   "Julio",    "Agosto",
      "Setembre", "Otobre",  "Novembre", "Desembre"
    ],
    abbr: [
      "Jan.", "Feb.", "Mar.", "Apr.", "Mai", "Jun.",
      "Jul.", "Ago.", "Set.", "Oto.", "Nov.", "Des."
    ],
    symbol: [
      "JAN", "FEB", "MAR", "APR", "MAI", "JUN",
      "JUL", "AGO", "SET", "OTO", "NOV", "DES"
    ]
  }
}

type spec = {
    name: string[],
    abbr: string[],
    symbol: string[]
}
export type Lingua = {
  age: {
    year:   (Q: number) => string
    month:  (Q: number) => string
    week:   (Q: number) => string
    day:    (Q: number) => string
    hour:   (Q: number) => string
    minute: (Q: number) => string
    second: (Q: number) => string
    since: string
    to: string
  }
  day: spec
  month: spec
}
