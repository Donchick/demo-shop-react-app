import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterContainer, FilterInput } from "./styled/products-filter";

class ProductsFilter extends Component {
    constructor(props) {
        super(props);
        this.filterInputRef = React.createRef();
    }

    render() {
        let timerId = null;
        const handleInputKeyUp = () => {
            clearTimeout(timerId);
            timerId = setTimeout(() => this.props.filterProduct(this.filterInputRef.current.value), 300);
        };

        return <FilterContainer>
            <FilterInput ref={this.filterInputRef}
                         placeholder='Filter by text...'
                         onKeyUp={handleInputKeyUp.bind(this)}></FilterInput>
        </FilterContainer>
    }
}

ProductsFilter.propTypes = {
    filterProduct: PropTypes.func.isRequired
};

export default ProductsFilter;