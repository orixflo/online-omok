import styled, { css, keyframes } from 'styled-components';
import Button from './Button';
import logoIcon from '../../asset/img/icon_01_small.png';
import { colorConvex } from '../../styles/colors';

const animationClose = keyframes`
    0%  { transform: scale(1, 1); }
    50%  { transform: scale(1, 0.2); }
    100%  { transform: scale(0, 0); }
`;
const animationOpen = keyframes`
    0%  { transform: scale(0, 0); }
    50%  { transform: scale(1, 0.2); }
    100%  { transform: scale(1, 1); }
`;
const animationError = keyframes`
    from { transform: translateX(-5px); }
    to { transform: translateX(5px); }
`;

const WindowFormWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #c0c0c0;
    box-shadow: ${colorConvex[1]};

    ${(props) =>
        props.animationtype === 'close' &&
        css`
            animation: ${animationClose} 0.2s 1 forwards;
        `};
    ${(props) =>
        props.animationtype === 'open' &&
        css`
            animation: ${animationOpen} 0.2s 1 forwards;
        `};
    ${(props) =>
        props.animationtype === 'error' &&
        css`
            animation: ${animationError} 0.1s 3;
        `};
`;

const WindowFormHeader = styled.div`
    height: 40px;
    color: white;
    font-size: 1.2rem;
    background: linear-gradient(to right, #000181 40%, #1084d0);
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
    width: ${(props) => (props.size ? `${props.size}` : '10px')};
`;

const WindowForm = ({ title, close, children, animationtype }) => {
    return (
        <WindowFormWrapper animationtype={animationtype}>
            <WindowFormHeader>
                <WindowFormHeaderTitle>
                    <Online5mokIcon src={logoIcon} />
                    <SpacerHorizontal />
                    {title}
                </WindowFormHeaderTitle>
                <WindowFormHeaderButton>{close ? <Button onClick={close}>×</Button> : ''}</WindowFormHeaderButton>
            </WindowFormHeader>
            <WindowFormContent>{children}</WindowFormContent>
        </WindowFormWrapper>
    );
};

export default WindowForm;
