import React, {Component} from 'react';
import LoadingOverlay from './loading-overlay';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoadingOverlayContainer = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
`;

let _scrollHandler = () => {};

class InfiniteScroll extends Component {
    constructor () {
        super(...arguments);
        this.bottomElement = React.createRef();
        _scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount () {
        if (!this.props.allItemsLoaded) {
            document.addEventListener('scroll', _scrollHandler);
        }
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', _scrollHandler);
    }

    componentDidUpdate (prevProps) {
        if (!this.props.allItemsLoaded) {
            document.addEventListener('scroll', _scrollHandler);
        }
    }

    scrollHandler (e) {
        if (!this.bottomElement.current || this.bottomElement.current.offsetTop > window.innerHeight + window.scrollY) {
            return true;
        }

        document.removeEventListener('scroll', _scrollHandler);
        this.props.loadMore();
    }

    render () {
        return <div>
            {this.props.children}
            {!this.props.allItemsLoaded ? <LoadingOverlayContainer><LoadingOverlay hideOverlay={true}/></LoadingOverlayContainer> : ''}
            <div ref={this.bottomElement}></div>
        </div>
    }
};

InfiniteScroll.propTypes = {
    loadMore: PropTypes.func.isRequired,
    loadingInProcess: PropTypes.bool.isRequired,
    allItemsLoaded: PropTypes.bool.isRequired
};

export default InfiniteScroll;