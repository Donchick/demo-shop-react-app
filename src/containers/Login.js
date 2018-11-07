import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authentication';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonLayout from '../components/styled/common-layout';

const LoginLayout = styled(CommonLayout)`
  filter: blur(2px);
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/background.png'});
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
  font-family: PT Sans;
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
  background: #ecebe9 url(${process.env.PUBLIC_URL + '/assets/images/product-tile-background.png'});
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: right;
  padding: 0 60px;
  box-shadow: inset 0px 2px 0px rgba(0,0,0, 0.1);
`;

const LoginFormInput = styled.input`
  height: 60px;
  width: calc(100% - 69px);
  border-radius: 5px;
  border: none;
  outline: 0;
  font-size: 24px;
  padding: 0 60px 0 10px;
  background-repeat: no-repeat;
  background-position: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: PT Sans;
  background-size: 32px 32px;
  margin: 10px 0 0;
  border: ${props => props.invalid? '3px solid #ff0000' : '3px solid rgba(0,0,0,0)'};
  :focus {
    border: 3px solid rgba(41, 136, 121, 0.4);
  }
`;

const UserNameInput = styled(LoginFormInput)`
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/username-icon.png'});
  :focus {
    background-image: url(${process.env.PUBLIC_URL + 'assets/images/focused-username-icon.png'});
  }
`;

const PasswordNameInput = styled(LoginFormInput)`
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/password-icon.png'});
  :focus {
    background-image: url(${process.env.PUBLIC_URL + 'assets/images/focused-password-icon.png'});
  }
`;

const InputBlock = styled.div`
  text-align: left;
  padding-top: 30px;
`;

const PrimaryButton = styled.button`
	outline: 0;
	width: 120px;
	height: 35px;
	color: #FFFFFF;
	border-radius: 5px;
	font-size: 14px;
	border:none;
	padding: 0;
	outline: 0;
	font-family: PT Sans;
	background-image: linear-gradient(to top, #278473 0%, #3fc6cc 100%);
	:active {
	    background-image: linear-gradient(to top, #3fc6cc 0%, #278473 100%);
	};
	:disabled {
        background-image: linear-gradient(to top, rgba(39, 132, 115, 0.2) 0%, rgba(63, 198, 204, 0.2) 100%);
	}
`;

const LoginButton = styled(PrimaryButton)`
  margin: 25px 0 30px 0;
  font-size: 18px;
  width: 170px;
  height: 50px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  padding: 10px 10px 0;
  display: block;
  color: #da1d1d;
`;

function validate(userName, password) {
    return {
        userName: userName.length === 0 ? 'Login is required.' :
            !/^[A-Za-z]{3,}$/.test(userName) &&
            'Login must contain English letters only and should be more than 3-symbols length.',
        password: password.length === 0 && 'Password is required.',
    };
}

class Login extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            userName: '',
            password: '',
            touched: {
                userName: false,
                password: false
            },
            errors: {
                userName: null,
                password: null
            }
        };
    }

    handleLoginFormSubmit (e) {
        e.preventDefault();
        this.props.login({
            login: this.state.userName,
            password: this.state.password
        })
    }

    handleBlur(e) {
        this.setState({
                touched: {...this.state.touched, [e.target.name]: true}
            }
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        const errors = validate(this.state.userName, this.state.password);
        const isDisabled = Object.values(errors).some((error) => error);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const touched = this.state.touched[field];

            return hasError && touched;
        };

        return <CommonLayout>
            <LoginLayout/>
            <LoginBlock>
                <LoginBlockHeader>
                    Login to "Demo Shop"
                </LoginBlockHeader>
                <LoginForm onSubmit={this.handleLoginFormSubmit.bind(this)}>
                    <InputBlock>
                        <p>Your Login:</p>
                        { errors['userName'] && shouldMarkError('userName') ? <ErrorMessage>{errors['userName']}</ErrorMessage> : '' }
                        <UserNameInput invalid={shouldMarkError('userName')} onBlur={this.handleBlur.bind(this)} name='userName' value={this.state.userName} onChange={this.handleChange.bind(this)}/>
                    </InputBlock>
                    <InputBlock>
                        <p>Your Password:</p>
                        { errors['password'] && shouldMarkError('password') ? <ErrorMessage>{errors['password']}</ErrorMessage> : '' }
                        <PasswordNameInput invalid={shouldMarkError('password')} onBlur={this.handleBlur.bind(this)} type='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)}/>
                    </InputBlock>
                    <LoginButton disabled={isDisabled}>Submit</LoginButton>
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