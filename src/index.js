//新建store
import { createStore } from 'redux'

//新建reducer
//根据老的状态生成新的状态
//每个aciton时有type的
function counter(state = 0, action) {
    switch(action.type){
        case '加机关枪':
            return state + 1
        case '减机关枪':
            return state - 1
        default: 
            return 10
    }
}
//括号里面要放reducer
const store = createStore(counter)
//初始状态
const init = store.getState()
console.log(init)
store.dispatch({type: '加机关枪'})
const secondState = store.getState()
console.log(secondState)
store.dispatch({type: '加机关枪'})
const thirdState = store.getState()
console.log(thirdState)
store.dispatch({type: '加机关枪'})
const forthState = store.getState()
console.log(forthState)