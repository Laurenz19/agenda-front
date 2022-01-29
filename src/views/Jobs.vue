<template>
    <div class="job_content">
        <h1>Jobs</h1>
    <div class="jobs">
       <input type="text" placeholder="Add new Job" v-model="newJob" @keypress.enter="addJob">
        <div  v-if="jobs.length">
            <ul>
                <li v-for="job in jobs" :key="job.id" @click="deleteJob(job.id)">
                    {{job.description}}
                </li>
            </ul>
        </div>
        <div v-else>
            Aucun offre disponible!
        </div>
    </div>
    </div>
</template>
<script>
import create from "../composables/create"
import read from "../composables/read"
import remove from "../composables/delete"
export default {
    name:"Jobs",
    data(){
        return{
            newJob:"",
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
    computed:{
        jobs(){
            return this.$store.state.jobs
        }
    },
    methods:{
        addJob(){
            this.$store.dispatch("appendJobs", {"description":this.newJob});
            create("travails", {"description":this.newJob}, (response)=>{
                console.log(response.status)
            })
            this.newJob =""
        },

        deleteJob(id){
            console.log(`delete this job id: ${id}`)
            this.$store.dispatch("removeJob", id);
            remove(`travails/${id}`, (status)=>{
                console.log(status)
            })
        }
    }
}
</script>
<style>
    .job_content{
        width: 50em;
        margin: auto;
        text-align: center;
    }

    .jobs{
        max-width: 500px;
        margin:20px auto;
        position: relative;
    }

    input{
        width: 100%;
        padding: 12px;
        border:1px solid #eee;
        border-radius: 10px;
        box-sizing: border-box;
        margin-bottom: 20px
    }

    .ul{
        position: relative;
        padding: 0;
    }

    .jobs li{
        list-style-type: none;
        display: block;
        margin-bottom: 10px;
        padding: 10px;
        background: white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        border-radius: 10px;
        width: 100%;
        box-sizing: border-box;
    }

    .jobs li:hover{
        cursor: pointer;
    }

</style>