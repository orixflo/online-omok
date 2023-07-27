import styled from 'styled-components';
import { colorConcave } from '../../styles/colors';

export const StyledInput = styled.input`
    font-family: 'DungGeunMo';
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize}` : `font-size: 1.4rem;`)};
    border: 0px;
    margin: 4px;
    ${(props) => props.width && `width: ${props.width}`};
    ${(props) => props.height && `height: ${props.height}`};
    box-shadow: ${colorConcave[0]};

    &:focus {
        outline: 0;
    }
`;

const Input = (props) => <StyledInput {...props} />;

export default Input;
