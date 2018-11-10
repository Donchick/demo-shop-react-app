import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './product-card';
import { ProductList } from './styled/product-list';

const ProductsList = (props) => {
    return <ProductList>
        {props.products.length > 0 ? props.products.map(product => (
            <ProductCard product={product}/>
        )) : ''}
    </ProductList>
};

ProductsList.propTypes = {
    products: PropTypes.array.isRequired
};

export default ProductsList