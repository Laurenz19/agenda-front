<template>
   <div class="content">
    <vs-table :notSpacer="true" pagination max-items="6" search :data="entretiens" vs-w="8">
      <template slot="header">
        <div class="popup">
           <app-pop-up :title="popup_title" :active="activePopup" @open="initPopup" :showbtn="true" :hideCloseBtn="hideCloseBtn">
                <template slot="content">
                   <vs-alert :active.sync="submitError" color="danger" @click="closeAlert">
                     {{message}}
                    </vs-alert>
                    <div class="inputs">
                      <vs-input class="inputx" label-placeholder="Candidat" v-model="candidat"/>
                      <vs-input class="inputx" label-placeholder="Job" v-model="title"/>
                      <vs-input class="inputx" label-placeholder="Date" v-model="date"/>
                      <vs-input class="inputx" label-placeholder="heure" v-model="heure"/>
                      <vs-input class="inputx" label-placeholder="Lieu de l'entretien" v-model="lieu"/>
                    </div>
                    <div class="submit">
                        <vs-button ref="btn_q" type="gradient" @click="handleSubmitData">Ajouter</vs-button>
                        <vs-button type="gradient" color="danger" @click="closePopup">Annuler</vs-button>
                    </div>
                </template>
          </app-pop-up>
        </div>
      </template>
      <template slot="thead">
        <vs-td sort-key="job">
          <div class="th">
             Job déscription
          </div>
        </vs-td>
        <vs-td sort-key="job">
          <div class="th">
           Candidat
          </div>
        </vs-td>
        <vs-td sort-key="date">
           <div class="th">
             Date
          </div> 
        </vs-td>
          <vs-td sort-key="heure">
           <div class="th">
             Heure
          </div> 
        </vs-td>
          <vs-td sort-key="Lieu">
           <div class="th">
             Lieu
          </div> 
        </vs-td>
        <vs-td>
           <div class="th">
            Actions
          </div>
        </vs-td>
      </template>
      <template slot-scope="{data}">
        <vs-tr  class="tr" :key="data[indextr].id" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].travail">
            {{data[indextr].travail.description}}
          </vs-td>
           <vs-td :data="data[indextr].candidat">
            {{data[indextr].candidat.nomComplet}}
          </vs-td>

          <vs-td :data="data[indextr].date">
            {{moment(data[indextr].date).format("DD-MM-YYYY")}}
          </vs-td>
          <vs-td :data="data[indextr].heure">
            {{data[indextr].heure}}
          </vs-td>
           <vs-td :data="data[indextr].lieu">
            {{data[indextr].lieu}}
          </vs-td>

           <vs-td :data="data[indextr].id">
             <vs-row vs-justify="center">
                <vs-tooltip text="Editer">
                  <vs-button size="small" type="gradient" icon="edit"></vs-button>
                </vs-tooltip>
                 <vs-tooltip text="Effacer">
                  <vs-button size="small"  color="danger" type="gradient" icon="delete"></vs-button>
                </vs-tooltip>
            </vs-row>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
 </div>
</template>


<script>
import Popup from '../components/Popup.vue'
import moment from 'moment';
import read from '../composables/read'
export default {
    name:"Entretien",
    components:{
    'app-pop-up':Popup,
    },
    computed: {
      activePopup(){
        return this.$store.state.activePopup
      },

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
    data() {
        return {
            candidat:"",
            title:"",
            date:"",
            heure:"",
            lieu:"",
            submitError:false,
            message:'',
            popup_title:"Formulaire",
            hideCloseBtn:true,
            moment:moment
        } 
    },
    methods:{
      handleSubmitData:function(){
          console.log("handle submit data")
      },
      addData:async function(){
          console.log("add data")
      },
      updateData: async function(){
          console.log("add data")
      },
      deleteData: function(id){
        console.log(id);
      },
      showUpdateForm:function(quartier){
         console.log(quartier);
      },
      closePopup:function(){
        this.$store.dispatch('closePopup')
        this.initForm()
        this.showAlert(false)
      },
      initForm:function(candidat, title, date, heure, lieu){
          this.candidat = candidat
          this.title = title
          this.date= date
          this.heure = heure 
          this.lieu = lieu
      },
      initPopup:function(){
        console.log('hehe')
        this.$refs.btn_q.$el.innerText="Ajouter"
        this.initForm();
        this.showAlert(false);
      },
      showAlert:function(state,message){
        if(state === true){
          this.message = message;
        }else{
           this.message = '';
        }
         this.submitError = state;
      },
      closeAlert:function(){
        this.submitError= false;
      },
       showNotification:function(titre, message, couleur){
           this.$vs.notify({title: titre,text:message,color:couleur})
       }

    }
}
</script>
<style>
  .tr{
    text-align: center;
    font-family: Helvetica, sans-serif;
  }
 
</style>