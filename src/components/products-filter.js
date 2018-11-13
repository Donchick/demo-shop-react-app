import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxLabel } from "./styled/checkbox";
import { RadioButton, RadioButtonLabel } from "./styled/radio-button";
import { SelectList } from "./styled/select-list";
import RangeSlider from './range-slider';
import Gender from '../helpers/models/gender';
import { FilterContainer,
         FilterInput,
         FilterBoxButton,
         FilterOptionsBox,
         Filters,
         ProductParamFilters,
         ProductRangeFilters,
         Filter,
         CategoryFilter,
         GenderFilter,
         PriceFilter,
         RangeFilter,
         FilterTitle} from "./styled/products-filter";


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
                    <ProductParamFilters>
                        <Filter>
                            <FilterTitle bottomPadding>Availability:</FilterTitle><br/>
                            <Checkbox type='checkbox' id='checkbox'></Checkbox>
                            <CheckboxLabel htmlFor='checkbox'>Available Only</CheckboxLabel>
                        </Filter>
                        <GenderFilter>
                            <FilterTitle bottomPadding>Gender:</FilterTitle><br/>
                            {Object.values(Gender).map((genderKind) => (<span key={genderKind}>
                                <RadioButton type='radio' name='filter-gender' value={genderKind} id={genderKind}/>
                                <RadioButtonLabel htmlFor={genderKind}>{genderKind}</RadioButtonLabel>
                            </span>))}
                            <span>
                                <RadioButton type='radio' name='filter-gender' value='All' id='All'/>
                                <RadioButtonLabel htmlFor='All'>All</RadioButtonLabel>
                            </span>
                        </GenderFilter>
                        <CategoryFilter>
                            <FilterTitle>Category:</FilterTitle>
                            <SelectList green>
                                <option value='All'>All</option>
                                {['Active Wear', 'Jeans', 'Coats', 'Sweaters', 'Wear to work']
                                    .map((category) => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </SelectList>
                        </CategoryFilter>
                    </ProductParamFilters>
                    <ProductRangeFilters>
                        <RangeFilter>
                            <FilterTitle>Rating:</FilterTitle>
                            <RangeSlider min={0} max={5}/>
                        </RangeFilter>
                        <PriceFilter>
                            <FilterTitle>Price:</FilterTitle>
                        </PriceFilter>
                    </ProductRangeFilters>
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