import React from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client';
//因为现在处于跨域的状态，但是如果后来不需要跨域了，我们就不用传任何东西
const socket = io('ws://localhost:9093')

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: []
        }
    }
    componentDidMount(){
        socket.on('recvmsg', (data)=>{
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }
    handleSubmit(){
        //emit是发送事件
        socket.emit('sendmsg',{text:this.state.text})
        console.log(this.state)
        //发送完成之后要把text清空
        this.setState({text:''})
        console.log(this.state)
    }
    render(){
        console.log(this.props)
        return(
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>


        )
    }
}

export default Chat