<template>
   <vs-row vs-justify="center">
     <vs-button @click="showPopup" type="gradient" color="primary" icon="add" size="small" v-if="showbtn"></vs-button>
        <vs-popup classContent="popup-example" :button-close-hidden="hideCloseBtn"  :title.sync="title" :active="active">
           <slot name="content">
               <!--Pop up content-->
           </slot>
           <div class="actions">
                <vs-row vs-justify="center">
                   <slot name="action">
                        
                    </slot>
                </vs-row>
           </div>
        </vs-popup>
    </vs-row>
</template>

<script>

export default {
    name:"Popup",
    props:{
        title:String,
        showbtn:Boolean,
        active:Boolean,
        hideCloseBtn:Boolean
    },
    methods: {
        showPopup:function(){
            this.$emit('open')
            this.$store.dispatch('openPopup')
        }
    },
}
</script>

<style>
    div.actions{
        padding: 0%;
    }
    .popup-example{
        text-align: center;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>