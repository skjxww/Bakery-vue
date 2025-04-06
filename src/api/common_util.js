import axios from 'axios'
const http = axios.create({
    timeout: 1000 * 86400,
    withCredentials: true,
    baseURL: 'http://localhost:8080',
    // headers: {
    //     'Content-Type': 'application/json; charset=utf-8'
    // }
})


var _commen_util={
    // 默认Failure
    defaultFailure:(message,code,url)=>{
        console.warn(`请求地址：${url},状态码：${code},错误信息:${message}`)
    },
    // 默认Err
    defaultErr:(err)=>{
        console.error(err)
    },
    // ------------------方法封装-------------------------------------------------------------------
    // 一般情况下只需要使用 没有 internal 开头的，已在headers里添加'Content-Type': 'application/json'，默认传JSON，并根据有无token传token
    // 不需要重写headers就不用用到internal开头的方法
    // Post重写
    internalPost:function (url,data,header,params,success,failure,error=this.defaultErr){
        http.post(url,data, {
            headers:header,params:params
        }).then(({data})=>{
            if(data.code===200){
                success(data.data)
            }else {
                failure(data.message,data.code,data.url)
            }
        }).catch(err=>error(err))
    },
    post:function(url,data,params,success,failure=this.defaultFailure){
        this.internalPost(url,data,this.accessHeader(),params,success,failure)
    }
    ,
    // Get重写
    internalGet:function(url,header,params,success,failure,error=this.defaultErr){
    http.get(url, {headers:header,params:params}).then(({data})=>{
        console.log(data)
        if(data.status===200){
            success(data.data)
        }else {
            failure(data.message,data.code,data.url)
        }
    }).catch(err=>error(err))
},
    get:function (url,params,success,failure=this.defaultFailure){
        this.internalGet(url,this.accessHeader(),params,success,failure)
    },
    get1:function (url,params,success,failure=this.defaultFailure){
        this.internalGet1(url,this.accessHeader(),params,success,failure)
    },
    internalGet1:function(url,header,params,success,failure,error=this.defaultErr){
        http.get(url, {headers:header,params:params}).then((rep)=>{
           let data=rep.data
            if(rep.status===200){
                success(data)
            }else {
                failure(data.message,data.code,data.url)
            }
        }).catch(err=>error(err))
    },

    
    // Delete重写
    internalDelete:function(url,header,params,success,failure,error=this.defaultErr){
        http.delete(url,{headers:header,params:params}).then(({data})=>{
            if(data.code===200){
                success(data.data)
            }else {
                failure(data.message,data.code,data.url)
            }
        }).catch(err=>error(err))
},
    delete:function(url,params,success,failure=this.defaultFailure){
        this.internalDelete(url,this.accessHeader(),params,success,failure)
    },
    // put重写
    internalPut:function(url,data,header,params,success,failure,error=this.defaultErr){
        http.put(url,data,{headers:header,params:params}).then(({data})=>{
            if(data.code===200){
                success(data.data)
            }else {
                failure(data.message,data.code,data.url)
            }
        }).catch(err=>error(err))
    },
    put:function(url,data,params,success,failure=this.defaultFailure){
        console.log("header"+ JSON.stringify(this.accessHeader()))
            this.internalPut(url,data,this.accessHeader(),params,success,failure)
    },
// ----------------------------------------token操作-------------------------------
    // 获取token检验
    takeAccessToken:()=>{
        // const str=localStorage.getItem('Authorization')||sessionStorage.getItem('Authorization');
        const str=sessionStorage.getItem('Authorization');
        if(!str){return null}
        const authObj=JSON.parse(str);
        // 日期检验
        // if(authObj.expire<=new Date().getTime()) {
        //     deleteAccessToken()
        //     console.log("已过期")
        //     return null
        // }
        return authObj
    },
    // 储存token
    storeAccessToken:(token)=>{
    const authObj={
        token:token
    }
    const str=JSON.stringify(authObj);
    sessionStorage.setItem('Authorization',str);
},
    //删除token
    deleteAccessToken:()=>{
        localStorage.removeItem('Authorization')
        sessionStorage.removeItem('Authorization')
    },
    // 将token写入header
    accessHeader:function(){
        const token =this.takeAccessToken();
        return token?{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token.token}`
        }:{'Content-Type': 'application/json',}
    }
}

export default _commen_util