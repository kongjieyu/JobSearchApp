import React from 'react'
import { connect } from 'react-redux'
import { login, getUserData } from './Auth.redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

//两个reducer,每个reducer都有state
//合并reducer
@connect(
    state => state.auth,
    {login, getUserData}
)

class Auth extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
    }
     
    componentDidMount (){
        axios.get('data')
            .then(res => {
                if(res.status == 200){
                    this.setState({data:res.data})
                }
            })
    }
    render(){
        if(!this.state.data.length){
            return null
        }
        return (
            <div>
                {/* <h2>我的名字是：{this.state.data[0].user}</h2>   */}
                 <h2>我的名字是： {this.props.user}, 年龄{this.props.age}</h2> 
                { this.props.isAuth? <Redirect to='/dashboard' /> : null}
                <h2>你没有权限，需要登陆</h2>
                <button onClick = {this.props.login}>登陆</button>
            </div>
        )

    }
}

export default Auth