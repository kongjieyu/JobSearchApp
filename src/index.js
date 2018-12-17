import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import reducer
import { counter, addGun, removeGun, addGunAsync } from './index.redux'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools
))



function render() {
    //App既react文件
    //渲染App里面需要传很多参数
    ReactDom.render(<App store={store} addGun = {addGun} removeGun = {removeGun} addGunAsync = {addGunAsync}/>, document.getElementById('root'))
}
render()

//每次状态改变就执行render
store.subscribe(render)
