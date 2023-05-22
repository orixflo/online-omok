import styled from "styled-components";

const StyledDividerVertical = styled.div`
    width: 0;
    ${props => props.height ? `height: ${props.height}` : 'height: 30px'};
    margin: 2px;
    border-left: 2px solid #808080;
    border-right: 2px solid #FFFFFF;
`;

const DividerVertical = ({ height }) => (<StyledDividerVertical height={height} />);

export default DividerVertical;