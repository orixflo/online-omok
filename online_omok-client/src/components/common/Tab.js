import styled from "styled-components";

const StyledTab = styled.div`
    ${props => props.width ? `width: ${props.width}` : `width: calc(100% - 4px)`};
    ${props => props.height ? `height: ${props.height}` : `height: calc(100% - 4px)`};
    overflow: hidden;
    box-shadow:
        // Internal frame
        -2px -2px #DFDFDF,
        -2px 0px #DFDFDF,
        0px -2px #DFDFDF,
        2px 2px #808080,
        2px -2px #808080,
        -2px 2px #808080,
        // External frame
        -4px -4px #FFFFFF,
        -4px 2px #FFFFFF,
        2px -4px #FFFFFF,
        4px 4px #000000,
        4px -4px #000000,
        -4px 4px #000000;
`;

const Tab = ({width, height, children}) => <StyledTab width={width} height={height}>{children}</StyledTab>;

export default Tab;