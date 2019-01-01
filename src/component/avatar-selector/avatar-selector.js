import React from 'react'
import { Grid } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const avatarList = 'kk,jj,yy,cc,zz,dd'
                            .split(',')
                            //v 是所有图片的名字
                            //map 之后的结果是 => 后面那部分
                            .map (v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))

        // const avatarList1 = 'kk,jj,yy,cc,zz,dd'
        //                     .split(',')
        //                     //v 是所有图片的名字
        //                     //map 之后的结果是 => 后面那部分
        //                     .map (v => ({
        //                         icon: require(`../img/${v}.png`),
        //                         ele: v
        //                     }))
        
        const gridHeader = this.state.icon
                            ? (<div>
                                    <span>已选择头像</span>
                                    <img style={{width:20}} src={this.state.icon} alt=""/>
                                </div>)
                                : <div>'请选择头像'</div>
        
        return (
            <div>
                {gridHeader}
                <Grid 
                    data={avatarList} 
                    columnNum = {3}
                    onClick = {elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                        console.log('elm')
                    }}
                />
                {/* 这种写法可以不现实text */}
                {/* <div className="sub-title">Custom GridCell Style</div>
                <Grid 
                    data={avatarList1} 
                    columnNum={3} 
                    itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }}
                    onClick = {elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.ele)
                        console.log('elm')
                    }}
                    /> */}

            </div>

        )
    }
}

export default AvatarSelector