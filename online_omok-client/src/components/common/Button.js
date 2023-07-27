import styled from 'styled-components';
import { colorConvex, colorConcave } from '../../styles/colors';

const StyledButton = styled.button`
    font-family: 'DungGeunMo';
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize}` : 'font-size: 1.2rem;')};
    margin: 4px;
    border: 0px;
    background: #c0c0c0;
    ${(props) => props.width && `width: ${props.width}`};
    ${(props) => props.height && `height: ${props.height}`};
    box-shadow: ${colorConvex[0]};
    ${(props) => props.checked && `box-shadow: ${colorConcave[0]}; color: #808080;`}

    &:active {
        ${(props) => (props.disabled ? `` : `box-shadow: ${colorConcave[0]};`)};
    }

    &:disabled {
        color: #808080;
        box-shadow: ${colorConcave[0]};
    }
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
