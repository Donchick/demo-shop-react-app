import styled from 'styled-components';

export const ProductRatingContainer = styled.div`
    position: absolute;
    bottom: 0;
    padding-left: 15px;
    width: calc(100% - 15px);
    background: rgba(0, 0, 0, 0.7);
    height: 30px;
    text-align: left;
`;

export const RatingStar = styled.i`
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 2px;
    margin: 7px 2px;
    background: url(${process.env.PUBLIC_URL + '/assets/images/star.png'});
`;

export const GoldRatingStar = styled(RatingStar)`
    background: url(${process.env.PUBLIC_URL + '/assets/images/gold-star.png'});
`;