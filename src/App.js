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

//mapStatetoProps: take a piece of state, which is a part of the store, and send it into the component as 'Props'
//So inside the component, we can just say this.props.XXX
//Such as const num = this.props.num instead of const num = store.getState()
const mapStatetoProps = (state)=>{
    return {
        //create a property called num
        num: state
    }
}

const actionCreators = { addGun, removeGun, addGunAsync} 

App = connect(mapStatetoProps,actionCreators)(App)
export default App