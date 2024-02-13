import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { getUser } from 'src/boot/supabase'
import { useAuth } from 'src/stores/auth'


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const auth = useAuth();
    if (!auth.user) auth.user = await getUser();

    if (auth.user) {
      if (to.matched.some(record => record.path.startsWith('/admin'))) {
        next();
      } else {
        next('/admin');
      }
    } else {
      if (to.matched.some(record => record.path.startsWith('/admin'))) {
        next('/');
      } else {
        next();
      }
    }
  })


  return Router
})
