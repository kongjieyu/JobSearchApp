//reducer.js
//1. 和reducer相关的常量
//将action type定义成常量
const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

//2. 这是reducer
//每个aciton时有type的
export function counter(state = 10, action) {
    //尝试去打印每个reducer的state
    console.log(state)
    switch(action.type){
        case '加机关枪':
            return state + 1
        case '减机关枪':
            return state - 1
        default: 
            return 10
    }
}

//3. action creator 创建action
export function addGun(){
    return {type: ADD_GUN}
}

export function removeGun(){
    return {type: REMOVE_GUN}
}

export function addGunAsync(){
    return dispatch => {
        setTimeout(()=>{
            dispatch(addGun())
        }, 2000)
    }
}