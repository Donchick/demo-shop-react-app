import styled from 'styled-components';

export const Checkbox = styled.input`
    position: absolute;
    opacity: 0;
`;

export const CheckboxLabel = styled.label`
    cursor: pointer;
    outline: 0;
    color: #000000;
    position: relative;
    padding: 0 0 0 60px;
    display: inline-block;
    line-height: 26px;
    vertical-align: middle;
    
    :before {
        content: '';
        position: absolute;
        height: 22px;
        left: 0;
        width: 48px;
        padding: 1px 0;
        border-radius: 13px;
        border: 1px solid #2f897a;
    }
    :after {
        content: '';
        position: absolute;
        height: 22px;
        top: 2px;
        left: 26px;
        width: 22px;
        background: #2f897a;
        border-radius: 50%;
        transition: all .2s;
    }
    
    ${Checkbox}:checked + & {
        color: #2e8879;
    }
    
    ${Checkbox}:checked + &:before {
        background: #2f897a;
    }
    
    ${Checkbox}:checked + &:after {
        left: 2px;
        background: #ffffff;
    }
`;