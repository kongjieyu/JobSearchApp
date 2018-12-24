import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component{
   constructor(props) {
        super(props);
        this.register = this.register.bind(this)
    }
    //因为是个路由组件，可以直接使用this.props.history.push()
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                <h2>我是登陆页面</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary'>登陆</Button>
                        <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login