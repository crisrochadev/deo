<template>
  <q-page>

    <div class="p-2 grid grid-cols-2 grid-rows-2 gap-2 h-[150px] transition-all delay-75"
      :class="[show ? 'mt-2' : '-mt-[150px]']">
      <q-card class="" flat>
        <q-item>
          <q-item-section>
            <q-item-label>Entrada</q-item-label>
            <q-item-label class=" font-bold text-lg text-blue">{{ store.totalIncoming.toLocaleString("pt-BR", {
              style:
                "currency", currency: "BRL"
            }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <q-card flat>
        <q-item>
          <q-item-section>
            <q-item-label>Valor pago</q-item-label>
            <q-item-label class="font-bold text-lg "
              :class="[store.ammountPaid >= 0 && store.ammountPaid <= store.totalExpense / 2 ? 'text-red' : store.ammountPaid > store.totalExpense / 2 ? 'text-orange' : 'text-red']">{{
                store.ammountPaid.toLocaleString("pt-BR", {
                  style:
                    "currency", currency: "BRL"
                }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card flat>
        <q-item>
          <q-item-section>
            <q-item-label>Para pagar</q-item-label>
            <q-item-label class="font-bold text-lg "
              :class="[store.unpaidAmmount > 0 && store.unpaidAmmount > store.totalExpense ? 'text-blue' : store.unpaidAmmount > store.totalExpense / 2 ? 'text-orange' : 'text-red']">{{
                store.unpaidAmmount.toLocaleString("pt-BR", {
                  style:
                    "currency", currency: "BRL"
                }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <q-card flat>
        <q-item>
          <q-item-section>
            <q-item-label>saldo</q-item-label>
            <q-item-label class="font-bold text-lg " :class="[store.balance < 0 ? 'text-red' : 'text-green']">{{
              store.balance.toLocaleString("pt-BR", {
                style:
                  "currency", currency: "BRL"
              }) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <q-card flat style="grid-row:3;grid-column:1/3" class="bg-bottom text-text">
      <q-item>
        <q-item-section side>
          <q-btn icon="mdi-chart-areaspline" class="bg-sprimary text-white" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="whitespace-nowrap">Total de despesas</q-item-label>
          <q-item-label v-if="visibility" class="font-bold text-lg text-sprimary whitespace-nowrap">
            {{ store.totalExpense.toLocaleString("pt-BR", {
              style:
                "currency", currency: "BRL"
            }) }}</q-item-label>
          <q-item-label v-else class="font-bold text-xl text-brown">-</q-item-label>
        </q-item-section>
        <q-item-section side class="">
          <div class="flex items-center w-28 gap-2 flex-nowrap">
            <q-btn @click="visibility = !visibility" :icon="visibility ? 'visibility' : 'visibility_off'" unelevated round
              dense class="text-sprimary" />
            <q-btn @click="showCalc = true" icon="mdi-calculator-variant" dense unelevated round class="text-sprimary" />
            <q-btn @click="show = !show" :icon="show ? 'mdi-menu-up' : 'mdi-menu-down'" unelevated round dense
              class="text-sprimary" />
          </div>
        </q-item-section>

      </q-item>
    </q-card>
    <div class="mt-2 p-2 flex">
      <div spread class="flex justify-between flex-1">
        <q-btn class="text-sprimary text-lg w-10" icon="mdi-menu-left" unelevated @click="() => {
          store.month = {
            full: $date(`${store.year}-${store.month.num}-01`).subtract(1, 'months').format('MMMM'),
            abbr: $date(`${store.year}-${store.month.num}-01`).subtract(1, 'months').format('MMM'),
            num: $date(`${store.year}-${store.month.num}-01`).subtract(1, 'months').format('MM'),
          }
          getData()
        }" />
        <q-btn @click="() => {
          store.month = {
            full: $date().format('MMMM'),
            abbr: $date().format('MMM'),
            num: $date().format('MM'),
          }
          getData()
        }" class="text-sprimary text-md" icon="mdi-restore" unelevated />
        <q-btn-dropdown class="text-sprimary flex-1 text-md" :label="store.month.full" unelevated>
          <q-list dense separator class="bg-bottom text-text" :class="store.theme">
            <q-item clickable v-close-popup @click="() => {
              store.month = item;
              getData()
            }" v-for="item in config.languageFormat.months" :key="item.abbr"
              :class="[item.full.toLowerCase() == store.month.full.toLowerCase() ? ' bg-sprimary text-text' : ' text-sprimary bg-bottom']">
              <q-item-section class="uppercase font-bold text-xs">{{ item.full }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn class="text-sprimary text-lg w-10" icon="mdi-menu-right" unelevated @click="() => {
          store.month = {
            full: $date(`${store.year}-${store.month.num}-01`).add(1, 'months').format('MMMM'),
            abbr: $date(`${store.year}-${store.month.num}-01`).add(1, 'months').format('MMM'),
            num: $date(`${store.year}-${store.month.num}-01`).add(1, 'months').format('MM'),
          }
          getData()
        }" />
      </div>

    </div>
    <q-list ref="list" class="bg-bottom p-2">
      <q-slide-item @left="props => onLeft(props, row)" @right="props => onRight(props, row)" v-for="row in rows"
        :key="row.id" class="bg-bottom my-2 rounded text-text" :class="config.theme">
        <template v-slot:left>
          <q-icon name="done" />
        </template>
        <template v-slot:right>
          <q-icon name="alarm" />
        </template>
        <q-item>
          <q-item-section side class="w-14">
            <q-icon size="xs" :name="row.completed ? 'check' : 'alarm'"
              :class="row.completed ? 'text-green' : 'text-orange'" />
          </q-item-section>
          <q-item-section side class="w-full text-text">
            {{ row.title.length > 20 ? row.title.substring(0, 20) : row.title }}
          </q-item-section>
          <q-item-section side class="w-20 whitespace-nowrap f-default font-bold text-sprimary text-md">
            R$ {{ row.ammount > 9999999 ? row.ammount.toLocaleString('pt-BR').substring(0, 9) :
              row.ammount.toLocaleString('pt-BR') }}
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </q-page>
</template>
<script>
import { useMotionControls, useMotionProperties } from '@vueuse/motion';
import { useQuasar } from 'quasar'
import { useConfig } from 'src/stores/config';
import Chart from 'chart.js/auto';
import { useStorage } from '@vueuse/core';
import { useControl } from 'src/stores/control';

export default {
  data() {
    const $q = useQuasar();
    const config = useConfig()
    const store = useControl()
    return {
      $q,
      store,
      config,
      timer: null,
      show: false,
      visibility: useStorage('visibility', false),
      columns: [
        {
          label: '',
          name: 'completed',
          field: 'completed'
        },
        {
          label: '',
          name: 'title',
          field: 'title'
        },
        {
          label: '',
          name: 'ammount',
          field: 'ammount'
        },
        {
          label: '',
          name: 'actions',
          field: 'actions'
        }
      ],

    }
  },
  computed: {
    rows: {
      get() {
        return this.store.expenses
      },
      set(newvalue) {
        this.store.expenses = newvalue;
      }
    },
    showCalc: {
      get() {
        return this.config.calculator
      },
      set(newvalue) {
        this.config.calculator = newvalue
      }
    }
  },

  methods: {
    async getData() {
      await this.store.getControls()
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    },
    onLeft({ reset }, row) {
      row.completed = true
      this.$q.notify({
        message: 'Despesa marcada como paga',
        color: 'green',
        position: 'bottom'
      })
      this.finalize(reset)
    },

    onRight({ reset }, row) {
      row.completed = false
      this.$q.notify({
        message: 'Despesa marcada como NÂO paga',
        color: 'orange',
        position: 'bottom'
      })
      this.finalize(reset)
    },
    handleShow() {
      const view = this.$refs.views;
      const list = this.$refs.list;
      console.log(view.style.marginTop)
      view.style.marginTop = view.style.marginTop == '0px' ? '-200px' : 0;
      this.visibility = view.style.marginTop == '0px' ? true : false;

    }
  }
}
</script>