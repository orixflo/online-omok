import styled from "styled-components";
import { colorConvex } from "../../styles/colors";

const StyledTab = styled.div`
    ${props => props.width ? `width: ${props.width}` : `width: calc(100% - 4px)`};
    ${props => props.height ? `height: ${props.height}` : `height: calc(100% - 4px)`};
    overflow: hidden;
    box-shadow: ${colorConvex[0]};
`;

const Tab = ({width, height, children}) => <StyledTab width={width} height={height}>{children}</StyledTab>;

export default Tab;