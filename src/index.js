import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import reducer
import { counter } from './index.redux'
import { Provider } from 'react-redux'
import { 
    BrowserRouter, 
    Route, 
    Link, 
    Redirect, 
    Switch 
} from 'react-router-dom'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

function Erying(){
    return <h2>Erying222</h2>
}

function Qibinglian(){
    return <h2>Qibinglian333</h2>
}


class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return <h2>测试组件 {this.props.location.pathname}</h2>
    }
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
            <Switch>
                {/* 只渲染命中的第一个Route */}
                    <Route path='/' component = {App} exact></Route>
                    <Route path='/erying' component = {Erying} exact></Route>
                    <Route path='/qibinglian' component = {Qibinglian} exact></Route>
                    <Route path='/:location' component = {Test} exact></Route> 
            </Switch>


        </div>
        </BrowserRouter> 
    </Provider>),
    document.getElementById('root')
)


// //每次状态改变就执行render
// store.subscribe(render)
