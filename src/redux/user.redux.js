
import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo: '',
    isAuth : '',
    msg : '',
    user : '',
    pwd : '',
    type : ''
}

//reducer
export function user(state = initState, action){
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }

}
//action creator
function registerSuccess(data){
    return {type: REGISTER_SUCCESS, payload: data}
}
//action creator
function errorMsg(msg){
    return { msg, type: ERROR_MSG }
}

export function register({user, pwd, repeatpwd, type}) {
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    //thunk插件的作用-这里可以返回一个函数，dispatch 是函数的一个参数
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if(res.status===200&&res.data.code===0){
                    //手动执行dispatch
                    console.log('here 200')
                    dispatch(registerSuccess({user, pwd, type}))
                }else{
                    console.log('here else')
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}