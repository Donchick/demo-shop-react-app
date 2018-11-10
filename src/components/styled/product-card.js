import styled from 'styled-components';

export const ProductCardElement = styled.div`
  vertical-align: top;
  height: 534px;
  background: #fdfdfd url(${process.env.PUBLIC_URL + '/assets/images/product-tile-background.png'});
  text-align: right;
  font-size: 0;
  width: calc(33.33% - 30px);
  position: relative;
  margin: 15px;
  display: flex;
  flex-flow: column nowrap;
  
  @media (max-width: 1000px) {
    width: calc(50% - 30px);
  }
  
  @media (max-width: 800px) {
    width: 100%;
    display: block;
    height: auto;
  }
`;

export const ProductImageContainer = styled.div`
    position: relative;
`;

export const ProductImage = styled.img`
    width: 100%;
`;

export const ProductRatingContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-left: 15px;
  width: calc(100% - 15px);
  background: rgba(0, 0, 0, 0.7);
  height: 30px;
  text-align: left;
`;

export const RatingStar = styled.i`
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 0 2px;
  margin: 7px 2px;
  background: url(${process.env.PUBLIC_URL + '/assets/images/star.png'});
`;

export const GoldRatingStar = styled(RatingStar)`
  background: url(${process.env.PUBLIC_URL + '/assets/images/gold-star.png'});
`;

export const ProductDetailsContainer = styled.div`
  margin: 0 20px;
  height: 208px;
  text-align: center;
  @media (max-width: 1000px) {
    height: 180px;
  }
    
  @media (max-width: 800px) {
    height: auto;
    padding-bottom: 55px;
  }
`;

export const ProductName = styled.p`
  max-height: 50px;
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 0;
  text-align: left;
  border-bottom: 2px solid #2ec5cc;
`;

export const ProductDescription = styled.p`
  height: 135px;
  overflow: auto;
  font-size: 14px;
  text-align: left;
  margin: 15px 0;
  line-height: 18px;
  
  @media (max-width: 800px) {
    height: auto;
  }
`;

export const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  bottom: 20px;
  left: 20px;
  line-height: 35px;
`;

export const CurrencySymbol = styled.i`
  color: #288575;
`;