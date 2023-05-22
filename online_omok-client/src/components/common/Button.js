import styled from "styled-components";

const StyledButton = styled.button`
    font-family: 'DungGeunMo';
    ${props => props.fontSize ? `font-size: ${props.fontSize}` : 'font-size: 1.2rem;'};
    margin: 4px;
    border: 0px;
    background: #C0C0C0;
    ${props => props.width ? `width: ${props.width}` : ''};
    ${props => props.height ? `height: ${props.height}` : ''};
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

    &:active {
        ${props => props.disabled ? '' :
            `
            box-shadow:
                // Internal frame
                -2px -2px #000000,
                -2px 0px #000000,
                0px -2px #000000,
                2px 2px #DFDFDF,
                2px -2px #DFDFDF,
                -2px 2px #DFDFDF,
                // External frame
                -4px -4px #808080,
                -4px 2px #808080,
                2px -4px #808080,
                4px 4px #FFFFFF,
                4px -4px #FFFFFF,
                -4px 4px #FFFFFF;
            `
        };
    }

    &:disabled {
        color: #808080;
    }
`;

const Button = ({ disabled, width, children, fontSize, onClick, height }) => {
    return (
        <StyledButton disabled={disabled} width={width} fontSize={fontSize} onClick={onClick} height={height}>{children}</StyledButton>
    );
};

export default Button;