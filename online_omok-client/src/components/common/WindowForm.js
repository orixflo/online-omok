import styled from 'styled-components';
import Button from './Button';
import logoIcon from '../../asset/img/icon_01_small.png'
import { colorConvex } from '../../styles/colors';

const WindowFormWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #C0C0C0;
    box-shadow: ${colorConvex[1]};
`;

const WindowFormHeader = styled.div`
    height: 40px;
    color: white;
    font-size: 1.2rem;
    background: linear-gradient(to right, #000181 40%, #1084D0);
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const WindowFormHeaderTitle = styled.div`
    display: flex;
    align-items: center;
`;

const WindowFormHeaderButton = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`;

const WindowFormContent = styled.div`
    width: calc(100% - 12px);
    height: calc(100% - 52px);
    margin: 6px;
    display: flex;
    justify-content: center;
`;

const Online5mokIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const SpacerHorizontal = styled.div`
    width: ${props => props.size ? `${props.size}` : '10px'};
`;

const WindowForm = ({title, close, children}) => {
    return (
        <WindowFormWrapper>
            <WindowFormHeader>
                <WindowFormHeaderTitle>
                    <Online5mokIcon src={logoIcon} />
                    <SpacerHorizontal />
                    {title}
                </WindowFormHeaderTitle>
                <WindowFormHeaderButton>
                    {close ? <Button>×</Button> : <Button disabled={true}>×</Button>}
                </WindowFormHeaderButton>
            </WindowFormHeader>
            <WindowFormContent>{children}</WindowFormContent>
        </WindowFormWrapper>
    )
}

export default WindowForm;