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

const validatableFields = ['name', 'description', 'image', 'cost'];

const mapStateToProps = (state) => ({
  categories: state.categories
});

const validateField = (field, value) => {
    if (value === '') {
        return 'Field is required.';
    }

    if (field === 'cost') {
        return /^\d*(\.\d{1,2})?$/.test(value) ? null : 'Wrong price format.';
    }

    return null;
};

class ProductActionManager extends Component {
  constructor (props) {
    super(props);

    this.state = {
      imagePathInvalid: true,
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

  handleBlur(e) {
    if (validatableFields.includes(e.target.name) && !this.state.touched[e.target.name]) {
      this.setState({
          touched: {...this.state.touched, [e.target.name]: true}
      });
    }
  }

  handleChange (e) {
    if (e.target.name === 'image' && e.target.value) {
      imageValidator(e.target.value).then((result) => {
        this.setState({
            imagePathInvalid: !result
        });
      })
    }

    let product = { ...this.state.product, [e.target.name]: e.target.value };

    this.setState({product});
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const error = validatableFields.reduce((result, field) => {
        result[field] = validateField(field, this.state.product[field]);
        return result;
    }, {});

    if (Object.values(error).some((error) => !error) && !this.state.imagePathInvalid) {
        this.state.product.id ?
            this.props.updateProduct(this.state.product) :
            this.props.addProduct(this.state.product);
    }
  }

  render () {
    const error = validatableFields.reduce((result, field) => {
      result[field] = validateField(field, this.state.product[field]);
      return result;
    }, {});

    let isDisable = Object.values(error).some((error) => error)|| this.state.imagePathInvalid;

    const shouldMarkError = (field) => {
        const hasError = error[field];
        const touched = this.state.touched[field];

        return hasError && touched;
    };

    return <ProductActionForm onSubmit={this.handleSubmit.bind(this)}>
      <ProductActionFormContent>
        <BlockContainer>
          <Block>
            <BlockTitle>Name:</BlockTitle>
            {shouldMarkError('name') ? <ErrorMessage>{error.name}</ErrorMessage> : ''}
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
              {shouldMarkError('description') ? <ErrorMessage>{error.description}</ErrorMessage> : ''}
            <DescriptionTextArea name='description' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
          </DescriptionBlock>
        </BlockContainer>
        <BlockContainer>
          <Block>
            <BlockTitle>Link to image:</BlockTitle>
              {shouldMarkError('image') ? <ErrorMessage>{error.image}</ErrorMessage> : ''}
              {this.state.imagePathInvalid && this.state.touched.image && !error.image ? <ErrorMessage>Image path invalid</ErrorMessage> : ''}
            <BlockInput name='image' onKeyUp={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
            {this.state.product.image ? <ImagePreview src={this.state.product.image}/> : ''}
          </Block>
          <Block>
            <BlockTitle>Price:</BlockTitle>
              {shouldMarkError('cost') ? <ErrorMessage>{error.cost}</ErrorMessage> : ''}
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
      <SubmitButton disabled={isDisable }>Submit</SubmitButton>
    </ProductActionForm>
  }
}


export default connect(mapStateToProps, { updateProduct, addProduct })(ProductActionManager);