import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
    session:useStorage('user-session', null)
  }),
 
});
