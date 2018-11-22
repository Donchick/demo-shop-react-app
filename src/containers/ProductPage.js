import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getProduct, updateProduct } from '../actions/products';
import { getCategories } from '../actions/categories';
import { history } from '../helpers/history';
import connect from "react-redux/es/connect/connect";
import styled from 'styled-components';
import LoadingOverlay from '../components/loading-overlay';
import { ProductRatingContainer,
  RatingStar,
  GoldRatingStar } from '../components/styled/product-rating';
import authService from '../services/authentication';
import {Button} from '../components/styled/button';
import ProductActionModal from  '../components/product-action-modal';
import {allCategory} from '../constants/categories';

const NavigationBar = styled.div`
  padding: 20px 0;
  width: 100%;
  font-size: 0px;
`;

const NavigationLink = styled.span`
  display: inline-block;
  width: 50%;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;

const BackLink = styled(NavigationLink)`
  text-align: left;
`;

const CategoryPathLink = styled(NavigationLink)`
  text-align: right;
`;

const ProductBlock = styled.div`
  width: calc(100% - 60px);
  background: #fdfdfd url(${process.env.PUBLIC_URL + '/assets/images/product-tile-background.png'});
  padding: 20px 20px 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: relative;
  min-height: 200px;
`;

const ProductDetailsPanel = styled.div`
  width: 49%;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductDescription = styled.div`
  height: calc(100% - 130px);
  overflow: auto;
  font-size: 16px;
  text-align: left;
  margin: 15px 0;
  line-height: 16px;
`;

const ProductName = styled.div`
  max-height: 50px;
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  padding: 5px 0 15px;
  border-bottom: 2px solid #2ec5cc;
`;

const OutOfStockCaption = styled.p`
  text-align: left;
  font-size: 16px;
  color: #da1d1d;
`;

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 35px;
`;

const CurrencyIcon = styled.i`
  color: #288575;
`;

const ProductQuantityCaption = styled.span`
  font-weight: normal;
  font-size: 16px;
  margin-left: 5px;
`;

const BuyProductButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 35px;
  text-align: center;
`;

const ManagerLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

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