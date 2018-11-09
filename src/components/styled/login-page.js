import styled from "styled-components";
import { CommonLayout, Input} from "./common-layout";
import Button from "./button";

export const LoginLayout = styled(CommonLayout)`
  height: 101%;
  filter: blur(2px);
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/background.png'});
  position: absolute;
  left: 0;
  top: -2px;
`;

export const LoginBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 570px;
  background: #ffffff;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0,0,0, 0.3);
  font-family: PT Sans;
`;

export const LoginBlockHeader = styled.div`
  line-height: 70px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  vertical-align: middle;
  font-family: PT Sans Caption;
`;

export const LoginForm = styled.form`
  background: #ecebe9 url(${process.env.PUBLIC_URL + '/assets/images/product-tile-background.png'});
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: right;
  padding: 0 60px;
  box-shadow: inset 0px 2px 0px rgba(0,0,0, 0.1);
`;

export const LoginFormInput = styled(Input)`
  height: 60px;
  width: calc(100% - 69px);
  font-size: 24px;
  padding: 0 60px 0 10px;
  background-position: 95%;
  background-size: 32px 32px;
  margin: 10px 0 0;
`;

export const UserNameInput = styled(LoginFormInput)`
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/username-icon.png'});
  :focus {
    background-image: url(${process.env.PUBLIC_URL + 'assets/images/focused-username-icon.png'});
  }
`;

export const PasswordInput = styled(LoginFormInput)`
  background-image: url(${process.env.PUBLIC_URL + '/assets/images/password-icon.png'});
  :focus {
    background-image: url(${process.env.PUBLIC_URL + 'assets/images/focused-password-icon.png'});
  }
`;

export const InputBlock = styled.div`
  text-align: left;
  padding-top: 30px;
`;

export const LoginButton = styled(Button)`
    margin: 25px 0 30px 0;
    font-size: 18px;
    width: 170px;
    height: 50px;
`;

export const ErrorMessage = styled.p`
    text-align: ${(props) => props.global ? 'center' : 'left'};
    font-size: 16px;
    padding: 10px 10px 0;
    display: block;
    color: #da1d1d;
`;