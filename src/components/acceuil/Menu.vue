<template>
    <div class="menu">
         <ul>
            <li v-for="icon, index in icons" :key="index">
                <router-link :to="{name:icon.text}" @click="handleMenu()">
                    <span class="material-icons">
                        {{icon.name}}
                    </span>
                    <div>{{icon.text}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name:"Menu",
    data(){
        return{
            icons: [
            {name:"people", text:"Candidat"},
            {name:"groups", text:"Entretien"},
            {name:"work", text:"Jobs"},
            {name:"calendar_today", text:"Agenda"}]
        }
    },
    onMounted(){
         this.$store.dispatch('setShowMenu');
    },
    methods:{
        handleMenu: ()=>{
            this.$store.dispatch('setShowMenu');
        }
    }
}
</script>
<style>
.menu{
    text-align: center;
}
.menu ul{
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 400px;
    margin: 60px auto;
}

.menu li{
    list-style-type:none;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    cursor: pointer;
    line-height: 1.5em;
}
</style>