import styled from "styled-components";
import {Input} from "./common-layout";

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