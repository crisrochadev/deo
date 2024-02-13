import { useStorage } from '@vueuse/core';

import { defineStore } from 'pinia';
import { date } from 'src/boot/moment';

export const useConfig = defineStore('config', {
  state: () => ({
    menu: [
      {
        id: 1,
        icon: 'mdi-home',
        label: 'Inicio',
        path: '/admin',
        tab: true
      },
      {
        id: 2,
        icon: 'mdi-wallet-bifold',
        label: 'Despesas',
        path: '/admin/expenses',
        tab: true
      },
      {
        id: 3,
        icon: 'mdi-plus',
        label: 'Adicionar',
        path: '/admin/add',
        especial: true,
        tab: true
      },
      {
        id: 4,
        icon: 'mdi-wallet-plus',
        label: 'Entradas',
        path: '/admin/incoming',
        tab: true
      },
      {
        id: 5,
        icon: 'mdi-account',
        label: 'Conta',
        path: '/admin/account',
        tab: true

      },
      {
        id: 6,
        icon: 'mdi-calculator-variant',
        label: 'Calculadora',
        path: '/admin/calculator',
      },
      {
        id: 7,
        icon: 'mdi-calendar-today',
        label: 'Agenda',
        path: '/admin/agenda'
      },
      {
        id: 8,
        icon: 'mdi-cogs',
        label: 'Configurações',
        path: '/admin/settings'
      }
    ],
    
    calculator:false,
    languageFormat: {
      months: [
        { full: 'Janeiro', abbr: 'Jan', num: '01' },
        { full: 'Fevereiro', abbr: 'Fev', num: '02' },
        { full: 'Março', abbr: 'Mar', num: '03' },
        { full: 'Abril', abbr: 'Abr', num: '04' },
        { full: 'Maio', abbr: 'Mai', num: '05' },
        { full: 'Junho', abbr: 'Jun', num: '06' },
        { full: 'Julho', abbr: 'Jul', num: '07' },
        { full: 'Agosto', abbr: 'Ago', num: '08' },
        { full: 'Setembro', abbr: 'Set', num: '09' },
        { full: 'Outubro', abbr: 'Out', num: '10' },
        { full: 'Novembro', abbr: 'Nov', num: '11' },
        { full: 'Dezembro', abbr: 'Dez', num: '12' }
      ],
      daysOfWeek: [
        { full: 'Domingo', abbr: 'Dom', num: '01' },
        { full: 'Segunda', abbr: 'Seg', num: '02' },
        { full: 'Terça', abbr: 'Ter', num: '03' },
        { full: 'Quarta', abbr: 'Qua', num: '04' },
        { full: 'Quinta', abbr: 'Qui', num: '05' },
        { full: 'Sexta', abbr: 'Sex', num: '06' },
        { full: 'Sábado', abbr: 'Sáb', num: '07' }
      ]
    }
    ,
    month: {
      full: date().format('MMMM'),
      abbr: date().format('MMM'),
      num: date().format('MM')
    },
    year: date().format('YYYY'),
    theme: useStorage('theme', 'default_light'),
    totalIncoming: 4600.85,
    totalExpense: 3065.65,
    completedValue: 1253.33,
    saldo: 365.69,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
     
   
    
  },
});
