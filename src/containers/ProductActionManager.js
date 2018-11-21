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
         SubmitButton,
         ErrorMessage } from '../components/styled/product-action-manager';
import { RadioButton, RadioButtonLabel } from '../components/styled/radio-button';
import Gender from '../helpers/models/gender';
import connect from "react-redux/es/connect/connect";
import {allCategory} from '../constants/categories';
import imageValidator from '../validators/image-validator';

const mapStateToProps = (state) => ({
  categories: state.categories
});

const validateField = (field, value) => {
  if (value === '') {
    return {
      error: {...this.state.error, [field]: 'Field is required.'}
    };
  }

  switch (field) {
    case 'image':
      return imageValidator(value).then((result) => {
        let error = null;
        if (result && result.imageLinkInvalid) {
          error = 'Image path is invalid';
        }

        return {
          error: {...this.state.error, [field]: error}
        };
      });
    case 'cost':
      const error = /^\d*(\.\d{1,2})?$/.test(value) ? null : 'Wrong price format.';
      return {
        error: {...this.state.error, [field]: error}
      };
    default:
      return {
        error: {...this.state.error, [field]: null}
      };
  }
};

class ProductActionManager extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: {},
      touched: {},
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

  validateField(field, value) {
    if (value === '') {
      this.setState({
        error: {...this.state.error, [field]: 'Field is required.'}
      });
      return;
    }

    switch (field) {
      case 'image':
        imageValidator(value).then((result) => {
          let error = null;
          if (result && result.imageLinkInvalid) {
            error = 'Image path is invalid';
          }

          this.setState({
            error: {...this.state.error, [field]: error}
          });
        });
        break;
      case 'cost':
        const error = /^\d*(\.\d{1,2})?$/.test(value) ? null : 'Wrong price format.';
        this.setState({
          error: {...this.state.error, [field]: error}
        });
        break;
      default:
        this.setState({
          error: {...this.state.error, [field]: null}
        });
        return;
    }
  }

  handleBlur(e) {
    if (this.state.touched[e.target.name]) {
      return;
    }

    this.setState({touched: {...this.state.touched, [e.target.name]: true}});
  }

  handleChange (e) {
    this.validateField(e.target.name, e.target.value);

    let product = { ...this.state.product, [e.target.name]: e.target.value };

    this.setState({product});
  }

  handleSubmit(e) {
    this.state.product.id ?
        this.props.updateProduct(this.state.product) :
        this.props.addProduct(this.state.product);

    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    const isEnabled = Object.values(this.state.error).some((value) => !value) &&
        Object.values(this.state.touched).length === 4;

    return <ProductActionForm onSubmit={this.handleSubmit.bind(this)}>
      <ProductActionFormContent>
        <BlockContainer>
          <Block>
            <BlockTitle>Name:</BlockTitle>
            {this.state.error.name && this.state.touched.name ? <ErrorMessage>{this.state.error.name}</ErrorMessage> : ''}
            <BlockInput name='name' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
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
            {this.state.error.description && this.state.touched.description ? <ErrorMessage>{this.state.error.description}</ErrorMessage> : ''}
            <DescriptionTextArea name='description' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
          </DescriptionBlock>
        </BlockContainer>
        <BlockContainer>
          <Block>
            <BlockTitle>Link to image:</BlockTitle>
            {this.state.error.image && this.state.touched.image ? <ErrorMessage>{this.state.error.image}</ErrorMessage> : ''}
            <BlockInput name='image' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
            {this.state.product.image ? <ImagePreview src={this.state.product.image}/> : ''}
          </Block>
          <Block>
            <BlockTitle>Price:</BlockTitle>
            {this.state.error.cost && this.state.touched.cost ? <ErrorMessage>{this.state.error.cost}</ErrorMessage> : ''}
            <BlockInput name='cost' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
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
      <SubmitButton disabled={!isEnabled}>Submit</SubmitButton>
    </ProductActionForm>
  }
}


export default connect(mapStateToProps, { updateProduct, addProduct })(ProductActionManager);