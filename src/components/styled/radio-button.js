import styled from 'styled-components';

export const RadioButton = styled.input`
    position: absolute;
    opacity: 0;
`;

export const RadioButtonLabel = styled.label`
    cursor: pointer;
    display: inline-block;
    line-height: 26px;
    position: relative;
    padding-left: 30px;
    padding-right: 10px;
    color: #000000;
    vertical-align: middle;
    
    :before {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        left: 0;
        padding: 1px;
        border: 1px solid #2f897a;
        background: #ffffff;
    }
    
    :after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        top: 2px;
        left: 2px;
        background: #2f897a;
        opacity: 0;
        transition: all .2s;
    }
    
    ${RadioButton}:checked + & {
        color: #2e8879;
    }
    
    ${RadioButton}:checked + &:after {
        opacity: 1;
    }
`;