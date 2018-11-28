import styled from 'styled-components';

export const SelectList = styled.select`
    width: 100%;
    height: 35px;
    font-size: 14px;
    font-family: PT Sans;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    padding: 0 13px;
    text-align: center;
    border: none;
    
    background: ${(props) => props.green ? '#2e8879' : '#ffffff'};
    background-image: ${(props) => props.green ? 
        `url(${process.env.PUBLIC_URL + 
            '/assets/images/white-select-link.png'})` :
        `url(${process.env.PUBLIC_URL + 
            '/assets/images/green-select-link.png'})`} ;
    color: ${(props) => props.green ? '#fff' : '#000'};
    background-repeat: no-repeat;
    background-position: 95% 50%;
`;