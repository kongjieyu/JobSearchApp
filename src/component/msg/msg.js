import React from 'react'
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
    state=>state
)

class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        console.log(this.props)
        const Item = List.Item
        const Brief = Item.Brief
        //当前登陆用户的_id
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        //按照聊天用户分组， 根据chatid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        console.log(msgGroup)
        // 只取出values
        // console.log(Object.values({name:'imooc', age:18}))
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            //这里比大小，不像数字比大小那么简单，所以需要获取时间戳
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        //排序数字的sort方法：从小到大排序
        // console.log([3,2,4,1,5].sort(function(a,b){
        //     return a-b
        // }))
        return(
            <div>

                    {chatList.map(v=>{
                        console.log(v)
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from==userid?v[0].to:v[0].from
                        const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                        console.log('from+to')
                        console.log(userid)
                        console.log(v[0].to)
                        console.log(v[0].from)
                        if(!userinfo[targetId]){
                            return null
                        }
                        {/* const name = userinfo[targetId]?userinfo[targetId].name:''
                        const avatar = userinfo[targetId]?userinfo[targetId].avatar:'' */}
                        return(
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                    arrow='horizontal'
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{userinfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })}

            </div>
        )
    }
}
export default Msg