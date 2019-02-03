<template>
  <div class="about">
    <h1>This is an technology page</h1>
    <h1>{{ param }} </h1>
    <h1>{{ $route.params.languageId }}</h1>
  </div>
</template>

<script>
    export default {
      name: 'technology',
      data(){
        return {}
      },
      computed:{
        param:function(){return this.$route.params.languageId;}
      },
      methods:{
      }
    }
</script>
