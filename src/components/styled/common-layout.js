import styled  from 'styled-components';

export const CommonLayout = styled.div`
    width: 100%;
    height: 100%;
`;

export const Input = styled.input`
  border-radius: 5px;
  outline: 0;
  background-repeat: no-repeat;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: PT Sans;
  border: ${props => props.invalid? '3px solid #ff0000' : '3px solid rgba(0,0,0,0)'};
  :focus {
    border: 3px solid rgba(41, 136, 121, 0.4);
  }
`;