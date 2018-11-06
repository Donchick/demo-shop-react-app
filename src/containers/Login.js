import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authentication';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonLayout from '../components/styled/common-layout';

const LoginLayout = styled(CommonLayout)`
    filter: blur(2px);
`;

const LoginBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 570px;
  background: #ffffff;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0,0,0, 0.3);
`;

const LoginBlockHeader = styled.div`
  line-height: 70px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  vertical-align: middle;
  font-family: PT Sans Caption;
`;

const LoginForm = styled.form`
  background: #ecebe9 url(${process.env.PUBLIC_URL + 'public/assets/images/product-tile-background.png'});
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: right;
  padding: 0 60px;
  box-shadow: inset 0px 2px 0px rgba(0,0,0, 0.1);
`;

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
        return <CommonLayout>
            <LoginLayout/>
            <LoginBlock>
                <LoginBlockHeader>
                    Login to "Demo Shop"
                </LoginBlockHeader>
                <LoginForm>
                    <input name='userName' value={this.state.userName} onChange={this.handleChange.bind(this)}/>
                    <p>Password</p>
                    <input name='password' value={this.state.password} onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleLogin.bind(this)}>Login</button>
                </LoginForm>
            </LoginBlock>
        </CommonLayout>;
    }
};

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(
    null, { login }
)(Login);