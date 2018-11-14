import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SliderContainer, Slider, RightSlider, MinMark, MaxMark, FloatingMark } from "./styled/range-slider";

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.fromSlider = React.createRef();
        this.toSlider = React.createRef();

        this.state = {
            from: props.min || 0,
            to: props.max || 5,
            step: props.step || 1
        }
    }

    changeHandler(e) {
        const target = e.target;
        if (target === this.toSlider.current) {
            let toValue = this.toSlider.current.value * 1;
            if(toValue <= this.fromSlider.current.value * 1) {
                toValue = this.fromSlider.current.value;
            }
            this.setState({
                from: this.fromSlider.current.value,
                to: toValue
            });
        }

        if (target === this.fromSlider.current) {
            let fromValue = this.fromSlider.current.value * 1;
            if (fromValue >= this.toSlider.current.value * 1) {
                fromValue = this.toSlider.current.value;
            }

            this.setState({
                from: fromValue,
                to: this.toSlider.current.value
            });
        }

        const updatedEvent = Object.assign({}, e, {
            target: {
                name: this.props.name,
                value: {
                    from: this.state.from,
                    to: this.state.to
                }
            }
        });

        this.props.onChange(updatedEvent);
    };

    render () {
        return <SliderContainer>
            <MinMark>{this.props.min}</MinMark>
            <FloatingMark id='leftMark' min={this.props.min} max={this.props.max} value={this.state.from}>{this.state.from}</FloatingMark>
            <Slider type='range'
                    value={this.state.from}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.state.step}
                    onChange={this.changeHandler.bind(this)}
                    ref={this.fromSlider}/>
            <RightSlider value={this.state.to}
                         type='range'
                         min={this.props.min}
                         max={this.props.max}
                         step={this.state.step}
                         onChange={this.changeHandler.bind(this)}
                         ref={this.toSlider}/>
            <FloatingMark id='rightMark' min={this.props.min} max={this.props.max} value={this.state.to}>{this.state.to}</FloatingMark>
            <MaxMark>{this.props.max}</MaxMark>
        </SliderContainer>
    }
}

RangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RangeSlider;

