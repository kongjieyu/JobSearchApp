import axios from 'axios'
const USER_LIST = 'USER_LIST'

const initState = {
    userlist: []
}
//每个reducer都不要设计得过于庞大
//reducer
export function chatuser(state=initState, action){
    switch(action.type){
        case USER_LIST:
            return {...state, userlist: action.payload}
        default:
            return state
    }
}

//action-creator
//userList要穿进去一个data
function userList(data){
    return {type:USER_LIST, payload:data}
}

export function getUserList(type){
    return dispatch => {
        axios.get('/user/list?type='+type)
            .then(res=>{
                if (res.data.code===0){
                    //这里用dispatch
                    dispatch(userList(res.data.data))
                    console.log(res.data.data)
                    // this.setState({data: res.data.data})
                }
            })
    }
}