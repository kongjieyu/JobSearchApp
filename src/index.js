import React from 'react'
import ReactDom from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
//异步工具
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
//import component
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
//import reducer
import reducers from './reducer'
//import axios from 'axios'
import './config'
import './index.css'




const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
//compose是用来组合函数的
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

function Boss(){
    return <h2>BOOOOsss</h2>
}

ReactDom.render(
    (<Provider store={store}>
        {/* 用BrowserRouter包裹整个app */}
        <BrowserRouter>
            <div>
                {/* 检验路由  */}
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)
