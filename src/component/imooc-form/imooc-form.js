import React from 'react'

export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        //这样的话WrapperComp这个组件天生自带handleChange这个方法
        handleChange(key,val){
            console.log(key,val)
            this.setState({
                [key]:val
            })
        }
        render(){
            //把state,handleChange全部传给之前的组件
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}