import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import { Router, Route } from 'react-router';
import LoginGuardRoute from '../components/login-guard-route';
import {history} from "../helpers/history";
import { CommonLayout } from '../components/styled/common-layout';
import styled from 'styled-components';
import connect from "react-redux/es/connect/connect";
import { logout } from '../actions/authentication';
import PropTypes from 'prop-types';
import authService from '../services/authentication';

const Panel = styled.div`
  height: 50px;
  background-image: linear-gradient(to top, rgba(40, 133, 117, 0.13) 0%, rgba(255, 255, 255, 0.13) 100%);
  background-color: rgb(40, 133, 117);
  line-height: 50px;
  z-index: 1000;
  color: #FFFFFF;
  font-size: 15px;
  text-transform: capitalize;
`;

const Header = styled(Panel)`
  border-bottom: 3px solid #58ba96;
  width: 100%;
  align-self: flex-start;
`;

const Footer = styled(Panel)`
  width: 100%;
  text-align: center;
  align-self: flex-end;
`;

const HeaderMenu = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  text-align: right;
`;

const Main = styled.main`
  padding: 0 15px 50px;
  text-align: left;
  margin: 0 auto;
  max-width: 1140px;
  background: rgba(0,0,0, 0.4);
  min-height: calc(100% - 153px);
  flex-grow: 99;
  min-width: 80%;
`;

const BagIcon = styled.i`
  content: url(${process.env.PUBLIC_URL + '/assets/images/bag-icon.png'});
  float: left;
  margin: 13px 30px;
  cursor: pointer;
`;

const LogoutIcon = styled.i`
  content: url(${process.env.PUBLIC_URL + '/assets/images/logout-icon.png'});
  vertical-align: middle;
  margin: 0 30px 0 10px;
  cursor: pointer;
`;

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

class App extends Component {
    constructor () {
        super(...arguments);
        this.state = {
            user: {}
        };
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
    }

    logout() {
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
                    <LoginGuardRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </Main>
                <Footer>Copyright “Demo Shop”, 2017</Footer>
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