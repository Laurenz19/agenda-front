<template>
    <div class="agenda">
        <h1>Agenda</h1>
        <div v-if="entretiens.length">
            <ul>
            <li v-for="entretien in entretiens" :key="entretien.id">
                <span class="material-icons">
                    calendar_today
                </span>
                <div class="agenda-content">
                    <h4>Entretien le {{moment(entretien.date).format("MM-DD-YYYY")}} à {{entretien.heure}}</h4>
                     <p>Lieu: {{entretien.lieu}}</p> 
                     <p> Job: "{{entretien.travail.description}}", Candidat: {{entretien.candidat.nomComplet}}</p>
                </div>
            </li>
        </ul>
        </div>
        <div class="agenda-vide" v-else>Aucun rendez-vous!</div>
        
    </div>
</template>


<script>
import moment from 'moment';
import read from '../composables/read'
export default {
    name:"Agenda",
    computed:{
        entretiens(){
            return this.$store.state.entretiens
        }
    },
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
    data(){
        return{
            moment: moment
        }
    }
}
</script>
<style>
 .agenda{
     width: 40em;
     margin:auto;
 }
 .agenda-vide{
     text-align: center;
     position: relative;
     top: 50px;
 }

 .agenda li{
     list-style: none;
     background: rgb(255, 253, 253);
     border-radius: 15px;
     padding: 10px 30px 30px 30px;
     margin: auto;
     margin-top: 25px;
     box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
     width:35em;
 }
 div.agenda-content{
     display: inline-block;
     position: relative;
     top:10px; 
     left: 25px;
 } 
</style>