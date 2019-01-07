import axios from 'axios'
import io from 'socket.io-client';
//因为现在处于跨域的状态，但是如果后来不需要跨域了，我们就不用传任何东西
const socket = io('ws://localhost:9093')

//action
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

//设置初始状态
const initState = {
    //当用户发来的信息要放在chatmsg这个[]数组里
    chatmsg: [],
    //同时维护chatmsg和unread
    //unread是需要实时维护的
    unread: 0,
    users:{}
}

//设置reducer
export function chat(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            //chatmsg就是把信息的data都传进来，unread就是把没有读过的数据的长度传进来
            return {...state, users:action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        // case MSG_RECV:
        case MSG_RECV:
            const n = action.payload.to == action .userid?1:0
            //在msg的数组上append一条当前的msg
            return {...state, chatmsg:[...state.chatmsg, action.payload], unread: state.unread+n}
        // case MSG_READ:
        default:
            return state
    }
}



//action creator
function msgList(msgs, users, userid){
    return {type: MSG_LIST, payload: {msgs,users,userid}}
}

function msgRecv(msg, userid){
    return {userid, type: MSG_RECV, payload: msg}
}

export function recvMsg(){
    return (dispatch, getState) => {
        //监听
        socket.on('recvmsg', function(data){
            console.log('recvmsg', data)
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}
//action creator 默认要返回一个obj或者函数
export function sendMsg({from, to, msg}){
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}
export function getUMsgList(){
    return (dispatch, getState) => {
        //要在server user.js中定义路由
        axios.get('/user/getmsglist')
            .then(res=>{
                if (res.status===200&&res.data.code===0){
                    //在redux里面可以通过getState可以获取全部的状态
                    const userid = getState().user._id
                    console.log(userid)
                    console.log('getUMsgState')
                    //在redux里面可以通过getState可以获取全部的状态
                    console.log('getState', getState())
                    //这里用dispatch
                    dispatch(msgList(res.data.msgs, res.data.users))
                    console.log(res.data.msgs)
                }
            })
    }
}