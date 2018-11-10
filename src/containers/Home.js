import React, { Component } from 'react';
import { getProducts } from "../actions/products";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userService from '../services/authentication';
import ProductList from '../components/product-list';

const mapStateToProps = (state) => ({
    products: state.products
});

class Home extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            products: props.products || [],
            user: userService.getUser()
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    componentWillReceiveProps(nextState) {
        if (nextState.products) {
            this.setState({products: nextState.products});
        }
    }

    render() {
        return <div>
            <h1>{this.state.user.login}, welcome to DemoShop</h1>
            <ProductList products={this.state.products}/>
        </div>
    }
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getProducts})(Home);