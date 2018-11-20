import styled from "styled-components";
import {Input} from "./common-layout";
import {Button} from "./button";
import RangeSlider from '../range-slider';

export const FilterContainer = styled.div`
  text-align: right;
  position: relative;
  vertical-align: middle;
  line-height: 35px;
  width: 100%;
  max-width: 790px;
`;

export const FilterInput = styled(Input)`
  height: 30px;
  width: 170px;
  border-radius: 5px;
  border: 3px solid rgba(0, 0, 0, 0);
  outline: 0;
  padding: 0 40px 0 15px;
  font-size: 14px;
  margin-left: 20px;
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/search-icon.png'});
  background-position: 95%;
  
  :focus {
    background-image: url(${process.env.PUBLIC_URL + '/assets/images/focused-search-icon.png'}); 
    border: 3px solid rgba(41, 136, 121, 0.4);
  }
  
  ::placeholder {
      font-style: italic;
      font-family: PT Sans, serif, sans-serif;
      color: #999999;
  }
`;

export const FilterBoxButton = styled(Button)`
  display: inline-block;
  position: relative;
  width: 140px;
  text-align: center;
  cursor: pointer;
`;

export const FilterOptionsBox = styled.div`
  visibility: ${(props) => props.open ? 'visible' : 'hidden'};
  opacity: ${(props) => props.open ? 1 : 0};
  text-align: center;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 55px;
  transition: opacity 1s;
  padding-top: 10px;
  width: 100%;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  line-height: normal;
  display: ${(props) => props.open ? 'block' : 'none'};
`;

export const Filters = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  
  ::before {
      position: absolute;
      display: block;
      content: url(${process.env.PUBLIC_URL + '/assets/images/tooltip-triangle.png'});
      top: 0;
      right: 310px;
      width: 16px;
      height: 16px;
  }
`;

export const ProductParamFilters = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #2e8879;
  font-size: 0;
`;

export const ProductRangeFilters = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding-top: 15px;
`;

export const Filter = styled.div`
    font-size: 14px;
    font-family: PT Sans, serif, sans-serif;
    text-align: left;
    vertical-align: top;
    display: inline-block;
    width: 25%;
`;

export const GenderFilter = styled(Filter)`
    width: 45%;
`;

export const CategoryFilter = styled(Filter)`
    width: 30%;
`;

export const RangeFilter = styled(Filter)`
    margin-right: 19px;
    width: 25%;
    max-width: 237px;
`;

export const PriceFilter = styled(RangeFilter)`
    width: 65%;
    max-width: 420px;
`;

export const FilterTitle = styled.span`
    font-size: 12px;
    color: #000000;
    font-family: PT Sans, serif, sans-serif;
    display: inline-block;
    padding-bottom: ${(props) => props.bottomPadding ? '5px' : '0'};
`;

export const RangeFilterTitle = styled(FilterTitle)`
    padding-bottom: 15px;
`;

export const RatingRangeSlider = styled(RangeSlider)`
    max-width: 237px;
`;

export const PriceRangeSlider = styled(RangeSlider)`
    max-width: 420px;
    margin-right: 19px;
`;
