import React, {Component} from 'react';
import { ModalOverlay,
         ModalDialog,
         ModalDialogBody,
         ModalDialogHeader } from './styled/modal-wrapper';

class ModalWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            open: false
        };

        this.overlay = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', (e) => {
            if (e.target === this.overlay.current) {
                this.close();
            }
        });
    }

    open () {
        this.setState({
            open: true
        });
    }

    close () {
        this.setState({
            open: false
        });
    }

    render () {
        const shouldOpen = this.state.open;

        return shouldOpen ? <div>
            <ModalOverlay ref={this.overlay}/>
            <ModalDialog>
                <ModalDialogHeader>{this.props.title}</ModalDialogHeader>
                <ModalDialogBody>
                    {this.props.children}
                </ModalDialogBody>
            </ModalDialog>
        </div> : '';
    }
};

export default ModalWrapper;