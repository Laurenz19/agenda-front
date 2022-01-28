import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceuil from '../views/Acceuil.vue'
import Jobs from '../views/Jobs.vue'
import Candidat from '../views/Candidat.vue'
import Entretien from '../views/Entretien.vue'
import Agenda from '../views/Agenda.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Acceuil',
    component: Acceuil
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/candidat',
    name: 'Candidat',
    component: Candidat
  },
  {
    path: '/entretien',
    name: 'Entretien',
    component: Entretien
  },
  {
    path: '/Agenda',
    name: 'Agenda',
    component: Agenda
  },
  {
    path: '/:catchAll(.*)',
    name:'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
