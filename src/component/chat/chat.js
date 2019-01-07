import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client';
import { connect } from 'react-redux'
import { getUMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
//因为现在处于跨域的状态，需要把localhost:9093传入；但是如果后来不需要跨域，就不用传任何东西
const socket = io('ws://localhost:9093')

@connect(
    //要的state属性，直接获取所有的状态
    state=>state,
    { getUMsgList, sendMsg, recvMsg }
)

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: []
        }
    }
    componentDidMount(){
        //把下面这两条函数放到dashboard那里去，因为进入到dashboard就要获取消息了
        if(!this.props.chat.chatmsg.length){
            this.props.getUMsgList()
            this.props.recvMsg()
        }


        // socket.on('recvmsg', (data)=>{
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    handleSubmit(){
        console.log(this.props)
        //emit是发送事件
        //socket.emit('sendmsg',{text:this.state.text})
        //console.log(this.state)
        //发送完成之后要把text清空
        // this.setState({text:''})
        // console.log(this.state)
        const from = this.props.user._id
        console.log(from)
        const to = this.props.match.params.user
        console.log(to)
        const msg = this.state.text
        console.log(msg)
        this.props.sendMsg({from, to, msg})
        this.setState({
            text:'',
            showEmoji: false
        })
    }
    render(){
        
        console.log(this.props)
        //获取当前的user
        //emoji表情
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                        .split(' ')
                        .filter(v=>v)
                        .map(v=>({
                            text:v
                        }))
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return(
            <div id='chat-page'>
                <NavBar 
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        console.log('onLeftClick')
                        this.props.history.goBack()
                    }}
                    >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    {/* 下面这条会报错，不知道为什么  */}
                    {/* const avatar = require(`../img/${users[v.from].avatar}.png`) */}
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    
                    return v.from==userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                        ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} />}
                                className='chat-me'>{v.content}</Item>
                        </List>
                        )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={
                            <div>
                                <span
                                    style={{marginRight:15}}
                                    onClick={()=>{
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                        this.fixCarousel()
                                    }}
                                >😀</span>
                                <span onClick={()=>this.handleSubmit()}>发送</span>
                            </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum = {9}
                        carouselMaxRow = {4}
                        isCarousel = {true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                            console.log(el)
                        }}
                    />:null}
                    
                </div>
            </div>


        )
    }
}

export default Chat