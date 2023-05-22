import styled from 'styled-components';

const StyledSpacerVertical = styled.div`
    height: ${props => props.height ? `${props.height}` : '10px'};
`;

const SpacerVertical = ({height}) => <StyledSpacerVertical height={height} />;

export default SpacerVertical;