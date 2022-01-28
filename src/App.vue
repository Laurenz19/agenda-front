<template>
<div>
  <div id="nav">
    <router-link :to="{name:'Acceuil'}">Acceuil</router-link> |
    <router-link :to="{name:'Candidat'}">Candidat</router-link> |
    <router-link :to="{name:'Jobs'}">Jobs</router-link> |
    <router-link :to="{name:'Entretien'}">Entretien</router-link> |
    <router-link :to="{name:'Agenda'}">Agenda</router-link>
  </div>
  <router-view/>
</div>
</template>

<script>
export default {
 computed: {
      showMenu(){
        return this.$store.state.showMenu
      },
    },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
