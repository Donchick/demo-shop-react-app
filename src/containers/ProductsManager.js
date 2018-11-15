import React, { Component } from 'react';
import { ProductsList } from '../components/styled/products-manager';
import { getProducts, removeProduct, filterProducts } from "../actions/products";
import { getCategories } from "../actions/categories";
import ProductCard from '../components/product-card';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { history } from '../helpers/history';
import ProductsFilter from '../components/products-filter';

let _timer = null;
const _debounce = (func, timeout) => {
    clearTimeout(_timer);
    _timer = setTimeout(func, timeout);
};

const mapStateToProps = (state) => ({
    products: state.products,
    categories: state.categories
});

class ProductsManager extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            products: props.products || [],
            categories: props.categories || []
        };
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getCategories();
    }

    componentWillReceiveProps(nextState) {
        if (nextState.products) {
            this.setState({products: nextState.products});
        }
        if (nextState.categories) {
            this.setState({categories: nextState.categories});
        }
    }

    handleShowDetailsClick (productId) {
        history.push(`product/${productId}`);
    }

    handleDeleteProductClick (productId) {
        this.props.removeProduct(productId);
    }

    handleFilterProduct (filter) {
        _debounce(this.props.filterProducts(filter), 300);
    }

    render () {
        return <div>
            <ProductsFilter categories={this.state.categories} filterProduct={this.handleFilterProduct.bind(this)}/>
            {this.state.products.length > 0 ? <ProductsList>
                {this.state.products.map(product => (
                    <ProductCard key={product.id}
                                 product={product}
                                 showDetails={this.handleShowDetailsClick.bind(this, product.id)}
                                 deleteProduct={this.handleDeleteProductClick.bind(this, product.id)}/>
                ))}
            </ProductsList> : ''}
        </div>
    }
}

ProductsManager.propTypes = {
    products: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getProducts, removeProduct, filterProducts, getCategories})(ProductsManager);