import React from 'react';
import { LoadingOverlayContainer,
         SpinnerContainer,
         Spinner,
         ShadowOverlay } from "./styled/loading-overlay";

export const LoadingOverlay = (props) => {
    return <LoadingOverlayContainer>
        <SpinnerContainer>
            <Spinner/>
        </SpinnerContainer>
        <ShadowOverlay hidden={props.hideOverlay}/>
    </LoadingOverlayContainer>
};

export default LoadingOverlay;