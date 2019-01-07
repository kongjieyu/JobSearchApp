import React from 'react'
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//因为navLinkBar不是路由组件，所以需要加上withRouter来加上和路由相关的信息
//withRouter 是一个高阶组件，把 match，location，history 三个对象注入到组件的 props 中
@withRouter
@connect(
    //要的state属性，直接获取所有的状态
    state=>state.chat
)

class NavLinkBar extends React.Component{
    //控制数据格式
   static propTypes = {
        selectAvatar: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v => !v.hide)
        console.log(navList)
        const {pathname} = this.props.location
        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                    //badge就是icon旁边的小红点；因为不能在所有地方都现实badge，所以要加一个判断
                        badge={v.path=='/msg'?this.props.unread:''}
                        key = {v.path}
                        title = {v.text}
                        icon = {{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon = {{uri: require(`./img/${v.icon}-active.png`)}}
                        selected = {pathname === v.path}
                        onPress = {()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar