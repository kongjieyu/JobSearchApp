//登陆成功之后，所有的页面都归dashboard.js管理
import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../container/user/user'
import Msg from '../msg/msg'
import { getUMsgList, recvMsg } from '../../redux/chat.redux'

// function Boss(){
//     return <h2>Boss首页</h2>
// }
// function Genius(){
//     return <h2>牛人首页</h2>
// }
// function Msg(){
//     return <h2>消息首页</h2>
// }
// function User(){
//     return <h2>个人中心</h2>
// }

@connect(
    state=>state,
    { getUMsgList, recvMsg }
)

class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getUMsgList()
            this.props.recvMsg()
        }
    }
    render(){
        //Dashboard 本身就是个router组件
        console.log(this.props)
        const pathname = this.props.location.pathname 
        //redux里面的数据
        
        const user = this.props.user
        //每个数据都是一个对象
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type==='boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            },

        ]
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            //所有遍历都需要key
                            <Route key={v.path} path={v.path} component={v.component} ></Route>
                        ))}
                    </Switch>
                </div>
                {/* 把navList传给子组件  */}
                 <NavLinkBar data={navList}></NavLinkBar> 
            </div>
        ) 
    }
}

export default Dashboard