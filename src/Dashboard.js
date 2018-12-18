import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import {logout} from './Auth.redux.js'
function Erying(){
    return <h2>Erying222</h2>
}

function Qibinglian(){
    return <h2>Qibinglian333</h2>
}

class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to='/dashboard/'>一营</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/erying'>二营</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/qibinglian'>骑兵连</Link>
                    </li>
                </ul>
                <Route path='/dashboard/' component = {App} exact></Route>
                <Route path='/dashboard/erying' component = {Erying} exact></Route>
                <Route path='/dashboard/qibinglian' component = {Qibinglian} exact></Route>
            </div>
            </BrowserRouter>
        )

    }
}

export default Dashboard