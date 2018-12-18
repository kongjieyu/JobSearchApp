import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
//import reducer
import { counter } from './index.redux'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

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

function Erying() {
    return <h2>二营</h2>
}
function Qibinglian() {
    return <h2>骑兵连</h2>
}

//App既react文件
//渲染App里面需要传很多参数
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        <div>
            <ul>
                <li>
                    <Link to='/'>一营</Link>
                </li>
                <li>
                    <Link to='/erying'>二营</Link>
                </li>
                <li>
                    <Link to='/qibinglian'>骑兵连</Link>
                </li>
            </ul>
            {/* Swith只渲染命中的第一个Route  */}
            <Switch>
                <Route path='/' component = {App} exact></Route>
                <Route path='/erying' component = {Erying}></Route>
                <Route path='/qibinglian' component = {Qibinglian}></Route> 
                <Route path='/:location' component = {Test}></Route> 
            </Switch>

        </div>
        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)
