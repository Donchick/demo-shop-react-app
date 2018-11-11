import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterContainer, FilterInput, FilterBoxButton, FilterOptionsBox, Filters, ProductParamFilters, ProductRangeFilters } from "./styled/products-filter";


class ProductsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptionBoxOpen: false,
            name: ''
        };
    }

    handleFilterBoxButton() {
        this.setState({filterOptionBoxOpen: !this.state.filterOptionBoxOpen});
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'name':
                this.setState({[e.target.name]: e.target.value});
                break;
            default:
        }

        this.props.filterProduct(this.state);
    }

    render() {
        return <FilterContainer>
            <FilterBoxButton onClick={this.handleFilterBoxButton.bind(this)}>Filter Options</FilterBoxButton>
            <FilterOptionsBox open={this.state.filterOptionBoxOpen}>
                <Filters>
                    <ProductParamFilters></ProductParamFilters>
                    <ProductRangeFilters></ProductRangeFilters>
                </Filters>
            </FilterOptionsBox>
            <FilterInput placeholder='Filter by text...'
                         name='name'
                         onKeyUp={this.handleChange.bind(this)}></FilterInput>
        </FilterContainer>
    }
}

ProductsFilter.propTypes = {
    filterProduct: PropTypes.func.isRequired
};

export default ProductsFilter;