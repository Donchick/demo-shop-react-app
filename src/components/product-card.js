import React from 'react';
import PropTypes from 'prop-types';
import { ProductCardElement,
        ProductImageContainer,
        ProductImage,
        ProductDetailsContainer,
        ProductName,
        ProductDescription,
        ProductPrice,
        CurrencySymbol,
        ProductCardButton} from './styled/product-card';
import { ProductRatingContainer,
         RatingStar,
         GoldRatingStar } from './styled/product-rating';

const ProductCard = (props) => {
    return <ProductCardElement>
        <ProductImageContainer>
            <ProductImage src={props.product.image}/>
            <ProductRatingContainer>
                {[1,2,3,4,5].map((score) =>
                    props.product.rating >= score ? <GoldRatingStar key={score}/> : <RatingStar key={score}/>
                )}
            </ProductRatingContainer>
        </ProductImageContainer>
        <ProductDetailsContainer>
            <ProductName>{props.product.name}</ProductName>
            <ProductDescription>{props.product.description}</ProductDescription>
            <ProductPrice><CurrencySymbol>$</CurrencySymbol>{props.product.cost}</ProductPrice>
            <ProductCardButton onClick={props.showDetails}>Show More</ProductCardButton>
            { props.showDeleteButton ? <ProductCardButton secondary left onClick={props.deleteProduct}>Delete</ProductCardButton> : ''}
        </ProductDetailsContainer>
    </ProductCardElement>
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    showDetails: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired
};

export default ProductCard