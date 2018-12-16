import React, {Component} from 'react';
import { addGun } from './index.redux'
import { removeGun } from './index.redux'
class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        const store = this.props.store
        const num = store.getState()
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick = {()=>store.dispatch(addGun())}>申请武器</button>
            </div>
        )
    }
}

export default App