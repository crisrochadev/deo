<template>
  <q-page class="flex flex-col justify-center items-center w-full h-full f-default">
    <div class="w-64  flex justify-center items-center ">
    <img
      alt="Quasar logo"
      src="/logo1_light.png"
      class="w-[90%] h-[90%] object-contain -mr-3"
    >
    <h1 class="text-2xl font-extrabold text-sprimary">Dinheiro Em Ordem</h1>
    <p class=" leading-4 text-lg  font-medium text-sprimary">Controle de desepesas </p>
    <div class="w-full">
      <q-spinner v-if="loading" class="mt-4 mx-auto text-sprimary" size="lg" />
    </div>
    <p class="w-full text-ssecondary text-center absolute bottom-2 ">App desenvolvido por <span class="font-bold">SweetCode</span></p>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data(){
    return{
      loading:false
    }
  },
  mounted(){
    setTimeout(() => {
      this.loading = true
    },500)
    setTimeout(() => {
      console.log('bateu aqui')
      this.$router.push('/login')
    },1500)
  }
})
</script>
