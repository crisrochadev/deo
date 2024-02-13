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
        <q-form class="w-full flex flex-col gap-2 justify-around h-full pt-8" @submit="reset">
          <p class=" leading-4 text-4xl text-sprimary font-medium mt-4 mb-4">Redefinir</p>

          <q-input required outlined color="primary" :rules="[
            val => !!val || 'Por favor digite a senha',
            val => val && val.length > 6 || 'A senha precisa conter mais de 6 caracteres'
          ]" label="Senha" :type="visibility ? 'text' : 'password'" v-model="user.password" clearable
           >
            <template #append>
              <q-btn size="sm" :icon="visibility ? 'visibility_off' : 'visibility'" round flat dense class="text-sprimary"
                @click="visibility = !visibility" />
            </template>
          </q-input>
          <q-input outlined color="primary" :rules="[
            val => val && val === user.password || 'As senhas digitadas são diferentes.'
          ]" label="Confirme a Senha" :type="visibility ? 'text' : 'password'" v-model="user.c_password"
            clearable required >
            <template #append>
              <q-btn size="sm" :icon="visibility ? 'visibility_off' : 'visibility'" round dense flat class="text-sprimary"
                @click="visibility = !visibility" />
            </template>
          </q-input>
          <q-btn label="Salvar" size="lg" class="rounded-2xl bg-sprimary font-extrabold text-bottom w-2/4 mx-auto mt-8"
            :loading="loading" type="submit" />
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
      user: {
        c_password: null,
        password: null
      },
      loading: false
    };
  },
  methods: {
    async reset() {
      this.loading = true
      const { error, data } = await this.$supabase.auth.updateUser({ password: this.user.password })

      if (error) {

        this.$q.dialog({
          title: "Atenção",
          message: "Link expirado, solicite novamente",
          class: "bg-red-7 text-white",
          persistent: true,
          ok: {
            color: 'red-9',
            textColor: 'white',
            label: 'OK'
          }
        }).onOk(() => {
          this.$router.push('/login')
        })
      } else {
        this.$q.dialog({
          title: "Sucesso",
          message: "Sua senha foi alterada com sucesso, volte para o login",
          class: "bg-green-7 text-white",
          persistent: true,
          ok: {
            color: 'green-9',
            textColor: 'white',
            label: 'OK'
          }
        }).onOk(() => {
          this.$router.push('/login')
        })
      }
      this.loading = false;
    }
  },
  components: { InputComponent }
})
</script>
