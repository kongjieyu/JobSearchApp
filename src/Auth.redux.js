import axios from 'axios'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

const initState = {
    isAuth:false,
    user:'李云龙',
    age:20
}

export function auth(state=initState, action) {
    //尝试去打印每个reducer的state
    console.log(state,action)
    switch(action.type){
        case LOGIN:
            return {...state, isAuth:true}
        case LOGOUT:
            return {...state, isAuth:false}
        case USER_DATA:
            return {...state, user: action.payload.user, age: action.payload.age}
        default:
            return state
    }
}

//action creator
export function getUserData(){
    //  dispatch 用来通知数据修改
    return dispatch => {
        axios.get('/data')
            .then(res => {
                console.log(res)
                if(res.status==200){
                    dispatch(userData(res.data))
                    //this.setState({data:res.data})
                }
            })
    }
}
export function userData(data){
    return {type:USER_DATA, payload:data}
}

export function login(){
    return {type:LOGIN}
}

export function logout(){
    return {type:LOGOUT}
}