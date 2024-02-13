
<template>
  <q-page class="flex gap-2 f-default relative bg-bottom">
    <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl"
      class="flex justify-around items-center w-2/4 h-[100svh]  relative ">
      <img src="/imagens/4.svg" class="w-full h-full object-cover" />
    </div>
    <q-card class="grid px-4 py-8 items-start  w-full lg:w-[48%] h-[100svh] md:h-[98svh] my-[1svh]  relative" :style="{
      gridTemplateRows: '100px 1fr 150px'
    }">
      <div class="flex justify-between items-center">
        <q-btn round flat dente icon="mdi-arrow-left" class="text-sprimary" @click="$router.back()" />
        <div class="w-24  flex justify-center items-center ">
          <img alt="Quasar logo" src="/logo1_light.png" class="w-full h-full object-contain ">
        </div>


      </div>
      <div class="flex flex-col justify-start items-center w-full h-full pb-8">
        <q-form class="w-full flex flex-col gap-4 justify-around h-full pt-8" @submit="send">
          <p class=" leading-4 text-4xl text-sprimary font-medium mt-4">Recuperar</p>
          <p class="text-lg text-text ">Digite seu email, que lhe enviaremos um link para resetar sua senha</p>
          <q-input outlined color="primary" label="Email" v-model="email" required clearable />
          <q-btn :loading="loading" label="enviar" size="lg"
            class="rounded-2xl bg-sprimary font-extrabold text-bottom w-2/4 mx-auto mt-8" type="submit" />
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import InputComponent from 'src/components/InputComponent.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    const $q = useQuasar();
    return {
      $q,
      visibility: false,
      email: null,
      loading: false
    };
  },
  mounted() {
    this.email = this.$route.query.email == 'null' ? '' : this.$route.query.email 
  },
  methods: {
    async send() {
      this.loading = true;
      const { error } = await this.$supabase.auth.resetPasswordForEmail(this.email, {
        redirectTo: process.env.VUE_APP_URL + '/reset',
      });
   
      if (error) {

        this.$q.dialog({
          title: "Atenção",
          message: "Houve um erro inesperado, tente novamente em alguns minutos",
          class: "bg-red-7 text-white",
          persistent: true,
          ok: {
            color: 'red-9',
            textColor: 'white',
            label: 'OK'
          }
        })
      } else {
        this.$q.dialog({
          title: "Link Enviado",
          message: "Confira seu email, se o seu email estiver cadastrado, receberá um link para recuperar sua senha.",
          class: "bg-green-7 text-white",
          persistent: true,
          ok: {
            color: 'green-9',
            textColor: 'white',
            label: 'OK'
          }
        })
      }
      this.loading = false
    }
  },
  components: { InputComponent }
})
</script>
