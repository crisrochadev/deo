import { boot } from 'quasar/wrappers'
import moment from 'moment'
import 'moment/locale/pt-br';
moment.locale('pt-br', {
  months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  monthsParseExact: true,
  weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
  weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek: 'dddd [passada às] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: function (number) {
    return number + 'º';
  },
  meridiemParse: /AM|PM/,
  isPM: function (input) {
    return input.charAt(0) === 'P';
  },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'AM' : 'PM';
  },
  week: {
    dow: 1, // Segunda-feira é o primeiro dia da semana.
    doy: 4  // Usado para determinar a primeira semana do ano.
  }
});


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export const date = moment;
export default boot(async ({ app }) => {
  app.config.globalProperties.$date = date
})
