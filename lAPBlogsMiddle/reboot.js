//这个有问题，还是用forever比较好
let exec = require("child_process").exec;

let last; 

function run(){
	last = exec('npm run server.js');
	last.on('exit',function(status){
		if(status === '0'){
			console.log("server.js重启成功...");
		}else{
			console.log("server.js重启失败...");
		}
	})
}

function check(){
	last = exec('lsof -i:8010');
	last.on('exit',function(status){
		if(status !== '0'){
			console.log("server.js中断，即将重启...");
			run();
		}else{
			console.log("server.js正常运行");
		}
	})
	setTimeout(check,6000);
}

check();

