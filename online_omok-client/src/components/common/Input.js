import styled from "styled-components";

export const StyledInput = styled.input`
    font-family: 'DungGeunMo';
    font-size: 1.4rem;
    border: 0px;
    margin: 5px;
    ${props => props.width ? `width: ${props.width}` : ''};
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

    &:focus {
        outline: 0;
    }
`;

const Input = props => <StyledInput {...props} />;

export default Input;