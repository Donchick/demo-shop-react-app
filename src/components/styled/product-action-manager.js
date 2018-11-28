import styled from 'styled-components';
import { SelectList } from './select-list';
import {Button} from './button';

export const ProductActionForm = styled.form`
    width: 680px;
    height: 730px;
    
    @media (max-width: 800px) {
        width: 100%;
        height: 850px;
    }
`;

export const ProductActionFormContent = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 70px);
    
    @media (max-width: 800px) {
        flex-flow: column nowrap;
        justify-content: none;
    }
`;

export const BlockContainer = styled.div`
    width: 48%;
    
    @media (max-width: 800px) {
        width: 100%;
    }
`;

export const Block = styled.div`
    width: 100%;
    margin-top: 20px;
    text-align: left;
`;

export const GenderBlock = styled(Block)`
    font-size: 14px;
`;

export const DescriptionBlock = styled(Block)`
    height: calc(100% - 253px);
    margin-bottom: 0;
`;

export const BlockTitle = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
`;

export const BlockInput = styled.input`
    height: 35px;
    width: calc(100% - 20px);
    border-radius: 5px;
    border: 3px solid rgba(0,0,0,0);
    outline: 0;
    font-size: 14px;
    padding: 0 10px;
    font-family: PT Sans, serif, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    :focus {
        border: 3px solid rgba(41, 136, 121, 0.4);
    }
`;


export const ProductSelectList = styled(SelectList)`
    height: 35px;
    border: none;
    width: 100%;
`;

export const DescriptionTextArea = styled.textarea`
    width: calc(100% - 26px);
    height: calc(100% - 66px);
    border-radius: 5px;
    border: 1px solid rgba(0,0,0,0);
    outline: 0;
    font-size: 14px;
    padding: 15px 10px;
    resize: none;
    
    :focus {
        border: 3px solid rgba(41, 136, 121, 0.4);
    }
`;

export const ImagePreview = styled.img`
    width: 100%;
    margin-top: 10px;
    border: 1px solid #ffffff;
    max-height: 180px;
    
    @media (max-width: 800px) {
        width: auto;
    }
`;

export const SubmitButton = styled(Button)`
    position: absolute;
    bottom: 30px;
    right: 30px;
    
    @media (max-width: 800px) {
        bottom: 20px;
        right: 60px;
    }
`;

export const ErrorMessage = styled.p`
    text-align: ${(props) => props.global ? 'center' : 'left'};
    font-size: 16px;
    padding: 0 10px 10px;
    display: block;
    color: #da1d1d;
`;