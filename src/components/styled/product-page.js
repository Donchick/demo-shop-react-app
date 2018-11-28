import styled from 'styled-components';
import {Button} from './button';
import { Link } from 'react-router-dom';

export const NavigationBar = styled.div`
    padding: 20px 0;
    width: 100%;
    font-size: 0px;
`;

export const NavigationLink = styled.span`
    display: inline-block;
    width: 50%;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
`;

export const BackLink = styled(NavigationLink)`
    text-align: left;
`;

export const CategoryPathLink = styled(NavigationLink)`
    text-align: right;
`;

export const ProductBlock = styled.div`
    width: calc(100% - 60px);
    background: #fdfdfd url(${process.env.PUBLIC_URL + 
        '/assets/images/product-tile-background.png'});
    padding: 20px 20px 25px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    min-height: 200px;
    
    @media (max-width: 800px) {
        flex-flow: column nowrap;
        padding: 20px;
    }
`;

export const ProductDetailsPanel = styled.div`
    width: 49%;
    position: relative;
    
    @media (max-width: 800px) {
        width: 100%;
        font-size: 14px;
        position: relative;
    }
`;

export const ProductImage = styled.img`
    width: 100%;
    
    @media (max-width: 800px) {
        width: 100%;
        font-size: 14px;
        position: relative;
    }
`;

export const ProductDescription = styled.div`
    height: calc(100% - 130px);
    overflow: auto;
    font-size: 16px;
    text-align: left;
    margin: 15px 0;
    line-height: 16px;
    
    @media (max-width: 800px) {
        height: auto;
        overflow: hidden;
        margin-bottom: 35px;
    }
`;

export const ProductName = styled.div`
    max-height: 50px;
    overflow: hidden;
    font-size: 24px;
    font-weight: bold;
    padding: 5px 0 15px;
    border-bottom: 2px solid #2ec5cc;
  
    @media (max-width: 800px) {
        padding: 15px 0;
    }
`;

export const OutOfStockCaption = styled.p`
    text-align: left;
    font-size: 16px;
    color: #da1d1d;
`;

export const ProductPrice = styled.span`
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 35px;
    
    @media (max-width: 800px) {
        position: static;
    }
`;

export const CurrencyIcon = styled.i`
    color: #288575;
`;

export const ProductQuantityCaption = styled.span`
    font-weight: normal;
    font-size: 16px;
    margin-left: 5px;
`;

export const BuyProductButton = styled(Button)`
    position: absolute;
    bottom: 0;
    right: 0;
    line-height: 35px;
    text-align: center;
    
    @media (max-width: 800px) {
        float: right;
    }
`;

export const ManagerLink = styled.a`
    cursor: pointer;
    text-decoration: underline;
`;

export const CustomLink = styled(Link)`
    color: inherit;
`;
