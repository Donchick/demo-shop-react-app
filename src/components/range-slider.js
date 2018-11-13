import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SliderContainer = styled.div`
   position: relative;
`;

const Slider = styled.input`
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

const RightSlider = styled(Slider)`
     background: none;
`;

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.fromSlider = React.createRef();
        this.toSlider = React.createRef();

        this.state = {
            from: 0,
            to: 5
        }
    }

    changeHandler({target}) {
        if (target === this.toSlider.current) {
            let fromValue = this.fromSlider.current.value * 1;
            if(this.toSlider.current.value * 1 - this.toSlider.current.step * 1 < this.fromSlider.current.value * 1) {
                fromValue -= this.toSlider.current.step * 1;
            }
            this.setState({
                from: fromValue,
                to: this.toSlider.current.value
            });
        }

        if (target === this.fromSlider.current) {
            let toValue = this.toSlider.current.value * 1;
            if (this.fromSlider.current.value * 1 + this.fromSlider.current.step * 1 > this.toSlider.current.value * 1) {
                toValue += this.fromSlider.current.step * 1;
            }

            this.setState({
                from: this.fromSlider.current.value,
                to: toValue
            });
        }
    };

    render () {
        return <SliderContainer>
            <Slider type='range' value={this.state.from} min={this.props.min} max={this.props.max} step='1' onChange={this.changeHandler.bind(this)} ref={this.fromSlider}/>
            <RightSlider value={this.state.to} type='range' min={this.props.min} max={this.props.max} step='1' onChange={this.changeHandler.bind(this)} ref={this.toSlider}/>
        </SliderContainer>
    }
}

RangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default RangeSlider;

