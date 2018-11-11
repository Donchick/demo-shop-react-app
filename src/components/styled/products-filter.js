import styled from "styled-components";
import {Input} from "./common-layout";
import {Button} from "./button";

export const FilterContainer = styled.div`
  text-align: right;
  padding: 20px 0;
  position: relative;
  vertical-align: middle;
  line-height: 35px;
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
  max-width: 790px;
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
      content: url(${process.env.PUBLIC_URL + 'assets/images/tooltip-triangle.png'});
      top: 0;
      right: 310px;
      width: 16px;
      height: 16px;
  }
`;

export const ProductParamsFilters = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #2e8879;
  font-size: 0;
`;