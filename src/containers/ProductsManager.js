import React, { Component } from 'react';
import { ProductsList } from '../components/styled/products-manager';
import { getProducts, removeProduct } from "../actions/products";
import { getCategories } from "../actions/categories";
import ProductCard from '../components/product-card';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { history } from '../helpers/history';
import ProductsFilter from './ProductsFilter';
import { allCategory } from "../constants/categories";

const filterProducts = (products, filter) => {
    return products.filter((product) =>
        (product.name.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0)
        && (product.rating * 1 >= filter.rating.from * 1 && product.rating * 1 <= filter.rating.to * 1)
        && (product.cost >= filter.price.from && product.cost <= filter.price.to)
        && (filter.gender === 'All' || product.gender === filter.gender)
        && (!filter.availableOnly || product.count > product.soldCount)
        && (filter.category === allCategory.id || product.categoryId === filter.category))
};

const mapStateToProps = (state) => ({
    products: state.products,
    categories: state.categories,
    filter: state.filter
});

class ProductsManager extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            products: props.products || [],
            categories: props.categories || [],
            filter: props.filter || {}
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
        if (nextState.filter) {
            this.setState({filter: nextState.filter});
        }
    }

    handleShowDetailsClick (productId) {
        history.push(`product/${productId}`);
    }

    handleDeleteProductClick (productId) {
        this.props.removeProduct(productId);
    }

    render () {
        return <div>
            <ProductsFilter categories={this.state.categories}/>
            {this.state.products.length > 0 ? <ProductsList>
                {filterProducts(this.state.products, this.state.filter).map(product => (
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
    filter: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getProducts, removeProduct, filterProducts, getCategories})(ProductsManager);