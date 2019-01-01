import React from 'react'
import ReactDom from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
//异步工具
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import component
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
//import reducer
import reducers from './reducer'
//import axios from 'axios'
import './config'
import './index.css'




const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reducer放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
//compose是用来组合函数的
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

// function Boss(){
//     return <h2>BOOOOsss</h2>
// }

// function Dashboard(){
//     return <h2>Dashboard</h2>
// }

//应用骨架：boss genuis me msg 4 个页面
//因为4个页面有相同的骨架，比如相同的header， 相同的底部的导航栏
//所以4个页面要用整体的web端的router将它包起来

ReactDom.render(
    (<Provider store={store}>
        {/* 用BrowserRouter包裹整个app */}
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    {/* 检验路由  */}
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    {/* <Route path='/boss' component={Boss}></Route> */}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    {/* 在没有任何路由命中的情况下，所有的路径都会命中这个Dashboard；但是在有path的情况下，就是没有命中其他的Route的时候就用这个  */}
                    <Route component={Dashboard}></Route>
                </Switch>

            </div>
        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)
