import styled from "styled-components";

const StyledTabButton = styled.button`
    font-family: 'DungGeunMo';
    ${props => props.fontSize ? `font-size: ${props.fontSize}` : 'font-size: 1.2rem;'};

    border: 0px;
    margin: 4px;
    background: #C0C0C0;
    ${props => props.width && `width: ${props.width}`};

    ${props => props.activated ? `
        box-shadow:
            -2px -2px #DFDFDF,
            0px -2px #dfdfdf,
            2px -2px #808080,
            2px 0px #808080,
            4px 0px #000000,
            0px 5px #C0C0C0,
            -2px 2px #DFDFDF,
            -4px -4px #FFFFFF,
            -4px 2px #FFFFFF,
            2px -4px #FFFFFF,
            4px -4px #000000;
    ` : `
        box-shadow:
            -2px -2px #DFDFDF,
            -2px 0px #DFDFDF,
            0px -2px #DFDFDF,
            2px -2px #808080,
            2px 0px #808080,
            // bottom-in
            4px 0px #000000,
            4px 2px #FFFFFF,
            -2px 2px #FFFFFF,
            -4px -4px #FFFFFF,
            -4px 2px #FFFFFF,
            2px -4px #FFFFFF,
            // bottom-out
            4px -4px #000000,
            4px 4px #DFDFDF,
            -2px 4px #DFDFDF;
    `}

    &:disabled {
        color: #808080;
    }
`;

const TabButton = ({ disabled, width, children, fontSize, onClick, activated }) => {
    return (
        <StyledTabButton disabled={disabled} width={width} fontSize={fontSize} onClick={onClick} activated={activated}>
            {children}
        </StyledTabButton>
    );
};

export default TabButton;