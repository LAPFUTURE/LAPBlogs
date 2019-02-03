// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED:"SET_AUTHENICATED",
  SET_USER:"SET_USER",
  SET_BLOG:"SET_BLOG"
}

const state = {
  isAuthenticated:false,
  user:{},
  blog:{},
}

const getters = {
  isAuthenticated:state => state.isAuthenticated,
  user:state => state.user,
  blog:state => state.blog 
}

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    isAuthenticated ? state.isAuthenticated = isAuthenticated : state.isAuthenticated = false;
    //如果有授权的话就是store.isAuthenticates为true，否则为false
  },

  [types.SET_USER](state,user){
    user ? state.user = user : state.user = {};
  },

  [types.SET_BLOG](state,blog){
    blog ? state.blog = blog : state.blog = {};
  }

}

const actions ={
  //setAuthenticated
  setAuthenticated:({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user);
  },
  setBlog:({commit},blog)=>{
    commit(types.SET_BLOG,blog);
  },
  clearCurrentState:({commit})=>{
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_USER,null);
    commit(types.SET_BLOG,null)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
