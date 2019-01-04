import React from 'react';
//因为我们所有用户的数据都存在redux里。所以我们只需要引入connect
import { connect } from 'react-redux';
import { Result, Icon, WhiteSpace, List, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
//引入action去清除redux中的数据
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom'


@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{
    constructor(props){
        super(props);
        console.log('这里是constructor')
        this.logout = this.logout.bind(this)
    }

    logout(){
       
        console.log('logoutttt')
        const alert = Modal.alert;
        alert('注销', '确认退出吗？', [
        { text: 'cancel', onPress: () => console.log('cancel') },
        { text: 'Ok', onPress: () => {
            console.log('ok')
            //清除cookies
            browserCookie.erase('userid')
            //接下来我们要把redux中的数据清除一下
            this.props.logoutSubmit()

        }},
        ])
    }
    render(){
        
        console.log(this.props)
        const props = this.props
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user?(
            <div>
                 <Result
                     img={<img src={require(`../../component/img/${this.props.avatar}.png`)} alt="" style={{ width:40 }}/>}
                     title={this.props.user}
                     message={props.type==='boss'?props.company:null}
                />
            <WhiteSpace /> 
            <h2>dfdf</h2>
            <List renderHeader={() => '简介'} className="my-list">
                <Item multipleLine >
                    {props.title}
                    {props.desc.split('\n').map(v => (
                        <Brief key={v}>
                        {v}
                        </Brief>
                    ))} 
                    {props.money?<Brief>薪资{}</Brief>:null}

                </Item>
            </List>
            <WhiteSpace></WhiteSpace>
            {/* <List>
                <Item onClick={this.logout}>退出登陆</Item>
            </List> */}
            <Button onClick={this.logout} type='primary'>
                退出登陆
            </Button>
            </div>
            // 没有user的时候就跳转
        ):<Redirect to={props.redirectTo}/>

    }
}
export default User