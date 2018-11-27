import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getProduct, updateProduct } from '../actions/products';
import { getCategories } from '../actions/categories';
import { history } from '../helpers/history';
import connect from "react-redux/es/connect/connect";
import LoadingOverlay from '../components/loading-overlay';
import { ProductRatingContainer,
  RatingStar,
  GoldRatingStar } from '../components/styled/product-rating';
import authService from '../services/authentication';
import ProductActionModal from  '../components/product-action-modal';
import {allCategory} from '../constants/categories';
import { NavigationBar,
         BackLink,
         BuyProductButton,
         CategoryPathLink,
         CurrencyIcon,
         ManagerLink,
         OutOfStockCaption,
         ProductBlock,
         ProductDescription,
         ProductDetailsPanel,
         ProductImage,
         ProductName,
         ProductPrice,
         ProductQuantityCaption } from '../components/styled/product-page';

const mapStateToProps = (state) => ({
  product: state.product,
  categories: state.categories,
  activeProcess: state.activeProcess
});

class ProductPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      categories: props.categories || [],
      product: props.product || {},
      activeProcess: false,
      user: {}
    };

    this.updateProductModal = React.createRef();
  }

  componentDidMount () {
    this.props.getProduct(this.state.id);
    this.props.getCategories();
    const user = authService.getUser();
    if (user) {
      this.setState({user: user});
    }
  }

  componentWillReceiveProps(nextState) {
    if (nextState.product) {
      this.setState({
        product: nextState.product,
        activeProcess: false
      });
      this.updateProductModal.current.close();
    }
    if (nextState.categories) {
      this.setState({
        categories: nextState.categories
      });
    }
  }

  handleEditClick () {
    this.updateProductModal.current.open();
  }

  handleAddMoreClick () {
    const product = this.state.product;
    product.count += 5;
    this.props.updateProduct(product);
  }

  handleBuyClick () {
    const product = this.state.product;
    product.count -= 1;
    this.props.updateProduct(product);
  }

  handleBackClick () {
    history.push('/');
  }

  handleGenderCategoryClick () {
    history.push(`/?gender=${this.props.product.gender}&category=${allCategory.id}`);
  }

  handleProductCategoryClick () {
    history.push(`/?category=${this.props.product.categoryId}&gender=All`);
  }

  render () {
    const showProduct = this.props.product.id;
    const showLoadingOverlay = this.props.activeProcess;
    const product = this.props.product;
    const isAdmin = this.state.user.isAdmin;
    const outOfStock = product.soldCount >= product.count;
    let category = '';
    if (this.props.categories.length > 0 && product.categoryId !== undefined) {
      category = this.props.categories.find(({id}) => id === product.categoryId).name;
    }

    return <div>
      <NavigationBar>
        <BackLink><a onClick={this.handleBackClick.bind(this)}>Back</a></BackLink>
        <CategoryPathLink>Category: <a onClick={this.handleGenderCategoryClick.bind(this)}>{product.gender}</a> / <a onClick={this.handleProductCategoryClick.bind(this)}>{category}</a></CategoryPathLink>
      </NavigationBar>
      { showProduct ? <ProductBlock>
        {showLoadingOverlay ? <LoadingOverlay/> : ''}
        <ProductDetailsPanel>
          <ProductImage src={product.image}/>
          <ProductRatingContainer>
            {[1,2,3,4,5].map((score) =>
                product.rating >= score ? <GoldRatingStar key={score}/> : <RatingStar key={score}/>
            )}
          </ProductRatingContainer>
        </ProductDetailsPanel>
        <ProductDetailsPanel>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>
            {product.description}
            { isAdmin ? <p>You can <ManagerLink onClick={this.handleAddMoreClick.bind(this)}>add 5 more</ManagerLink>. You can also <ManagerLink onClick={this.handleEditClick.bind(this)}>edit</ManagerLink> them</p> : '' }
          </ProductDescription>
          { outOfStock ? <OutOfStockCaption>This item is out of stock.</OutOfStockCaption> : ''}
          <ProductPrice><CurrencyIcon>$</CurrencyIcon>{product.cost}{outOfStock ? '' : <ProductQuantityCaption>({product.count - product.soldCount} items left)</ProductQuantityCaption>}</ProductPrice>
          <BuyProductButton onClick={this.handleBuyClick.bind(this)} disabled={outOfStock}>Buy</BuyProductButton>
        </ProductDetailsPanel>
      </ProductBlock> : '' }
      <ProductActionModal ref={this.updateProductModal} product={product} title='Update Product'/>
    </div>
  }
};

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getProduct: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, {getProduct, updateProduct, getCategories})(ProductPage);