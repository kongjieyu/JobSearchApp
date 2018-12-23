import React from 'react'
import axios from 'axios'
//要把AuthRoute变成路由组件
import { withRouter } from 'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
    //每个组件都有自己的生命周期，关于componentDidMount中的code，在进入这个组件的时候就会先执行 componentDidMount 里面的代码
    componentDidMount(){
        //设例外区（即不登录也可以看到的区域）
        const publicList = ['/login', 'register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1) {
            return null
        }
        console.log(this.props)
        //获取用户信息从
        axios.get('user/info')
            //then可以返回当前这次请求返回的值
            .then(res=>{
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        // 有登陆信息
                    } else {
                        this.props.history.push('/login')
                        console.log(this.props.history)
                    }
                    console.log(res.data)
                }
            })
            //是否登陆
            //现在的url地址  如果没有登陆，需要跳转到login页面；但是如果已经在login页面的话，就不需要跳转
            //还需要检测用户的身份， 是boss还是牛人
            //用户是否完善信息 （选择头像和个人简介）
    }

    render(){
        return null
    }
}

export default AuthRoute