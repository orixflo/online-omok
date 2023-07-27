import styled from 'styled-components';
import logoIconLarge from '../../asset/img/icon_01_large.png';
import logoIconSmall from '../../asset/img/icon_01_small.png';
import Button from './Button';
import DividerVertical from './DividerVertical';
import SpacerHorizontal from './SpacerHorizontal';
import { colorConvex, colorConcave } from '../../styles/colors';

const BackgroundWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #008080;
    font-family: 'DungGeunMo';
`;

const Taskbar = styled.div`
    height: 32px;
    margin-bottom: 6px;
    display: flex;
    background: #c0c0c0;
    box-shadow: ${colorConvex[1]};
`;

const Icon = styled.div`
    width: 50px;
    height: 50px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const Online5mokIcon = styled.img`
    ${(props) => (props.size === 'large' ? `width: 50px; height: 50px;` : `width: 20px; height: 20px;`)}
`;

const Text = styled.div`
    color: white;
    text-align: center;
`;

const ActivedButton = styled.div`
    margin: 5px;
    border: 0px;
    font-size: 1rem;
    display: flex;
    background: #e3e6e7;
    ${(props) => props.width && `width: ${props.width}`};
    box-shadow: ${colorConcave[0]};
`;

const Background = () => {
    return (
        <BackgroundWrapper>
            <Icon>
                <Online5mokIcon size={'large'} src={logoIconLarge} />
                <Text>온라인 오목</Text>
            </Icon>
            <Taskbar>
                <Button fontSize={'1rem'}>@ 시작</Button>
                <SpacerHorizontal width={'5px'} />
                <DividerVertical height={'28px'} />
                <SpacerHorizontal width={'5px'} />
                <ActivedButton>
                    <SpacerHorizontal width={'5px'} />
                    <Online5mokIcon src={logoIconSmall} />
                    <SpacerHorizontal width={'5px'} />
                    온라인 오목
                </ActivedButton>
            </Taskbar>
        </BackgroundWrapper>
    );
};

export default Background;
