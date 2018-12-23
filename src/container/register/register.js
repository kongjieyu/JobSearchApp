import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
//connect负责从外部获取组件需要的参数
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
    //要的state属性，和方法都通过connect放到props里
    state=>state.user,
    {register}
)

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type: 'genius' //或者boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
        console.log(this.state)
    }

    //因为是个路由组件，可以直接使用this.props.history.push()
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem 
                            onChange={(v) => { this.handleChange('user', v)}}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v) => { this.handleChange('pwd', v)}}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v) => { this.handleChange('repeatpwd', v)}}
                        >确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type==='genuis'}
                            onChange={() => { this.handleChange('type', 'genuis')}}
                            >牛人
                        </RadioItem>
                        <RadioItem 
                            checked={this.state.type==='boss'}
                            onChange={() => { this.handleChange('type', 'boss')}}
                            >BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register