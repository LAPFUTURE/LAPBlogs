<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	import jwt_decode from 'jwt-decode'

	export default {
		name: 'app',
		components: {},
		created() { //刷新后保存用户状态
			if (localStorage.eleToken) {
				let decoded = jwt_decode(localStorage.eleToken);
				this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
				this.$store.dispatch('setUser', decoded);
				let idArrays = localStorage.getItem("idArrays").toString().split(",");
				let idObject = idArrays.map((item)=>{let obj = {};obj.$oid = item;return obj;});
				let userInfo = {
					"temporarySave":{
						"title":localStorage.title,
						"content":localStorage.content,
						"saveTime":localStorage.saveTime,
					},
					"lastLoginTime":localStorage.lastLoginTime,
					"userBlogs":idObject
				};
				this.$store.commit('SET_USERINFO',userInfo);
			}
		},
		mounted() { //刷新请求新数据
			this.$axios.get(this.host + "/api/blogs/requestBlogs")
				.then((res) => {
					this.$store.commit("SET_BLOG",res.data.blogs);
				}).catch((error) => {
					this.$message({
						message: "出错了,请稍后再试!",
						type: "error",
						center: true
					});
				});
		},
		methods: {
			isEmpty(value) {
				return (
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