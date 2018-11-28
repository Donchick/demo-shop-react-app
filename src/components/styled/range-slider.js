import styled from 'styled-components';

export const SliderContainer = styled.div`
   position: relative;
   height: 50px;
`;

export const Slider = styled.input`
    position: absolute;
    appearance: none;
    width: 100%;
    margin: 0;
    padding: 0;
    outline: none;
    background: linear-gradient(grey,grey) no-repeat center;
    background-size: 100% 2px;
    pointer-events: none;

    &::-webkit-slider-thumb {
        height: 28px;
        width: 28px;
        border-radius: 28px;
        background-color: #2f897a;
        cursor: pointer;
        appearance: none;
        pointer-events: all;
    }
`;

export const LeftSlider = styled(Slider)`
    z-index: ${(props) => props.value * 1 === props.max ? 2 : 0};
`;

export const RightSlider = styled(Slider)`
    background: none;
    z-index: ${(props) => props.value * 1 === props.min ? 2 : 1};
`;

export const Mark = styled.span`    
    position: absolute;
    bottom: 0px;
`;

export const FloatingMark = styled(Mark).attrs({
    left: (props) => props.value ?
        `calc(${props.value * 100/(props.max - props.min)}% - 
                ${28 * (props.value)/(props.max - props.min)}px)`: '0',
    display: (props) => props.value * 1 === props.min ||
                props.value * 1 === props.max ? 'none': 'inline-block'
})`
    left: ${(props) => props.left};
    display: ${(props) => props.display};
    width: 28px;
    text-align: center;
    top: -18px;
`;

export const MinMark = styled(Mark)`
    left: 10px;
`;

export const MaxMark = styled(Mark)`
    right: 10px;
`;