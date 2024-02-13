<template>
  <q-dialog v-model="show" position="bottom" full-width persistent>
    <q-card :class="config.theme" class="h-[100svh] w-full relative border-4 grid grid-rows-[2.5rem, 90px,1fr] bg-bottom">
      <div class="w-full h-10 flex justify-between items-center px-2">
        <q-icon name="mdi-calculator-variant" class="text-sprimary text-xl" />
        <span class="uppercase text-sprimary font-bold">Calculadora</span>
        <q-btn icon="close" round class="text-sprimary" flat v-close-popup />
      </div>
      <div class="gap-1 px-4  h-full items-center grid grid-cols-[1fr,2.5rem]">
        <input readonly ref="inputField" type="text"
          class="output focus:outline-none bg-transparent h-16 ps-3 input-output w-full text-4xl text-sprimary font-extrabold border-b-2 border-s-primary"
          @keyup.enter="calc()" v-model="result" @input="validateOutput">
        <q-btn icon="mdi-backspace" square dense flat class="text-sprimary w-full text-xl" @click="handleKeyDown" />
      </div>

      <div class=" w-full h-full flex justify-center items-center p-2">
        <div class="grid grid-cols-4 grid-rows-5 gap-2  p-2 w-full h-full ">
          <template v-for="(number, index) in values" :key="index">
            <q-btn v-if="number != 'C' && number != '=' && number != 0 && number != '.' && number != '+'"
              @click="input(number)" class="h-full w-full  text-white text-4xl"
              :class="[typeof number != 'number' ? 'bg-ssecondary text-grey-8 text-grey-8' : 'bg-sprimary']">
              {{ number }}
            </q-btn>
            <q-btn v-else-if="number == 'C'" @click="reset" class="h-full w-full  text-white text-4xl bg-orange"
              style="grid-row:1;grid-column:1">
              {{ number }}
            </q-btn>
            <q-btn v-else-if="number == 0" @click="input(number)" class="h-full w-full  text-white text-4xl bg-sprimary "
              style="grid-row:5;grid-column:1">
              {{ number }}
            </q-btn>
            <q-btn v-else-if="number == '.'" @click="input(number)"
              class="h-full w-full  text-white text-4xl bg-ssecondary text-grey-8" style="grid-row:5;grid-column:2">
              {{ number }}
            </q-btn>
            <q-btn v-else-if="number == '+'" @click="input(number)"
              class="h-full w-full  text-white text-4xl bg-ssecondary text-grey-8" style="grid-row:3/5;grid-column:4">
              {{ number }}
            </q-btn>
            <q-btn v-else-if="number = '='" @click="calc" class="h-full w-full  text-white text-4xl bg-green"
              style="grid-row:5;grid-column:3/5">
              {{ number }}
            </q-btn>
            {{ validation.error }}
          </template>

        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { useConfig } from 'src/stores/config';

export default {
  props: ['model'],
  emits: ['update:model'],
  data() {
    const config = useConfig();
    return {
      config,
      values: ['C', '/', '*', '%', 7, 8, 9,'-', '+', 4, 5, 6, 1, 2, 3, 0, '=', '.'],
      quality: '=',
      result: '',
      validation: {
        alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
        error: '',
        symbols: '!~|@#$^&'.split('')
      }
    }
  },
  // created() {
  //   this.reverseNumber()
  // },
  computed: {
    show: {
      get() {
        return this.model
      },
      set(newvalue) {
        this.$emit('update:model', newvalue)
      }
    }
  },
  methods: {
    backspace() {
      const input = this.$refs.inputField;
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;

      if (startPos === endPos && startPos > 0) {
        const newValue = this.result.substring(0, startPos - 1) + this.result.substring(endPos);
        this.result = newValue;
        this.$nextTick(() => {
          if (document.activeElement !== input) {
            input.focus();
          }
          input.setSelectionRange(startPos - 1, startPos - 1);
        });
      }
    }
    ,
    handleKeyDown(event) {
      // Previne o comportamento padrão do backspace
      if (event.key === 'Backspace') {
        event.preventDefault();
      }
      else this.backspace()
    },
    reverseNumber() {
      return this.values.reverse()
    },
    input(char) {
      this.result = this.result.toString()
      this.result += char
    },
    reset() {
      this.result = ''
    },
    calc() {
      let expression = this.result;

      // Verificar se a expressão contém uma porcentagem (%)
      if (expression.includes('%')) {
        let parts = expression.split(/[\+\*\-\/]/); // Separar os valores
        let value = parseFloat(parts[0]);
        let percentage = parseFloat(parts[1].replace('%', ''));

        if (expression.includes('+')) {
          // Cálculo para adição de porcentagem
          let result = value + (value * (percentage / 100));
          this.result = result;
        } else if (expression.includes('*')) {
          // Cálculo para multiplicação de porcentagem
          let result = value * (percentage / 100);
          this.result = result;
        }
        else if (expression.includes('-')) {
          // Cálculo para subtração
          let parts = expression.split('-');
          let result = parseFloat(parts[0]) - parseFloat(parts[1]);
          this.result = result;
        } else if (expression.includes('/')) {
          // Cálculo para divisão
          let parts = expression.split('/');
          let result = parseFloat(parts[0]) / parseFloat(parts[1]);
          this.result = result;
        }
      } else {
        // Se não houver porcentagem, apenas avalie a expressão
        this.result = eval(expression);
      }
    },

    validateOutput(event) {
      let length = this.validation.alphabet.length
      let value = event.data

      for (let i = 0; i < length; i++) {
        if (value == this.validation.alphabet[i]) {
          this.result = ''
        }
      }
    }

  },
  watch: {
    result(currentValue) {
      // let length = this.validation.alphabet.length
      // let symbols = this.validation.symbols
      // this.values.length = 3;

      // for (let i = 0; i < length; i++) {
      //   console.log(this.values[i]);
      //   if (currentValue == this.values[i] || currentValue == symbols[i]) {
      //     this.result = ''
      //   }
      // }
      // this.values.push('-')
    }
  },
  mounted() {
    // Foca no campo de entrada quando o componente é montado
    if (this.$refs.inputField) this.$refs.inputField.focus();
  }
}
</script>
