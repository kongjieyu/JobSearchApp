import React from 'react'
import ReactDom from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import reducer
import reducer from './reducer'
//mport { counter } from './index.redux'
import { Provider } from 'react-redux'
import { 
    BrowserRouter, 
    Route, 
    Redirect,
    Switch 
} from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard.js'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    reduxDevtools
))
console.log(store.getState())


class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return <h2>测试组件 {this.props.location.pathname}</h2>
    }
}

// 登陆：
//     没有登陆信息统一跳转到login
// 页面： 导航+显示+注销
//     一营
//     二营
//     骑兵连


    //App既react文件
    //渲染App里面需要传很多参数
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* 只渲染命中的第一个Route */}
                    <Route path='/login' component = {Auth} exact></Route>
                    <Route path='/dashboard' component = {Dashboard} exact></Route>
                    <Redirect to='/dashboard'></Redirect>  
            </Switch>
        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)


// //每次状态改变就执行render
// store.subscribe(render)
