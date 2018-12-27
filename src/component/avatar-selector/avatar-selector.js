import React from 'react'
import { Grid } from 'antd-mobile';

class AvatarSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const avatarList = 'kk,jj,yy,cc,zz,dd'
                            .split(',')
                            //v 是所有图片的名字
                            .map (v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))
        const gridHeader = this.state.icon
                            ? (<div>
                                    <span>已选择头像</span>
                                    <img style={{width:200, marginLeft: 'auto', marginRight:'auto', display:'block'}} src={this.state.icon} alt=""/>
                                </div>)
                                : <div>'请选择头像'</div>
        
        return (
            <div>
                {gridHeader}
                <Grid 
                    data={avatarList} 
                    columnNum = {3}
                    renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                        <img src={dataItem.icon} style={{ width: '70px', height: '70px', marginLeft: 'auto', marginRight:'auto', marginTop:'auto', marginButtom:'auto', display:'block' }} alt="" />
                        <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            <span></span>
                        </div>
                        </div>
                    )}
                    onClick = {elm=>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                        console.log('elm')
                    }}
                />

            </div>

        )
    }
}

export default AvatarSelector