import React, {Component} from 'react';
import ModalWrapper from './modal-wrapper';
import styled from 'styled-components';
import { SelectList } from './styled/select-list';
import { RadioButton, RadioButtonLabel } from './styled/radio-button';
import Gender from '../helpers/models/gender';

const ProductActionForm = styled.form`
  width: 680px;
  height: 730px;
`;

const ProductActionFormContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 70px);
`;

const BlockContainer = styled.div`
  width: 48%;
`;

const Block = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: left;
`;

const GenderBlock = styled(Block)`
  font-size: 14px;
`;

const DescriptionBlock = styled(Block)`
  height: calc(100% - 253px);
  margin-bottom: 0;
`;

const BlockTitle = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
`;

const BlockInput = styled.input`
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


const ProductSelectList = styled(SelectList)`
  height: 35px;
  border: none;
  width: 100%;
`;

const DescriptionTextArea = styled.textarea`
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

const ImagePreview = styled.img`
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ffffff;
  max-height: 180px;
`;

class ProductActionModal extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };

    this.modal = React.createRef();
  }

  open () {
    this.modal.current.open();
  }

  close () {
    this.modal.current.close();
  }

  _handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  render () {
    return <ModalWrapper ref={this.modal} title={this.props.title}>
      <ProductActionForm>
        <ProductActionFormContent>
          <BlockContainer>
            <Block>
              <BlockTitle>Name:</BlockTitle>
              <BlockInput/>
            </Block>
            <Block>
              <BlockTitle>Category:</BlockTitle>
              <ProductSelectList green/>
            </Block>
            <GenderBlock>
              {[...Object.values(Gender), 'All'].map((gender) => (
                  <span key={gender}>
                    <RadioButton defaultChecked={this.state.gender === gender} type='radio' name='gender' value={gender} id={gender} onClick={this._handleChange.bind(this)}/>
                    <RadioButtonLabel htmlFor={gender}>{gender}</RadioButtonLabel>
                  </span>
              ))}
            </GenderBlock>
            <DescriptionBlock>
              <BlockTitle>Description:</BlockTitle>
              <DescriptionTextArea/>
            </DescriptionBlock>
          </BlockContainer>
          <BlockContainer>
            <Block>
              <BlockTitle>Link to image:</BlockTitle>
              <BlockInput/>
              <ImagePreview/>
            </Block>
            <Block>
              <BlockTitle>Price:</BlockTitle>
              <BlockInput/>
            </Block>
            <Block>
              <BlockTitle>Rating:</BlockTitle>
              <ProductSelectList>
                {[1,2,3,4,5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </ProductSelectList>
            </Block>
          </BlockContainer>
        </ProductActionFormContent>
      </ProductActionForm>
    </ModalWrapper>
  }
}

export default ProductActionModal;