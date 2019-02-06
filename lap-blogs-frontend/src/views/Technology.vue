<template>
	<div class="technology">
		<div style="color:#000;">
			<h1 class="titletop">{{ param }} </h1>
			<div v-for="blog in realBlogs" class="blogs-container">
				<div class="blog">
					{{ blog.title }}{{ blog.userName }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//这个页面的逻辑为第一次进入通过生命周期created(),然后设置data里的blogs,blogd
	//的变化会触发计算属性realBlogs的变化，而realBlogs则为真正要渲染的数据;
	//同理，第二次以上改变路由通过watch监听计算属性param(路由携带过来的参数),
	//更新data里的blogs，然后触发更新计算属性realBlogs,最后渲染数据
	export default {
		name: 'technology',
		data() {
			return {
				blogs:[]
			}
		},
		watch:{
			param(){ //第二次以上进入并更新路由
				let type = this.$route.params.languageId;
				let blogs = this.$store.getters.blog;
				this.blogs = blogs[type];
			}
		},
		computed: {
			param: function () {
				return this.$route.params.languageId;
			},
			realBlogs(){
				return this.blogs;
			},
		},
		created() { //第一次进入
			let type = this.$route.params.languageId;
			let blogs = this.$store.getters.blog;
			this.blogs = blogs[type];
		},
		mounted() {
		},
		methods: {}
	}
</script>
<style scoped>
	.technology{
		background-image: url("../assets/girls.jpg");
		background-repeat: no-repeat;
		background-size:cover;
		height: 100%;
		opacity: 0.90;
	}
	.blogs-container{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.blog{
		background-color:rgb(240,240,240,0.80);
		height:75px;
		width:80%;
		margin: 15px auto;
		border-radius: 4px;
		cursor: pointer;
	}
	.titletop{
		height:50px;
		line-height: 50px;
		color:#fff;
		/* background-color:#303133;           */
		font-size: 20px;
		width: 80%;
		padding:10px;
		margin:0px auto;
	}
</style>