import styled from 'styled-components';

export const ProductsList = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

export const TopContainer = styled.div`
    padding: 20px 0;
    display: flex;
    flex-flow: row no-wrap;
    justify-content: ${(props) => props['space-between'] ? 
        'space-between' : 'flex-end'};
`;