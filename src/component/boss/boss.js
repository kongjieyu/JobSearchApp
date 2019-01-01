import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux'

@connect(
    //获取chatuser的state
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        console.log('componentDidUpdate')
        this.props.getUserList('genius')
        //---注意啦，我要把这部分代码移到chatuser.redux.js中，就是不再用setState，而是用dispatch了---
    
        // axios.get('/user/list?type=genius')
        //     .then(res=>{
        //         if (res.data.code===0){
        //             this.setState({data: res.data.data})
        //         }
        //     })
    }
    render(){
        console.log('lots of genius')
        console.log(this.props.userlist)
        const Header = Card.Header
        const Body = Card.Body
        return(
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                        <Card key={v._id}>
                        <Header
                            title = {v.user}
                            thumb = {require(`../img/${v.avatar}.png`)}
                            thumbStyle = {{width:40}}
                            extra = {<span>{v.title}</span>}
                        />
                        <Body>
                            {v.desc.split('\n').map(v=>(
                                <div key={v._id}>{v}</div>
                            ))}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
        return null
    }
}

export default Boss