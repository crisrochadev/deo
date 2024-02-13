
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'step-one', component: () => import('pages/StepOne.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'reset', component: () => import('pages/Reset.vue') },
      { path: 'send-reset', component: () => import('pages/SendReset.vue') },
      
    ]
  },
  {
    path: '/admin',
    name:'admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    children: [
      { path: '', name:'dash' , component: () => import('pages/admin/IndexPage.vue'), meta:{title:"Inicio"} },
      { path: 'expenses', name:'expenses' , component: () => import('pages/admin/Expenses.vue'), meta:{title:"Despesas"} },
      { path: 'incoming', name:'incoming' , component: () => import('pages/admin/Incoming.vue'), meta:{title:"Entradas"} },
      { path: 'agenda', name:'agenda' , component: () => import('pages/admin/Agenda.vue'), meta:{title:"Agenda"} },
      { path: 'calculator', name:'calculator' , component: () => import('pages/admin/Calculator.vue') , meta:{title:"Calculadora"}},
      { path: 'settings', name:'settings' , component: () => import('pages/admin/Settings.vue'), meta:{title:"Configurações"} },
      { path: 'account', name:'account' , component: () => import('pages/admin/Account.vue'), meta:{title:"Conta"} },
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
