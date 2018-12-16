import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore } from 'redux'
//import reducer
import { counter } from './index.redux'

//这一步就将reduce放进了store里面了
const store = createStore(counter)

function render() {
    //App既react文件
    //渲染App里面需要传很多参数
    ReactDom.render(<App store={store}/>, document.getElementById('root'))
}
render()

//每次状态改变就执行render
store.subscribe(render)
