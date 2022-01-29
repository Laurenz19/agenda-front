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
                       <div class="con-select-example candidat-select">
                            <vs-select class="selectExample" label="Candidat" v-model="candidat">
                                <vs-select-item :key="item.id" :value="item['@id']" :text="item.nomComplet" v-for="item in candidats" />
                            </vs-select>
                      </div>
                      <div class="con-select-example travail-select">
                            <vs-select class="selectExample" label="Travail" v-model="travail">
                                <vs-select-item :key="item.id" :value="item['@id']" :text="item.description" v-for="item in jobs" />
                            </vs-select>
                      </div>
                      <vs-input class="inputx" label-placeholder="Date" type="date" v-model="date"/>
                      <vs-input class="inputx" label-placeholder="heure" type="time" v-model="heure"/>
                      <vs-input class="inputx" label-placeholder="Lieu de l'entretien" v-model="lieu"/>
                    </div>
                    <div class="submit">
                        <vs-button type="gradient" color="danger" @click="closePopup">Annuler</vs-button>
                        <vs-button ref="btn_submit" type="gradient" @click="handleSubmitData">Ajouter</vs-button>
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
                  <vs-button size="small" type="gradient" icon="edit" @click="updateData(data[indextr])"></vs-button>
                </vs-tooltip>
                 <vs-tooltip text="Effacer">
                  <vs-button size="small"  color="danger" type="gradient" icon="delete" @click="deleteData(data[indextr].id)"></vs-button>
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
import create from '../composables/create'
import update from '../composables/update'
import remove from '../composables/delete'
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
      },
      candidats(){
        return this.$store.state.candidats
      },
      jobs(){
        return this.$store.state.jobs
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
            id :"",
            candidat:"",
            travail:"",
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
         let entretien = {
            "date": new Date(this.date),
            "heure": this.heure,
            "lieu": this.lieu,
            "candidat": this.candidat,
            "travail": this.travail
          }
          console.log(entretien)
          if(this.$refs.btn_submit.$el.innerText == "Ajouter"){
             create("entretiens", entretien, (response)=>{
              console.log(response)
               this.closePopup()
               read("entretiens", (data)=>{
                this.$store.dispatch("setEntretiens", data);
              })
            })
          }

          if(this.$refs.btn_submit.$el.innerText == "Modifier"){
             update(`entretiens/${this.id}`, entretien, (response)=>{
              console.log(response.data)
               this.closePopup()
               read("entretiens", (data)=>{
                this.$store.dispatch("setEntretiens", data);
              })
            })
          }
      },
      addData:async function(){
          console.log("add data")
      },
      updateData: async function(entretien){
        console.log(entretien)
           this.id = entretien.id
           entretien.date = moment(entretien.date).format("YYYY-MM-DD")
           this.$refs.btn_submit.$el.innerText = "Modifier"
           this.$store.dispatch('openPopup')
           this.initForm(entretien)
      },
      deleteData: function(id){
        remove(`entretiens/${id}`, (status)=>{
         console.log(status)
         //this.$store.dispatch('removeCandidat', id)
          read("entretiens", (data)=>{
                this.$store.dispatch("setEntretiens", data);
          })
       })
      },
      showUpdateForm:function(quartier){
         console.log(quartier);
      },
      closePopup:function(){
        this.$store.dispatch('closePopup')
        this.initForm(
          {
            "date": "",
            "heure": "",
            "lieu": "",
            "candidat": "",
            "travail": ""
          }
        )
        this.showAlert(false)
      },
      initForm:function(entretien){
          this.candidat = entretien.candidat["@id"]
          this.travail = entretien.travail["@id"]
          this.date= entretien.date
          this.heure = entretien.heure 
          this.lieu = entretien.lieu
      },
      initPopup:function(){
        console.log('hehe')
        this.$refs.btn_submit.$el.innerText="Ajouter"
        this.initForm(
          {
            "date": "",
            "heure": "",
            "lieu": "",
            "candidat": "",
            "travail": ""
          }
        );
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
  .travail-select, .candidat-select{
    position: relative;
    width: 23.5em;
    margin: auto;
  }

  .travail-select .input-select-con, .candidat-select .input-select-con{
     width: 23.5em;
     position: relative;
     left: 10px;  
     margin: 0 auto;
  }

  .travail-select .vs-select--label, .candidat-select .vs-select--label{
    position: relative;
    left: 65px
  }
 
</style>