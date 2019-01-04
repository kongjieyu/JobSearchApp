import React from 'react'
import PropTypes from 'prop-types';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component{
    static PropTypes = {
        userlist: PropTypes.array.isRequired
    }
    render(){
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
                            {v.type === 'boss'?<div>公司:{v.company}</div>:null}
                            {v.desc.split('\n').map(d=>(
                                <div key={d._id}>简介:{d}</div>
                            ))}
                            {v.type === 'boss'?<div>薪资:{v.money}</div>:null}
                        </Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}


export default UserCard
// export const UserCard = (props) => {
//     return 
// }