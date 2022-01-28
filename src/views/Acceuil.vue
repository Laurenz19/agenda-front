<template>
  <div class="acceuil">
    <app-greeting/>
    <app-acceuil-menu></app-acceuil-menu>
  </div>
</template>

<script>
import Menu from '../components/acceuil/Menu.vue'
import Greeting from '../components/acceuil/Greeting.vue'

export default {
  name: 'Acceuil',
  onMounted(){
     this.$store.dispatch("setShowMenu");
  },
  components: {
    "app-acceuil-menu": Menu,
    "app-greeting": Greeting
  },
}
</script>
