import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
	SET_AUTHENTICATED: "SET_AUTHENICATED",
	SET_USER: "SET_USER",
	SET_BLOG: "SET_BLOG",
	SET_USERINFO: "SET_USERINFO"
}

const state = {
	isAuthenticated: false, //授权状态
	user: {}, //email,name,id
	blog: {}, //请求的blog
	userInfo: {} //temporarySave(暂存区),saveTime(保存时间)
}

const getters = {
	isAuthenticated: state => state.isAuthenticated,
	user: state => state.user,
	blog: state => state.blog,
	userInfo: state => state.userInfo
}

const mutations = {
	//es6计算属性
	[types.SET_AUTHENTICATED](state, isAuthenticated) {
		isAuthenticated ? state.isAuthenticated = isAuthenticated : state.isAuthenticated = false;
		//如果有授权的话就是store.isAuthenticates为true，否则为false
	},

	[types.SET_USER](state, user) {
		user ? state.user = user : state.user = {};
	},

	[types.SET_BLOG](state, blog) {
		blog ? state.blog = blog : state.blog = {};
	},

	[types.SET_USERINFO](state, userInfo) {
		userInfo ? state.userInfo = userInfo : state.userInfo = {};
	},
}

const actions = {
	//setAuthenticated
	setAuthenticated: ({
		commit
	}, isAuthenticated) => {
		commit(types.SET_AUTHENTICATED, isAuthenticated);
	},
	setUser: ({
		commit
	}, user) => {
		commit(types.SET_USER, user);
	},
	setBlog: ({
		commit
	}, blog) => {
		commit(types.SET_BLOG, blog);
	},
	setUserInfo: ({
		commit
	}, userInfo) => {
		commit(types.SET_USERINFO, userInfo);
	},
	clearCurrentState: ({
		commit
	}) => {
		commit(types.SET_AUTHENTICATED, false);
		commit(types.SET_USER, null);
		commit(types.SET_USERINFO, null);
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})