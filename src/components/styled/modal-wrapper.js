import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000099;
  z-index: 1111111;
`;

export const ModalDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 400px;
  background: #ecebe9 url(${process.env.PUBLIC_URL + '/assets/images/product-tile-background.png'});
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0,0,0, 0.3);
  font-family: PT Sans;
  z-index: 11111111;
  
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ModalDialogHeader = styled.div`
  line-height: 70px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  vertical-align: middle;
  font-family: PT Sans Caption;
  background: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const ModalDialogBody = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: right;
  padding: 0 60px;
  box-shadow: inset 0px 2px 0px rgba(0,0,0, 0.1);
  
  @media (max-width: 800px) {
    height: auto;
    padding: 0 30px;
  }
`;