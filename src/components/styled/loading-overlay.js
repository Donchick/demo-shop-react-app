import styled from 'styled-components';

export const LoadingOverlayContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000000;
`;

export const SpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Spinner = styled.div`
    border: 5px solid #fdfdfd;
    border-radius: 50%;
    border-top: 5px solid #37b7b6;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const ShadowOverlay = styled.div`
    background: #0000004a;
    width: 100%;
    height: 100%;
`;