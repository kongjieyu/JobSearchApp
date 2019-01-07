import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    //获取chatuser的state
    state=>state.chatuser,
    //在connect中放入getUserList这个方法后，就可以通过props获取了
    {getUserList}
)

class Boss extends React.Component{

    constructor(props){
        super(props);
        //初始化state
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

        return(
            <UserCard userlist={this.props.userlist}></UserCard>
        )
        return null
    }
}

export default Boss