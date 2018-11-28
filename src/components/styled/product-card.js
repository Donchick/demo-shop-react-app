import styled from 'styled-components';
import { Button } from './button';

export const ProductCardElement = styled.div`
    vertical-align: top;
    height: 530px;
    background: #fdfdfd url(${process.env.PUBLIC_URL + 
        '/assets/images/product-tile-background.png'});
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
    max-height: 320px;
    
    @media (max-width: 1000px) {
        max-height: 350px;
    }
    
    @media (max-width: 800px) {
        height: auto;
    }
`;

export const ProductImage = styled.img`
    width: 100%;
    max-height: 320px;
    
    @media (max-width: 1000px) {
        max-height: 350px;
    }
`;

export const ProductDetailsContainer = styled.div`
    margin: 0 20px;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
      
    @media (max-width: 800px) {
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
    min-height: calc(100% - 135px);
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 14px;
    text-align: left;
    margin: 15px 0 50px;
    line-height: 18px;
    
    @media (max-width: 800px) {
        height: auto;
    }
`;

export const ProductPrice = styled.span`
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    bottom: 10px;
    left: 20px;
    line-height: 35px;
`;

export const CurrencySymbol = styled.i`
    color: #288575;
`;

export const ProductCardButton = styled(Button)`
    position: absolute;
    bottom: 10px;
    max-width: 90px;
    width: 25%;
    right: ${(props) => props.left ? '120px;' : '20px;'}
`;