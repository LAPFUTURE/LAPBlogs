(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{4344:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"technology"},[a("div",{staticStyle:{color:"#000"}},[a("h1",{staticClass:"titletop"},[t._v(t._s(t.param)+" ")]),t._l(t.realBlogs,function(s){return a("div",{staticClass:"blogs-container"},[a("router-link",{attrs:{to:{name:"detail",params:{blogId:s._id,blogType:t.blogType}}}},[a("div",{staticClass:"blog"},[a("span",{staticClass:"blog-insert-time"},[t._v(t._s(s.insertTime))]),a("span",{staticClass:"blog-title"},[t._v(t._s(s.title))]),a("span",{staticClass:"blog-user-name"},[t._v("from "+t._s(s.userName))])])])],1)})],2)])},o=[],n={name:"technology",data:function(){return{blogs:[],blogType:""}},watch:{param:function(){var t=this.$route.params.languageId;this.blogType=t;var s=this.$store.getters.blog;this.blogs=s[t],console.log(s)}},computed:{param:function(){return this.$route.params.languageId},realBlogs:function(){return this.blogs}},created:function(){var t=this.$route.params.languageId;this.blogType=t;var s=this.$store.getters.blog;this.blogs=s[t]},mounted:function(){},methods:{}},l=n,i=(a("68a7"),a("2877")),r=Object(i["a"])(l,e,o,!1,null,"feb11838",null);s["default"]=r.exports},"68a7":function(t,s,a){"use strict";var e=a("f3d0"),o=a.n(e);o.a},f3d0:function(t,s,a){}}]);