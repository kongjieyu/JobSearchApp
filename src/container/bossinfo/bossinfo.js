import React from 'react'
import { NavBar, Icon, List, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return (
            <div>
                <NavBar mode="dark">BOSS 完善信息页面</NavBar>
                {/* 因为在boss页面和牛人页面都需要用到选择头像，所以将选择头像这部分写成组件 */}
                <AvatarSelector
                    selectAvatar = {(imgname)=>{
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem
                    onChange={(v) => { this.onChange('title', v)}}
                    >招聘职位
                </InputItem>
                <InputItem
                    onChange={(v) => { this.onChange('company', v)}}
                    >公司名称
                </InputItem>
                <InputItem
                    onChange={(v) => { this.onChange('money', v)}}
                    >职位薪资
                </InputItem>
                <TextareaItem
                    title="职位要求"
                    row = {3}
                    autoHeight
                    onChange={(v) => { this.onChange('desc', v)}}
                    >
                </TextareaItem>
                <WhiteSpace/>
                <Button type='primary'>保存</Button>
            </div>

        )
    }
}

export default BossInfo