import React, {Component} from 'react';
import ModalWrapper from './modal-wrapper';
import { ErrorMessage, SubmitButton } from './styled/error-modal';

class ErrorModal extends Component {
    constructor (props) {
        super(props);

        this.modal = React.createRef();
    }

    open () {
        this.modal.current.open();
    }

    close () {
        this.modal.current.close();
    }

    render () {
        return <ModalWrapper ref={this.modal} title='Global error'>
            {this.props.message ?
                <ErrorMessage>{this.props.message}</ErrorMessage> : ''}
            <SubmitButton onClick={this.close.bind(this)}>OK</SubmitButton>
        </ModalWrapper>
    }
}

export default ErrorModal;