import React, {Component} from 'react';
import ModalWrapper from './modal-wrapper';
import ProductActionManager from '../containers/ProductActionManager';

class ProductActionModal extends Component {
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
    return <ModalWrapper ref={this.modal} title={this.props.title}>
      <ProductActionManager/>
    </ModalWrapper>
  }
}

export default ProductActionModal;