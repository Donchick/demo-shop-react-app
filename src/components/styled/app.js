import styled from "styled-components";

export const Panel = styled.div`
    height: 50px;
    background-image: linear-gradient(to top, rgba(40, 133, 117, 0.13) 0%, 
        rgba(255, 255, 255, 0.13) 100%);
    background-color: rgb(40, 133, 117);
    line-height: 50px;
    z-index: 1000;
    color: #FFFFFF;
    font-size: 15px;
    text-transform: capitalize;
`;

export const Header = styled(Panel)`
    border-bottom: 3px solid #58ba96;
    width: 100%;
    align-self: flex-start;
`;

export const Footer = styled(Panel)`
    width: 100%;
    text-align: center;
    align-self: flex-end;
  `;

export const HeaderMenu = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    text-align: right;
  
    @media (max-width: 1000px) {
        max-width: 840px;
    }
    
    @media (max-width: 800px) {
        max-width: 540px;
    }
`;

export const Main = styled.main`
    padding: 0 15px 50px;
    text-align: left;
    margin: 0 auto;
    max-width: 1140px;
    background: rgba(0,0,0, 0.4);
    min-height: calc(100% - 153px);
    flex-grow: 99;
    min-width: 80%;
    
    @media (max-width: 1000px) {
        max-width: 780px;
    }
    
    @media (max-width: 800px) {
        max-width: 480px;
    }
`;

export const BagIcon = styled.i`
    content: url(${process.env.PUBLIC_URL + '/assets/images/bag-icon.png'});
    float: left;
    margin: 13px 30px;
    cursor: pointer;
`;

export const LogoutIcon = styled.i`
    content: url(${process.env.PUBLIC_URL + '/assets/images/logout-icon.png'});
    vertical-align: middle;
    margin: 0 30px 0 10px;
    cursor: pointer;
`;