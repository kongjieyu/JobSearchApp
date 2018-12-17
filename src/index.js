import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import reducer
import { counter } from './index.redux'
import { Provider } from 'react-redux'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f

//这一步就将reduce放进了store里面了
//applyMiddleware加在reducer后面,把thunk作为参数传人
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    reduxDevtools
))



    //App既react文件
    //渲染App里面需要传很多参数
ReactDom.render(
    (<Provider store={store}>
        <App />
    </Provider>),
    document.getElementById('root')
)


// //每次状态改变就执行render
// store.subscribe(render)
