import { boot } from 'quasar/wrappers'


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


export async function getUser(){

  const { data: { user } } = await supabase.auth.getUser();
  return user ? user : null
}

export default boot(({ app }) => {
  app.config.globalProperties.$supabase = supabase
})