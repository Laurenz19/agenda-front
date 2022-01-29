<template>
  <div class="content">
    <vs-table :notSpacer="true" pagination max-items="6" search :data="candidats" vs-w="8">
      <template slot="header">
        <div class="popup">
           <app-pop-up :title="popup_title" :active="activePopup" @open="initPopup" :showbtn="true" :hideCloseBtn="hideCloseBtn">
                <template slot="content">
                   <vs-alert :active.sync="submitError" color="danger" @click="closeAlert">
                     {{message}}
                    </vs-alert>
                    <div class="inputs">
                      <vs-input class="inputx" label-placeholder="Nom Complet" v-model="nom"/>
                      <vs-input class="inputx"  type="date" label-placeholder="Date de naissance" v-model="dateNais"/>
                      <vs-input class="inputx" label-placeholder="Email" v-model="email"/>
                      <vs-input class="inputx" label-placeholder="Tel" v-model="contact"/>
                      <vs-input class="inputx" label-placeholder="Adresse" v-model="adresse"/>
                      <vs-input class="inputx" label-placeholder="Compétences" v-model="competence" @keypress.enter="addCompetence"/>
                      <div class="competences_list">
                        <span v-for="cp in comps" :key="cp">
                          {{cp}}
                        </span>
                      </div>
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
        <vs-td sort-key="nomComplet">
          <div class="th">
             Nom
          </div>
        </vs-td>
        <vs-td sort-key="dateNais">
           <div class="th">
             Date de naissance
          </div> 
        </vs-td>
          <vs-td sort-key="email">
           <div class="th">
               Email
          </div> 
        </vs-td>
          <vs-td sort-key="contact">
           <div class="th">
               Contact
          </div> 
        </vs-td>
          <vs-td sort-key="email">
           <div class="th">
             Compétences
          </div> 
        </vs-td>
        <vs-td sort-key="adresse">
           <div class="th">
            Adresse
          </div> 
        </vs-td>
        <vs-td>
           <div class="th">
            Actions
          </div>
        </vs-td>
      </template>
      <template slot-scope="{data}">
        <vs-tr class="tr" :key="data[indextr].id" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].nomComplet">
            {{data[indextr].nomComplet}}
          </vs-td>

          <vs-td :data="data[indextr].dateNais">
            {{moment(data[indextr].dateNais).format("DD-MM-YYYY")}}
          </vs-td>
          <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>
           <vs-td :data="data[indextr].contact">
            {{data[indextr].contact}}
          </vs-td>
           <vs-td :data="data[indextr].competences">
            {{data[indextr].competences}}
          </vs-td>
           <vs-td :data="data[indextr].adresse">
            {{data[indextr].adresse}}
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
import create from "../composables/create"
import update from "../composables/update"
import remove from "../composables/delete.js"
export default {
    name:"Candidat",
    components:{
    'app-pop-up':Popup,
    },
    computed: {
      activePopup(){
        return this.$store.state.activePopup
      },
      candidats(){
          return this.$store.state.candidats
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
            id:"",
            nom:"",
            dateNais:"",
            email:"",
            contact:"",
            adresse:"",
            competence:"",
            comps:[],
            submitError:false,
            message:'',
            popup_title:"Formulaire",
            hideCloseBtn:true,
            moment:moment
        } 
    },
    methods:{
      handleSubmitData:function(){
          let candidat = {
              "nomComplet": this.nom,
              "dateNais": new Date(this.dateNais),
              "adresse": this.adresse,
              "competences": this.comps,
              "contact": this.contact,
              "email": this.email
          }
          if(this.$refs.btn_submit.$el.innerText == "Ajouter"){
             create("candidats", candidat, (response)=>{
              console.log(response.data)
            })
          }

          if(this.$refs.btn_submit.$el.innerText == "Modifier"){
            update(`candidats/${this.id}`, candidat, (response)=>{
              console.log(response.data)
              this.closePopup()
               read("candidats", (data)=>{
                this.$store.dispatch("setCandidats", data);
              })
           })
          }
            console.log(candidat)
      },
      addCompetence:function(){
       this.comps.push(this.competence)
       this.competence = ""
      },
      updateData: async function(candidat){
           this.id = candidat.id
           candidat.dateNais = moment(candidat.dateNais).format("YYYY-MM-DD")
           this.$refs.btn_submit.$el.innerText = "Modifier"
           this.$store.dispatch('openPopup')
           this.initForm(candidat)
      },
      deleteData: function(id){
       remove(`candidats/${id}`, (status)=>{
         console.log(status)
         this.$store.dispatch('removeCandidat', id)
          read("candidats", (data)=>{
                this.$store.dispatch("setCandidats", data);
          })
       })
      },
      showUpdateForm:function(quartier){
         console.log(quartier);
      },
      closePopup:function(){
        this.$store.dispatch('closePopup')
        this.initForm( {
              "nomComplet":"",
              "dateNais":"",
              "adresse": "",
              "competences":"",
              "contact":"",
              "email":""
          })
        this.showAlert(false)
      },
      initForm:function(candidat){
          this.nom = candidat.nomComplet
          this.adresse = candidat.adresse
          this.contact = candidat.contact
          this.email = candidat.email
          this.comps = candidat.competences
          this.dateNais = candidat.dateNais
      },
      initPopup:function(){
        console.log('hehe')
        this.$refs.btn_submit.$el.innerText="Ajouter"
        this.initForm(
          {
              "nomComplet":"",
              "dateNais":"",
              "adresse": "",
              "competences":"",
              "contact":"",
              "email":""
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
       },
    }
}
</script>
<style>
.content{
    width: 70em;
    margin: auto;
    font-size: 1.2em;
}

 div.th{
      padding: 0.5em;
      font-weight: bold;
      font-size: 1.2em;
      text-align: center;
  }  

 .popup-example .vs-input{
    width: 100%;
    margin: 10px;
    margin-top: 5px;
    padding-left: 20%;
    padding-right: 20%;
  }

  .tr{
    text-align: center;
    font-family: Helvetica, sans-serif;
  }


</style>