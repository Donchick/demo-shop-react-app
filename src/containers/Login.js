import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authentication';
import PropTypes from 'prop-types';
import {
    LoginLayout,
    LoginBlock,
    LoginBlockHeader,
    LoginForm,
    UserNameInput,
    PasswordInput,
    InputBlock,
    LoginButton,
    ErrorMessage
} from '../components/styled/login-page';

const mapStateToProps = (state) => {
    return {
        loginFailed: state.auth.loginFailed || false
    };
};

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
            },
            loginFailed: this.props.loginFailed || false
        };
    }

    componentWillReceiveProps(nextState) {
        if (nextState.loginFailed) {
            this.setState({loginFailed: nextState.loginFailed});
        }
    }

    handleLoginFormSubmit (e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.login({
            login: this.state.userName,
            password: this.state.password
        });
        return false;
    }

    handleBlur(e) {
        this.setState({
                touched: {...this.state.touched, [e.target.name]: true}
            }
        );
    }

    clearErrors (field) {
        this.setState({
            loginFailed: false,
            errors: {
                [field]: null
            }
        });

    }

    handleChange(e) {
        this.clearErrors(e.target.name);
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

        return <div>
            <LoginLayout/>
            <LoginBlock>
                <LoginBlockHeader>
                    Login to "Demo Shop"
                </LoginBlockHeader>
                <LoginForm onSubmit={this.handleLoginFormSubmit.bind(this)}>
                    { this.state.loginFailed ? <ErrorMessage global>Wrong login or password!</ErrorMessage> : '' }
                    <InputBlock>
                        <p>Your Login:</p>
                        { errors['userName'] && shouldMarkError('userName') ?
                            <ErrorMessage>{errors['userName']}</ErrorMessage> : '' }
                        <UserNameInput invalid={shouldMarkError('userName')}
                                       onBlur={this.handleBlur.bind(this)}
                                       name='userName'
                                       value={this.state.userName}
                                       onChange={this.handleChange.bind(this)}/>
                    </InputBlock>
                    <InputBlock>
                        <p>Your Password:</p>
                        { errors['password'] && shouldMarkError('password') ?
                            <ErrorMessage>{errors['password']}</ErrorMessage> : '' }
                        <PasswordInput invalid={shouldMarkError('password')}
                                       onBlur={this.handleBlur.bind(this)}
                                       type='password'
                                       name='password'
                                       value={this.state.password}
                                       onChange={this.handleChange.bind(this)}/>
                    </InputBlock>
                    <LoginButton disabled={isDisabled}>Submit</LoginButton>
                </LoginForm>
            </LoginBlock>
        </div>;
    }
};

Login.propTypes = {
    loginFailed: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps, { login }
)(Login);