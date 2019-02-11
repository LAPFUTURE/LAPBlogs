import axios from 'axios'
import {Message,Loading} from 'element-ui'
import router from './router'

let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'Loading...',
        background:'rgb(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}

axios.interceptors.request.use(//发送请求前拦截请求,将eleToken加入到headers.Authorization
    (config)=>{
        startLoading();
        if(localStorage.eleToken){//已登录后则设置请求头
            config.headers.Authorization = localStorage.eleToken;
            // console.log(config.headers.Authorization)
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response)=>{//返回拦截
        endLoading();
        return response;
    },error=>{
        endLoading();
        Message.error("时间已过期，请重新登录!");
        localStorage.clear();
        this.$store.dispatch("clearCurrentState");
        router.push('/login');
        return Promise.reject(error);
    }
)


export default axios;
