import styled from 'styled-components';

const StyledSpacerHorizontal = styled.div`
    width: ${(props) => (props.width ? `${props.width}` : '10px')};
`;

const SpacerHorizontal = ({ width }) => <StyledSpacerHorizontal width={width} />;

export default SpacerHorizontal;
