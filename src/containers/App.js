import React, { Component } from 'react';
import ProductsManager from './ProductsManager';
import Login from './Login';
import { Router, Route, Switch, Redirect } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';
import {history} from "../helpers/history";
import { CommonLayout } from '../components/styled/common-layout';
import connect from "react-redux/es/connect/connect";
import { logout } from '../actions/authentication';
import PropTypes from 'prop-types';
import authService from '../services/authentication';
import { Header, Footer, HeaderMenu, Main, BagIcon, LogoutIcon } from '../components/styled/app';
import ErrorModal from '../components/error-modal';
import ProductPage from './ProductPage';
import NotFound from '../components/not-found';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.error
    }
};

class App extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            user: {},
            error: null
        };

        this.errorModal = React.createRef();
    }

    componentDidMount() {
        const user = authService.getUser();
        if (user) {
            this.setState({user: user});
        }
    }

    componentWillReceiveProps(nextState) {
        if (nextState.user) {
            this.setState({user: nextState.user});
        }
        if (nextState.error) {
            this.setState({error: nextState.error});
            this.errorModal.current.open();
        }
    }

    logout() {
        this.setState({
          user: {}
        });
        
        this.props.logout(this.state.user);
    }

    render () {
        return <Router history={history}>
            <CommonLayout>
                <Header>
                    <HeaderMenu>
                        <BagIcon/>
                        <span>Hello, <i>{this.state.user.login}</i></span>
                        <LogoutIcon onClick={this.logout.bind(this)}/>
                    </HeaderMenu>
                </Header>
                <Main>
                    <Switch>
                        <LoginGuardRoute exact path="/" component={ProductsManager} />
                        { this.state.user && this.state.user.login ? <Redirect from="/login" to="/"/> : <Route path="/login" component={Login} /> }
                        <LoginGuardRoute path="/product/:id" component={ProductPage} />
                        <Route component={ NotFound } />
                    </Switch>
                </Main>
                <Footer>Copyright “Demo Shop”, 2017</Footer>
                <ErrorModal ref={this.errorModal} message={this.state.error}/>
            </CommonLayout>
        </Router>
    }
}

App.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps, { logout }
)(App);