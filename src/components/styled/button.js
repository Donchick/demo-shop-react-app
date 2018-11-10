import styled  from 'styled-components';

export const Button = styled.button`
	width: 120px;
	height: 35px;
	color: #FFFFFF;
	border-radius: 5px;
	font-size: 14px;
	border:none;
	padding: 0;
	outline: 0;
	font-family: PT Sans;
    background-image: ${(props) => props.secondary ? 'linear-gradient(to top, #767676 0%, #b1b1b1 100%)'
        : 'linear-gradient(to top, #278473 0%, #3fc6cc 100%)'};
	:active {
	    background-image: ${(props) => props.secondary ? 'linear-gradient(to top, #b1b1b1 0%, #767676 100%)' 
        : 'linear-gradient(to top, #3fc6cc 0%, #278473 100%)'};
	};
	:disabled {
        background-image: linear-gradient(to top, rgba(39, 132, 115, 0.2) 0%, rgba(63, 198, 204, 0.2) 100%);
	}
`;