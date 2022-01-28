<template>
    <div class="job_content">
        <h1>Jobs</h1>
    <div class="jobs">
       <input type="text" placeholder="Add new Job" v-model="newJob" @keypress.enter="addJob">
        <div  v-if="allJobs.length">
            <ul>
                <li v-for="job in allJobs" :key="job.id" @click="deleteJob(job.id)">
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
export default {
    name:"Jobs",
    data(){
        return{
            api_uri: process.env.VUE_APP_API_ROOTER,
            newJob:"",
            allJobs:[]

        }
    },
    methods:{
        addJob(){
            console.log("Adding a job")
        },

        deleteJob(id){
            console.log(`delete this job id: ${id}`)
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

    . ul{
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