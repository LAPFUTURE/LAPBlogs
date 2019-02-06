<template>
	<div class="technology">
		<div style="color:#000;">
			<h1 class="titletop">{{ param }} </h1>
			<div v-for="blog in realBlogs" class="blogs-container">
				<router-link :to="{ name: 'detail', params: { blogId: blog._id, blogType: blogType}}">
					<div class="blog">
						<span class="blog-insert-time">{{ blog.insertTime }}</span>
						<span class="blog-title">{{ blog.title }}</span>
						<span class="blog-user-name">from {{ blog.userName }}</span>
						<!-- <span>{{ blog.content }}</span> -->
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	//这个页面的逻辑为第一次进入通过生命周期created(),然后设置data里的blogs,blogd
	//的变化会触发计算属性realBlogs的变化，而realBlogs则为真正要渲染的数据;
	//同理，第二次以上改变路由通过watch监听计算属性param(路由携带过来的参数),
	//更新data里的blogs，然后触发更新计算属性realBlogs,最后渲染数据
	//官方文档是另外一种做法 watch: {
	//	'$route' (to, from) {
      // 对路由变化作出响应...
    //}
	export default {
		name: 'technology',
		data() {
			return {
				blogs:[],
				blogType:''
			}
		},
		watch:{
			param(){ //第二次以上进入并更新路由
				let type = this.$route.params.languageId;
				this.blogType = type;
				let blogs = this.$store.getters.blog;
				this.blogs = blogs[type];
				console.log(blogs);
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
			this.blogType = type;
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
		display: flex;
		justify-content: space-between;
		background-color:rgb(240,240,240,0.90);
		height:50px;
		width:80%;
		margin: 15px auto;
		border-radius: 4px;
		cursor: pointer;
	}
	.blog:hover{
		background-color:rgb(240,240,240,1);
	}
	.titletop{
		height:70px;
		line-height: 50px;
		color:#fff;
		/* background-color:#303133;           */
		font-size: 20px;
		width: 80%;
		padding:10px;
		margin:0px auto;
	}
	.blog-title{
		display: inline-block;
		height:70px;
		line-height: 50px;
		font-size: 20px;
	}
	.blog-insert-time{
		/* color:#67C23A; */
		margin-left:10px;
		display: inline-block;
		height:70px;
		line-height: 50px;
		font-size: 16px;
	}
	.blog-user-name{
		display: inline-block;
		height:70px;
		line-height: 50px;
		font-size: 16px;
		margin-right:10px;
	}
</style>