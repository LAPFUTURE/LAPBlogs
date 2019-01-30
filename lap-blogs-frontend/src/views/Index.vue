<template>
    <div>
      <h1>This is an Index page</h1>
      <button @click="clickNodeApi">{{ nodeApi }}</button>
      <button @click="clickPythonApi">{{ pythonApi }}</button>
    </div>
  </template>
  
<script>
    export default {
      name: 'home',
      data(){
        return {
            nodeApi : "nodeAPI!",
            pythonApi : "pythonAPI!"
        }
      },
      methods:{
        clickNodeApi(){
            this.$axios.get('http://localhost:8009/')
            .then((res)=>{
                console.log(res);})
            .catch((error)=>{
                console.log(error);
            })
        },
        clickPythonApi(){
            this.$axios.post('http://localhost:8014/')
            .then((res)=>{
                console.log(res);})
            .catch((error)=>{
                console.log(error);
            })
        }
      }
    }
</script>
  