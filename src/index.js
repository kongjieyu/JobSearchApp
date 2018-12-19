import React from 'react'
import ReactDom from 'react-dom'

import Auth from './Auth'
import Dashboard from './Dashboard'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
//import reducer
import { counter } from './index.redux'
import reducers from './reducer'
const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(reducers, compose(
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
        console.log(this.props.location.pathname)
        return <h2>测试测试</h2>
    }
}



//登陆
//页面 导航+显示+注销
//router+redux

//App既react文件
//渲染App里面需要传很多参数
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            {/* Swith只渲染命中的第一个Route  */}
            <Switch>
                <Route path='/login' component = {Auth} exact></Route>
                <Route path='/dashboard' component = {Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
                {/* <Route path='/qibinglian' component = {Qibinglian}></Route> 
                <Route path='/:location' component = {Test}></Route>  */}
            </Switch>

        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)
