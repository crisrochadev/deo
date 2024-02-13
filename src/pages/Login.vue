<template>
  <q-page class="flex gap-2 f-default relative bg-bottom">
    <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl"
      class="flex justify-around items-center w-2/4 h-[100svh]  relative ">
      <img src="/imagens/2.svg" class="w-full h-full object-cover" />
    </div>
    <q-card class="grid px-4  items-start  w-full lg:w-[48%] h-[100svh] md:h-[98svh] my-[1svh]  relative" :style="{
      gridTemplateRows: '70px 1fr 200px'
    }">
      <div class="flex justify-between items-center">
        <q-btn round flat dente icon="mdi-arrow-left" class="text-sprimary" @click="$router.back()" />
        <div class="w-24  flex justify-center items-center ">
          <img alt="Quasar logo" src="/logo1_light.png" class="w-full h-full object-contain ">
        </div>


      </div>
      <div class="flex flex-col justify-start items-center w-full h-full pb-8">
        <q-form autocomplete="off" class="w-full flex flex-col gap-4 justify-around h-full pt-8" @submit="login">
          <p class=" leading-4 text-4xl text-sprimary font-medium mt-4 mb-4">Entrar</p>
          <q-input outlined color="primary" required label="Email" :rules="[
            val => !!val || 'Digite o Email',
            val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val) || 'Email inválido',
          ]" v-model="user.email" clearable />
          <q-input outlined color="primary" required label="Senha" :type="visibility ? 'text' : 'password'"
            v-model="user.password" clearable>
            <template #append>
              <q-btn :icon="visibility ? 'visibility_off' : 'visibility'" round dense flat
                @click="visibility = !visibility" />
            </template>
          </q-input>
          <p class="w-full text-left text-sprimary">
            Esqueceu a senha? <q-btn flat dense label="Recuperar" :to="`/send-reset?email=${user.email}`" />
          </p>
          <q-btn :loading="loading" label="entrar" size="lg"
            class="rounded-2xl bg-sprimary font-extrabold text-bottom w-2/4 mx-auto mt-8" type="submit" />
        </q-form>
      </div>
      <div class="border-t-2 border-sprimary  w-full relative flex justify-center items-center h-full gap-4 pt-3">
        <span class="block absolute left-2/4 -translate-x-2/4 -top-7 text-sprimary bg-bottom p-4">ou</span>
        <q-btn icon="mdi-facebook" round class="bg-sprimary text-white" size="xl" />
        <q-btn icon="mdi-google" round class="bg-sprimary text-white" size="xl" />
        <p class="w-full text-center  text-sprimary">
          Ainda não tem conta? <q-btn flat dense label="Cadastre-se" to="register" />
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import InputComponent from 'src/components/InputComponent.vue';
import { useAuth } from 'src/stores/auth';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    const $q = useQuasar();
    const auth = useAuth();
    return {
      $q,
      auth,
      loading: false,
      visibility: false,
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    async login(e) {
      this.loading = true;
      e.preventDefault();

      const { data, error } = await this.$supabase.auth.signInWithPassword({
        email: this.user.email,
        password: this.user.password,
        options: {
          emailRedirectTo: 'http://localhost:9200/admin',
        },
      });

      console.log(data)
      if (error) {
        if (error.toString().includes('Invalid login credentials')) {
          this.$q.dialog({
            title: "Não foi possivel entrar!",
            message: "Verifique os dados digitados",
            ok: {
              label: "OK",
              class: "bg-white text-red"
            },
            class: "bg-red-600 text-white f-default font-bold"
          });
        }
        else {
          this.$q.dialog({
            title: "Oooops!",
            message: "Ocorreu um erro inesperado",
            ok: {
              label: "OK",
              class: "bg-sprimary text-white"
            },
            class: "bg-red-300"
          });
        }
      }
      else if (data && data.user && data.session) {
        this.auth.user = data.user;
        this.auth.session = data.session;
        this.$router.push('/admin');
      }

      this.loading = false;
    }
  },
  components: { InputComponent }
})
</script>
