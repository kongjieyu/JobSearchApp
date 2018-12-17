import React, {Component} from 'react';
//之间引入function会导致强解藕问题
//import { addGun } from './index.redux'
//import { removeGun } from './index.redux'
class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        const store = this.props.store
        const num = store.getState()
        const addGun = this.props.addGun
        const removeGun = this.props.removeGun
        const addGunAsync = this.props.addGunAsync
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick = {()=>store.dispatch(addGun())}>申请武器</button>
                <button onClick = {()=>store.dispatch(removeGun())}>上交武器</button>
                <button onClick = {()=>store.dispatch(addGunAsync())}>拖两天再交</button>
            </div>
        )
    }
}

export default App