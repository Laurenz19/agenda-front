<template>
  <div class="acceuil">
    <app-greeting/>
    <app-acceuil-menu></app-acceuil-menu>
  </div>
</template>

<script>
import Menu from '../components/acceuil/Menu.vue'
import Greeting from '../components/acceuil/Greeting.vue'
import read from '../composables/read'
export default {
  name: 'Acceuil',
  beforeMount(){
     this.$store.dispatch("setShowMenu");
     read("travails", (data)=>{
        this.$store.dispatch("setJobs", data);
      })

      read("candidats", (data)=>{
        this.$store.dispatch("setCandidats", data);
      }) 
      
      read("entretiens", (data)=>{
        this.$store.dispatch("setEntretiens", data);
      })
      console.log("haha")
  },
  components: {
    "app-acceuil-menu": Menu,
    "app-greeting": Greeting
  },
}
</script>
