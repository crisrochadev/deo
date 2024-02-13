<template>
  <q-layout view="hhh lpR fFf" class="bg-bottom f-default">

    <q-header class="bg-bottom text-sprimary">
      <q-toolbar>
        <q-btn dense flat round :icon="menuOpen ? 'close' : 'menu'" @click="menuOpen = !menuOpen" />

        <q-toolbar-title class="flex flex-1 justify-center items-center gap-2 uppercase text-sm font-bold">
          {{ $route.meta.title }}
        </q-toolbar-title>

        <q-btn icon="mdi-compare" round dense flat @click="changeTheme" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="menuOpen" side="left" overlay behavior="desktop" bordered class="bg-bottom">
      <q-tabs vertical inline-label class="text-text" active-class="text-sprimary">
        <q-route-tab content-class="w-full h-full" class="h-10" exact :to="item.path"
          v-for="item in config.menu.filter(m => !m.especial)" :key="item.id" v-close-popup>
          <div class="w-full  flex justify-start gap-2 items-center h-full" style="width: 100% !important;">
            <q-icon :name="item.icon" size="sm" />
            <p class="text-sm">{{ item.label }}</p>
          </div>
        </q-route-tab>
        <q-btn class="full-width h-10" v-close-popup flat @click="signout">
          <div class="w-full  flex justify-start gap-2 items-center h-full" style="width: 100% !important;">
            <q-icon name="mdi-logout" size="sm" />
            <p class="text-sm">Sair</p>
          </div>
        </q-btn>
      </q-tabs>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer class="h-14 bg-bottom">
      <q-tabs content-class="bg-bottom text-sprimary" active-class="text-text" spread narrow-indicator
        indicator-color="transparent">
        <template v-for="item in config.menu.filter(m => m.tab)" :key="item.id">
          <q-btn @click="add = !add" v-if="item.especial" round :icon="item.icon" padding="4px"
            class="bg-sprimary text-text text-lg p-1" />
          <q-route-tab exact :to="item.path" v-else>
            <q-icon :name="item.icon" class="text-3xl" />
          </q-route-tab>
        </template>

      </q-tabs>
    </q-footer>

    <q-dialog v-model="add" position="bottom">
      <q-card :class="config.theme">

        <q-item>
          <q-item-section class="flex items-center gap-2 flex-nowrap">
            <!-- <q-icon  :name="control.type == 'expense' ? 'mdi-wallet-bifold' : 'mdi-wallet-plus'" color="primary"/> -->
            <q-btn-toggle v-model="control.type" toggle-class="text-sprimary" flat class="text-sm whitespace-nowrap"
              :options="[
                { label: 'Nova Despesa', value: 'expense', inlineLabel: true },
                { label: 'Nova Entrada', value: 'incoming', inlineLabel: true },
              ]" />
          </q-item-section>
          <q-item-section side>
            <q-btn round flat icon="close" class="text-sprimary" v-close-popup />,
          </q-item-section>
        </q-item>



        <q-form class="p-4 flex flex-col gap-2">
          <q-input outlined label="Titulo" dense required />
          <q-input outlined label="Valor" dense v-model="control.ammount" mask="#,##" reverse-fill-mask prefix="R$"
            required inputmode="number" />
          <q-input outlined label="Data" dense v-model="control.duedate" mask="##/##/####">
            <template #after>
              <q-btn icon="mdi-calendar" unelevated>
                <q-menu>
                  <q-date v-model="control.duedate" />
                </q-menu>
              </q-btn>
            </template>
          </q-input>
          <q-btn-toggle v-model="control.repeat" class-color="text-sprimary" spread flat class="text-xs whitespace-nowrap"
            :options="[
              { label: 'Não repetir', value: 'unique' },
              { label: 'Parcelar', value: 'installments' },
              { label: 'Fixo', value: 'fixed' }
            ]" />
          <q-input outlined label="Nº de parcelas" dense v-if="control.repeat == 'installments'" type="number" />
          <q-input outlined label="Descrição" type="textarea" dense />
          <q-btn :icon="control.type == 'expense' ? 'mdi-wallet-bifold' : 'mdi-wallet-plus'"
            :label="`Salvar ${control.type == 'expense' ? 'Despesa' : 'Entrada'}`"
            class="full-width bg-sprimary text-white mt-4 rounded-lg" size="lg" />
        </q-form>

      </q-card>
    </q-dialog>
    <calculator v-model:model="config.calculator" />
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import { useConfig } from 'src/stores/config';
import moment from 'moment'
import Calculator from 'src/components/Calculator.vue';

export default {
  data() {
    const config = useConfig();
    const $q = useQuasar();
    return {
      menuOpen: false,
      config,
      $q,
      add: false,
      addTitle: 'Despesa',
      addIcon: 'mdi-wallet-bifold',
      control: {
        title: '',
        ammount: '',
        installments: 1,
        repeat: 'unique',
        duedate: moment().format('DD/MM/YYYY'),
        type: 'expense'
      }
    };
  },
  methods: {
    changeTheme() {
      this.config.theme = this.config.theme.includes('dark') ?
        this.config.theme.replace('dark', 'light') :
        this.config.theme.replace('light', 'dark');
    },
    async signout() {
      const { error } = await this.$supabase.auth.signOut();
      console.log(error);
      if (error) {
        this.$q.dialog({
          title: "Oooops!",
          message: "Ocorreu um erro inesperado, tente novamente em alguns minutos",
          ok: {
            label: "OK",
            class: "bg-red-8 text-white"
          },
          class: "bg-red-5 text-white"
        });
      }
      else {
        console.log('aqui');
        this.$router.push('/');
      }
    }
  },
  components: { Calculator }
}
</script>