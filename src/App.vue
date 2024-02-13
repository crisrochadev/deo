<template>
  <div data-theme :class="theme" class="w-[100svw] h-[100svh] relative overflow-hidden">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useConfig } from './stores/config';


export default defineComponent({
  name: 'App',
  data(){
    const config = useConfig()
    return {
     config
    }
  },
  computed:{
    theme(){
      return this.config.theme
    }
  }
})
</script>
