import React, { Component } from 'react';
import { ProductsList } from '../components/styled/products-manager';
import { getProducts, removeProduct, filterProducts } from "../actions/products";
import ProductCard from '../components/product-card';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { history } from '../helpers/history';
import ProductsFilter from '../components/products-filter';

const mapStateToProps = (state) => ({
    products: state.products
});

class ProductsManager extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            products: props.products || []
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

    handleShowDetailsClick (productId) {
        history.push(`product/${productId}`);
    }

    handleDeleteProductClick (productId) {
        this.props.removeProduct(productId);
    }

    handleFilterProduct (keyword) {
        this.props.filterProducts(keyword);
    }

    render () {
        return <div>
            <ProductsFilter filterProduct={this.handleFilterProduct.bind(this)}/>
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
    getProducts: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getProducts, removeProduct, filterProducts})(ProductsManager);