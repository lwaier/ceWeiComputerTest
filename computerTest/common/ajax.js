//自定义post 方法


import {IP} from '@/common/config.js'; //服务地址

export default (api,options) =>{
	return new Promise((resolve,reject)=>{
		
		let obj = {
			// url:'https://3e2t688318.wicp.vip'+api,	//线上
			url:IP+api, //本地
			method:"POST",
		}
		if(options){
			obj.data = options
		}
		uni.request({
			...obj,
			success:(data)=>{
				resolve(data)
			},
			fail:(err)=>{
				console.log(err,'接口请求失败信息')
				reject(err)
			}
		})
	})
}