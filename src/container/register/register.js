import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
//connect负责从外部获取组件需要的参数
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    //要的state属性，和方法都通过connect放到props里
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props) {
        super(props);
        // this.state = {
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type: '' //或者boss
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }
//因为login.js页面中也有handleChange()，所以我们可以用高阶组件进行优化
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleRegister(){
        this.props.register(this.props.state)
        console.log(this.props.state)
    }

    //因为是个路由组件，可以直接使用this.props.history.push()
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem 
                            onChange={(v) => { this.props.handleChange('user', v)}}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v) => { this.props.handleChange('pwd', v)}}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={(v) => { this.props.handleChange('repeatpwd', v)}}
                        >确认密码</InputItem>
                        <RadioItem
                            checked={this.props.state.type==='genius'}
                            onChange={() => { this.props.handleChange('type', 'genius')}}
                            >牛人
                        </RadioItem>
                        <RadioItem 
                            checked={this.props.state.type==='boss'}
                            onChange={() => { this.props.handleChange('type', 'boss')}}
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



function WrapperHello3(fn){
    return function(){
        console.log('WrapperHellow2')
        fn()
    }
}