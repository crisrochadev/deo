/** @type {import('tailwindcss').Config} */

const { createThemes } = require('tw-colors');
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      default_light: {
        'sprimary': colors.cyan[600],
        'ssecondary': colors.teal[300],
        "text":'#1e1e1e',
        "bottom":'#ffffff',
      },
      default_dark: {
        'sprimary': colors.cyan[500],
        'ssecondary': colors.teal[100],
        "text":'#ffffff',
        "bottom":colors.cyan[800],
      },
      pink_light: {
        'sprimary': colors.pink[600],
        'ssecondary': colors.purple[300],
        "text":'#1e1e1e',
        "bottom":'#ffffff',
      },
      pink_dark: {
        'sprimary': colors.pink[500],
        'ssecondary': colors.purple[100],
        "text":'#ffffff',
        "bottom":colors.gray[800],
      },
      emerald_light: {
        'sprimary': colors.emerald[600],
        'ssecondary': colors.green[300],
        "text":'#1e1e1e',
        "bottom":'#ffffff',
      },
      emerald_dark: {
        'sprimary': colors.emerald[500],
        'ssecondary': colors.green[100],
        "text":'#ffffff',
        "bottom":colors.gray[800],
      }
    })
  ],
}
