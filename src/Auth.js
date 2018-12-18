import React from 'react';
import { connect } from 'react-redux'
import { login } from './Auth.redux'

//两个reducers 每个reducers都有一个state
//合并reducers


class Auth extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <h2>Auth Page</h2>
    }
}

export default Auth