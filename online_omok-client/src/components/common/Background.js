import styled from "styled-components"
import logoIconLarge from '../../asset/img/icon_01_large.png'
import logoIconSmall from '../../asset/img/icon_01_small.png'
import Button from "./Button";
import DividerVertical from "./DividerVertical";
import SpacerHorizontal from "./SpacerHorizontal";

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
    background: #C0C0C0;
    box-shadow:
        // Internal frame
        -3px -3px #FFFFFF,
        -3px 0px #FFFFFF,
        0px -3px #FFFFFF,
        3px 3px #808080,
        3px -3px #808080,
        -3px 3px #808080,
        // External frame
        -6px -6px #DFDFDF,
        -6px 3px #DFDFDF,
        3px -6px #DFDFDF,
        6px 6px #000000,
        6px -6px #000000,
        -6px 6px #000000;
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
    ${props => props.size === 'large' ?
        `
        width: 50px;
        height: 50px;
        ` :
        `
        width: 20px;
        height: 20px;
        `
    }
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
    background: #E3E6E7;
    ${(props) => props.width ? `width: ${props.width}` : ''};
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