<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
  import jwt_decode from 'jwt-decode'

  export default {
      name: 'app',
      components: {},
      created(){
        if(localStorage.eleToken){
          let decoded = jwt_decode(localStorage.eleToken);
          let blog = localStorage.blog;
          this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded)); 
          this.$store.dispatch('setUser',decoded);
          this.$store.dispatch('setBlog',blog);
        }
      },
      methods: {
          isEmpty(value){
              return(
                  value === undefined || 
                  value === null ||
                  (typeof value === "object" && Object.keys(value).length === 0) ||
                  (typeof value === "string" && value.trim().length === 0)
              )
          }
      }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
