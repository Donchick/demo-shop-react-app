import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxLabel } from "../components/styled/checkbox";
import { RadioButton, RadioButtonLabel } from "../components/styled/radio-button";
import { SelectList } from "../components/styled/select-list";
import Gender from '../helpers/models/gender';
import {allCategory} from "../constants/categories";
import connect from "react-redux/es/connect/connect";
import { updateFilter } from "../actions/filter";
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
         PriceRangeSlider} from "../components/styled/products-filter";

let _timer = null;
const _debounce = (func, timeout) => {
    clearTimeout(_timer);
    _timer = setTimeout(func, timeout);
};

const _fieldsToUpdate = {};

const mapStateToProps = (state) => ({
    filter: state.filter,
    categories: state.categories
});

class ProductsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptionBoxOpen: false,
            filter: props.filter,
            categories: props.categories
        };
    }

    handleFilterBoxButton() {
        this.setState({filterOptionBoxOpen: !this.state.filterOptionBoxOpen});
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'availableOnly':
                _fieldsToUpdate[e.target.name] = e.target.checked;
                break;

            case 'category':
                _fieldsToUpdate[e.target.name] = Number(e.target.value);
                break;

            default:
                _fieldsToUpdate[e.target.name] = e.target.value;
        }

        _debounce(() => {
            this.props.updateFilter(_fieldsToUpdate);
        }, 300);
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
                                {[allCategory, ...this.props.categories]
                                    .map((category) => (
                                    <option value={category.id} key={category.id} defaultValue={this.state.category === category}>{category.name}</option>
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
    categories: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { updateFilter })(ProductsFilter);