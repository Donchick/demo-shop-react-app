import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxLabel } from "./styled/checkbox";
import { RadioButton, RadioButtonLabel } from "./styled/radio-button";
import { SelectList } from "./styled/select-list";
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
         FilterTitle,
         RatingRangeSlider,
         PriceRangeSlider} from "./styled/products-filter";


class ProductsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptionBoxOpen: false,
            name: '',
            availableOnly: false,
            gender: 'All',
            category: 'All',
            rating: {
                from: 0,
                to: 5
            },
            price: {
                from: 0,
                to: 1000
            }
        };
    }

    handleFilterBoxButton() {
        this.setState({filterOptionBoxOpen: !this.state.filterOptionBoxOpen});
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'availableOnly':
                this.setState({[e.target.name]: e.target.checked});
                break;
            default:
                this.setState({[e.target.name]: e.target.value});
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
                            <Checkbox name='availableOnly' type='checkbox' id='checkbox' onChange={this.handleChange.bind(this)}></Checkbox>
                            <CheckboxLabel htmlFor='checkbox'>Available Only</CheckboxLabel>
                        </Filter>
                        <GenderFilter>
                            <FilterTitle bottomPadding>Gender:</FilterTitle><br/>
                            {[...Object.values(Gender), 'All'].map((genderKind) => (<span key={genderKind}>
                                <RadioButton defaultChecked={this.state.gender === genderKind} type='radio' name='gender' value={genderKind} id={genderKind} onClick={this.handleChange.bind(this)}/>
                                <RadioButtonLabel htmlFor={genderKind}>{genderKind}</RadioButtonLabel>
                            </span>))}
                        </GenderFilter>
                        <CategoryFilter>
                            <FilterTitle>Category:</FilterTitle>
                            <SelectList name='category' green onChange={this.handleChange.bind(this)}>
                                {['All', 'Active Wear', 'Jeans', 'Coats', 'Sweaters', 'Wear to work']
                                    .map((category) => (
                                    <option value={category} key={category} defaultValue={this.state.category === category}>{category}</option>
                                ))}
                            </SelectList>
                        </CategoryFilter>
                    </ProductParamFilters>
                    <ProductRangeFilters>
                        <RangeFilter>
                            <FilterTitle>Rating:</FilterTitle>
                            <RatingRangeSlider name='rating' min={0} max={5} step={1} onChange={this.handleChange.bind(this)}/>
                        </RangeFilter>
                        <PriceFilter>
                            <FilterTitle>Price:</FilterTitle>
                            <PriceRangeSlider name='price' min={0} max={1000} step={1} onChange={this.handleChange.bind(this)}/>
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