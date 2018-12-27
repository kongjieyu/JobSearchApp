
import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

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
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
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
function loginSuccess(data){
    return {type: LOGIN_SUCCESS, payload: data}
}

//action creator
function errorMsg(msg){
    return { msg, type: ERROR_MSG }
}
//
export function loadData(userinfo){
    return {type: LOAD_DATA, payload: userinfo}
}

//这个function需要导入到login页面
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入')
    }
    //thunk插件的作用-这里可以返回一个函数，dispatch 是函数的一个参数
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if(res.status===200&&res.data.code===0){
                    //手动执行dispatch
                    console.log('here login200')
                    console.log(res.data.data)
                    dispatch(loginSuccess(res.data.data))
                }else{
                    console.log('here else')
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//这个function需要导入到register页面
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