import React, { Component } from 'react';
import { ProductActionForm,
         ProductActionFormContent,
         BlockContainer,
         Block,
         BlockInput,
         BlockTitle,
         DescriptionBlock,
         DescriptionTextArea,
         GenderBlock,
         ImagePreview,
         ProductSelectList,
         SubmitButton} from '../components/styled/product-action-manager';
import { RadioButton, RadioButtonLabel } from '../components/styled/radio-button';
import Gender from '../helpers/models/gender';
import connect from "react-redux/es/connect/connect";
import {allCategory} from '../constants/categories';

const mapStateToProps = (state) => ({
  categories: state.categories
});

class ProductActionManager extends Component {
  constructor (props) {
    super(props);

    this.state = {
      gender: 'All',
      categories: props.categories || [],
      name: '',
      category: allCategory,
      description: '',
      linkToImage: '',
      price: '',
      rating: 0
    }
  }

  componentWillReceiveProps(nextState) {
    if (nextState.categories) {
      this.setState({categories: nextState.categories});
    }
  }

  handleChange () {
    console.log('here');
  }

  render () {
    return <ProductActionForm>
      <ProductActionFormContent>
        <BlockContainer>
          <Block>
            <BlockTitle>Name:</BlockTitle>
            <BlockInput name='name' onKeyUp={this.handleChange.bind(this)}/>
          </Block>
          <Block>
            <BlockTitle>Category:</BlockTitle>
            <ProductSelectList green onChange={this.handleChange.bind(this)}>
              {[allCategory, ...this.props.categories]
                  .map((category) => (
                      <option value={category.id} key={category.id} defaultValue={this.state.category === category}>{category.name}</option>
                  ))}
            </ProductSelectList>
          </Block>
          <GenderBlock>
            {[...Object.values(Gender), 'All'].map((gender) => (
                <span key={gender}>
                    <RadioButton defaultChecked={this.state.gender === gender} type='radio' name='product-gender' value={gender} id={gender} onClick={this.handleChange.bind(this)}/>
                    <RadioButtonLabel htmlFor={gender}>{gender}</RadioButtonLabel>
                  </span>
            ))}
          </GenderBlock>
          <DescriptionBlock>
            <BlockTitle>Description:</BlockTitle>
            <DescriptionTextArea name='description' onKeyUp={this.handleChange.bind(this)}/>
          </DescriptionBlock>
        </BlockContainer>
        <BlockContainer>
          <Block>
            <BlockTitle>Link to image:</BlockTitle>
            <BlockInput name='linkToImage' onKeyUp={this.handleChange.bind(this)}/>
            <ImagePreview/>
          </Block>
          <Block>
            <BlockTitle>Price:</BlockTitle>
            <BlockInput name='price' onKeyUp={this.handleChange.bind(this)}/>
          </Block>
          <Block>
            <BlockTitle>Rating:</BlockTitle>
            <ProductSelectList name='rating' onChange={this.handleChange.bind(this)}>
              {[0, 1,2,3,4,5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
              ))}
            </ProductSelectList>
          </Block>
        </BlockContainer>
      </ProductActionFormContent>
      <SubmitButton>Submit</SubmitButton>
    </ProductActionForm>
  }
}


export default connect(mapStateToProps, null)(ProductActionManager);