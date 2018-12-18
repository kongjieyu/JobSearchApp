import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync} from './index.redux'
//之间引入function会导致强解藕问题
//import { addGun } from './index.redux'
//import { removeGun } from './index.redux'
class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        //store已经不传进来了
        // const store = this.props.store
        // const num = store.getState()
        const num = this.props.num
        const addGun = this.props.addGun
        const removeGun = this.props.removeGun
        const addGunAsync = this.props.addGunAsync
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick = {addGun}>申请武器</button>
                <button onClick = {removeGun}>上交武器</button>
                <button onClick = {addGunAsync}>拖两天再交</button>
            </div>
        )
    }
}
//把state塞到了num里面，就不需要用过store去获取了
const mapStatetoProps = (state) =>{
    return {num: state}
}
//react-redux 会自动把这些参数放到props里面
const actionCreators = { addGun, removeGun, addGunAsync }

App = connect(mapStatetoProps, actionCreators)(App)
export default App