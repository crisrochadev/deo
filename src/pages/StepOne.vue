<template>
  <q-page class="flex w-full h-full f-default relative bg-bottom gap-2 justify-center">
    <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl"
      class="flex justify-around items-center w-2/4 h-[100svh]  relative ">
      <img src="/imagens/1.svg" class="w-full h-full object-cover" />
    </div>
    <q-card class=" flex flex-col justify-around md:w-[48%] w-full h-[100svh] md:h-[98svh] my-auto p-4">
      <div class="w-full mx-auto" v-if="$q.screen.xs || $q.screen.sm ">
        <img src="/imagens/1.svg" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col items-center">

        <p class=" leading-4 text-2xl  font-medium text-sprimary">Bem vind@ ao</p>
        <div class="w-64  flex justify-center items-center ">
          <img alt="Quasar logo" src="/logo2_light.png" class="w-[90%] h-[90%] object-contain -mr-3">
        </div>

      </div>
      <div class="">
        <q-btn label="Vamos Começar" class="bg-sprimary font-extrabold text-bottom full-width  rounded-xl" size="lg"
          to="/login" />
        <p class="w-full text-ssecondary text-center mt-4 mb-2 ">App desenvolvido por <span
            class="font-bold">SweetCode</span></p>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    const $q = useQuasar();
    return {
      $q
    }
  }
})
</script>
