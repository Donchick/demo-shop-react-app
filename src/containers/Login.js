import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user';

class Login extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleLogin () {
        this.props.login({
            login: this.state.userName,
            password: this.state.password
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        return <div>
            <p>Login</p>
            <input name='userName' value={this.state.userName} onChange={this.handleChange.bind(this)}/>
            <p>Password</p>
            <input name='password' value={this.state.password} onChange={this.handleChange.bind(this)}/>
            <button onClick={this.handleLogin.bind(this)}>Login</button>
        </div>;
    }
};

export default connect(
    null, { login }
)(Login);