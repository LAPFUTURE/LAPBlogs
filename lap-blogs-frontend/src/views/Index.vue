<template>
    <div>
      <h1>This is an Index page</h1>
      <button @click="sendHttp">{{ buttonValue }}</button>
    </div>
  </template>
  
<script>
    export default {
      name: 'home',
      data(){
        return {
            buttonValue:"CLICK ME!"
        }
      },
      methods:{
        sendHttp(){
            this.$axios.post('http://localhost:8080/')
            .then((res)=>{
                console.log(res);})
            .catch((error)=>{
                console.log(error);
            })
        }
      }
    }
</script>
  