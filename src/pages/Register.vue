<template>
  <q-page class="flex gap-2 f-default relative bg-bottom">
    <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl"
      class="flex justify-around items-center w-2/4 h-[100svh]  relative ">
      <img src="/imagens/6.svg" class="w-full h-full object-cover" />
    </div>
    <q-card class="grid px-4  items-start  w-full lg:w-[48%] h-[100svh] md:h-[98svh] mt-[1svh]  relative" :style="{
      gridTemplateRows: '70px 1fr 200px'
    }">
      <div class="flex justify-between items-center">
        <q-btn round dense flat icon="mdi-arrow-left" class="text-sprimary" @click="$router.back()" />
        <div class="w-24  flex justify-center items-center ">
          <img alt="Quasar logo" src="/logo1_light.png" class="w-full h-full object-contain ">
        </div>


      </div>
      <div class="flex flex-col justify-start items-center w-full h-full pb-8">
        <q-form class="w-full flex flex-col gap-2 justify-around h-full" @submit="register">
          <p class=" leading-4 text-3xl text-sprimary font-medium mt-4 mb-4">Cadastrar</p>
          <q-input outlined color="primary" type="email" label="email" v-model:value="user.email" @error="error => errors.email = error"
            :rules="[
              val => !!val || 'Digite o Email',
              val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val) || 'Email inválido',
            ]">
          </q-input>
          <q-input outlined color="primary" required :rules="[
            val => !!val || 'Por favor digite a senha',
            val => val && val.length > 6 || 'A senha precisa conter mais de 6 caracteres'
          ]" label="Senha" :type="visibility ? 'text' : 'password'" v-model:value="user.password" clearable
            @error="error => errors.password = error">
            <template #append>
              <q-btn size="sm" :icon="visibility ? 'visibility_off' : 'visibility'" round flat dense class="text-sprimary"
                @click="visibility = !visibility" />
            </template>
          </q-input>
          <q-input outlined color="primary" :rules="[
            val => val && val === user.password || 'As senhas digitadas são diferentes.'
          ]" label="Confirme a Senha" :type="visibility ? 'text' : 'password'" v-model:value="user.c_password"
            clearable @error="error => errors.c_password = error">
            <template #append>
              <q-btn size="sm" :icon="visibility ? 'visibility_off' : 'visibility'" round dense flat class="text-sprimary"
                @click="visibility = !visibility" />
            </template>
          </q-input>

          <q-btn :loading="loading" label="Cadastrar" size="lg"
            class="rounded-2xl bg-sprimary font-extrabold text-bottom w-2/4 mx-auto mt-8" type="submit"
            :disable="!Object.values(this.errors).every(item => !item)" />
        </q-form>
      </div>
      <div class="border-t-2 border-sprimary h-full w-full pt-6 relative flex justify-center items-center gap-4 ">
        <span class="block absolute left-2/4 -translate-x-2/4 -top-7 text-sprimary bg-bottom p-4">ou</span>
        <q-btn icon="mdi-facebook" round class="bg-sprimary text-white" size="xl" />
        <q-btn icon="mdi-google" round class="bg-sprimary text-white" size="xl" />
        <p class="w-full text-center  text-sprimary">
          Ainda não tem conta? <q-btn dense label="Entre" to="login" flat />
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
      loading: false,
      auth,
      $q,
      visibility: false,
      user: {
        email: null,
        password: null,
        c_password: null
      },
      errors: {
        email: true,
        password: true,
        c_password: true
      }
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();

      this.loading = true;
      console.log(this.loading)
      setTimeout(async () => {
        if (Object.values(this.errors).every(item => !item)) {
          const { data, error } = await this.$supabase.auth.signUp({
            email: this.user.email,
            password: this.user.password,
            options: {
              emailRedirectTo: process.env.VUE_APP_URL,
            },
          });

          console.log("data -> ", data)
          console.log("error -> ", error)

          if (data.user && data.user.identities && data.user.identities.length === 0) {
            this.$q.dialog({
              class: 'bg-red-600 text-white',
              title: 'Esse usuário já esta cadastrado',
              message: "Você pode voltar e fazer login, ou recuperar a senha",
              ok: {
                class: "bg-red text-white",
                label: "Voltar para login"
              },
              cancel: {
                outline: true,
                color: 'orange',
                label: "Recuperar Senha"
              }
            }).onOk(() => {
              this.$router.push('/login')
            })
          } else if (error) {
            this.$q.dialog({
              title: "Oooops!",
              message: "Ocorreu um erro inesperado, tente novamente em alguns minutos",
              ok: {
                label: "OK",
                class: "bg-red-8 text-white"
              },
              class: "bg-red-5 text-white"
            })
          } else {
            this.auth.user = data.user;
            this.auth.session = data.session;
            this.$q.dialog({

              title: 'Pronto, cadastro feito!',
              message: "Agora vá até seu email e clique no link que enviamos, para confirmar por favor.",
              ok: {
                class: "bg-white text-green-7",
                label: "OK"
              },
              class: 'bg-green-7 text-white',
              persistent:true
            }).onOk(() => {
              this.$router.push('/login')
            });

            
          }
        }
        this.loading = false;
      }, 1000)
    }
  },
  components: { InputComponent }
})
</script>
