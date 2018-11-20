import React, { Component } from 'react';
import { updateProduct, addProduct } from '../actions/products';
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
      product: props.product || {
        id: null,
        name: '',
        image: '',
        cost: '',
        rating: 0,
        gender: 'All',
        description: '',
        categoryId: allCategory.id,
        count: 0,
        soldCount: 0
      },
      categories: props.categories || [],
    }
  }

  componentWillReceiveProps(nextState) {
    if (nextState.categories) {
      this.setState({categories: nextState.categories});
    }
  }

  handleChange (e) {
    let product = Object.assign({}, this.state.product, {
      [e.target.name]: e.target.value
    });

    this.setState({
      product: product
    });
  }

  handleSubmit(e) {
    this.state.product.id ?
        this.props.updateProduct(this.state.product) :
        this.props.addProduct(this.state.product);

    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    return <ProductActionForm onSubmit={this.handleSubmit.bind(this)}>
      <ProductActionFormContent>
        <BlockContainer>
          <Block>
            <BlockTitle>Name:</BlockTitle>
            <BlockInput name='name' onKeyUp={this.handleChange.bind(this)}/>
          </Block>
          <Block>
            <BlockTitle>Category:</BlockTitle>
            <ProductSelectList green onChange={this.handleChange.bind(this)} name='categoryId'>
              {[allCategory, ...this.props.categories]
                  .map((category) => (
                      <option value={category.id} key={category.id} defaultValue={this.state.product.categoryId === category.id}>{category.name}</option>
                  ))}
            </ProductSelectList>
          </Block>
          <GenderBlock>
            {[...Object.values(Gender), 'All'].map((gender) => (
                <span key={gender}>
                    <RadioButton defaultChecked={this.state.product.gender === gender} type='radio' name='gender' value={gender} id={`product-${gender}`} onClick={this.handleChange.bind(this)}/>
                    <RadioButtonLabel htmlFor={`product-${gender}`}>{gender}</RadioButtonLabel>
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
            <BlockInput name='image' onKeyUp={this.handleChange.bind(this)}/>
            {this.state.product.image ? <ImagePreview src={this.state.product.image}/> : ''}
          </Block>
          <Block>
            <BlockTitle>Price:</BlockTitle>
            <BlockInput name='cost' onKeyUp={this.handleChange.bind(this)}/>
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


export default connect(mapStateToProps, { updateProduct, addProduct })(ProductActionManager);