
<template>
  <div class="w-full flex justify-between items-center border-b-2  my-2 gap-2" :class="{
    'border-sprimary': !foc || ruls === null,
    'border-red-600': foc && ruls !== null,
  }">
    <div ref="before" class="w-auto max-w-6 h-6 overflow-hidden">
      <slot name="before" />
    </div>
    <div class="flex-1 h-10 relative gap-4">
      <p :class="{
        '-mt-3': foc,
        'mt-3': !foc,
        'text-sprimary': !foc || ruls === null,
        'text-red-600': foc && ruls !== null,
      }" class="absolute top transition-all delay-75 font-bold  text-md uppercase text-xs pointer-events-none">{{ label }}</p>
      <input autocomplete="new-password" :type="type" :required="required" :disabled="disabled" v-model="val"
        class="flex-1 w-full h-10 focus:outline-none px-2 font-bold text-lg text-text bg-transparent" @focus="foc = true"
        @blur="onBlur">
    </div>
    <q-btn v-if="clearable !== undefined && val && val.length > 0" icon="close" size="xs" round dense unelevated class="text-sprimary" @click="val = ''"/>
    <div ref="before" class="w-auto max-w-6 h-6 overflow-hidden">
      <slot name="after" />
    </div>

  </div>
  <div class="w-full  -mt-4" v-if="foc && ruls !== null">
    <p class="text-xs text-red my-1">
      <q-icon name="mdi-alert" class="mr-4" />
      <span>{{ ruls }}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: ['value', 'label', 'disabled', 'required', 'rules', 'type', 'clearable'],
  emits: ['update:value', 'error'],
  computed: {
    val: {
      get() {
        return this.value
      },
      set(newvalue) {
        this.$emit('update:value', newvalue)
      }
    },
    ruls() {
      let ruls = null;
      if (this.rules && Array.isArray(this.rules)) {
        this.rules.forEach(rule => {
          if (rule(this.val) !== true) {
            if (ruls == null) ruls = rule(this.val)
          } else {
            ruls = null
          }
        })
      }
      return ruls
    }
  },
  data() {
    return {
      foc: false
    }
  },
  watch: {
    val(newvalue) {
      if (newvalue && newvalue.length == 0) {
        this.foc = true
      }
    },
    ruls(newvalue) {
      this.$emit('error', newvalue !== null)
    }
  },
  methods: {
    onBlur() {
      if (!this.val || this.val.length == 0) {
        this.foc = false
      }
    }
  }
}
</script>