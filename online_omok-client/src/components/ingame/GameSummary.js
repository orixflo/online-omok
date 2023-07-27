import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import stoneBlack from '../../asset/img/stone_black.png';
import stoneWhite from '../../asset/img/stone_white.png';
import CheckerBoard from './CheckerBoard';
import { colorConcave } from '../../styles/colors';

const EmptySpace = styled.div`
    font-family: 'DungGeunMo';
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.539);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    visibility: ${(props) => (props.visible === 'true' ? 'visible' : 'hidden')};
`;

const ModalForm = styled.div`
    position: absolute;
    width: 460px;
    height: 580px;

    @media (max-width: 768px) {
        width: 90vw;
        min-width: 350px;
        height: 75vh;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WinnerBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImgWinnerStone = styled.img`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    height: 60px;
    image-rendering: pixelated;
`;

const Text = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 2rem;
    ${(props) => props.result === 'lose' && `color: red`};
`;

const CheckerBoardArea = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 400px;
    height: 400px;
    box-shadow: ${colorConcave[0]};

    @media (max-width: 768px) {
        width: 85vw;
        height: 85vw;
    }
`;

const GameSummary = ({ winnerPosArr, myPos, tile, closeSummary }) => {
    const [visible, SetVisible] = useState('true');
    const [team, setTeam] = useState(0);
    const [win, setWin] = useState('');
    const onClick = () => {
        SetVisible('false');
        closeSummary();
    };

    useEffect(() => {
        for (let i = 0; i < winnerPosArr.length; i++) {
            if (winnerPosArr[i] === myPos) {
                setWin('true');
            }
        }
        setTeam(myPos % 2);
    }, []);

    const emptyFunc = () => {};

    return (
        <EmptySpace visible={visible}>
            <ModalForm>
                <WindowForm>
                    <Content>
                        {win === 'true' ? (
                            team === 0 ? (
                                <WinnerBox>
                                    <ImgWinnerStone src={stoneBlack} />
                                    <Text>흑돌 승리!</Text>
                                </WinnerBox>
                            ) : (
                                <WinnerBox>
                                    <ImgWinnerStone src={stoneWhite} />
                                    <Text>백돌 승리!</Text>
                                </WinnerBox>
                            )
                        ) : team === 0 ? (
                            <WinnerBox>
                                <ImgWinnerStone src={stoneBlack} />
                                <Text result={'lose'}>흑돌 패배!</Text>
                            </WinnerBox>
                        ) : (
                            <WinnerBox>
                                <ImgWinnerStone src={stoneWhite} />
                                <Text result={'lose'}>백돌 패배!</Text>
                            </WinnerBox>
                        )}
                        <CheckerBoardArea>
                            <CheckerBoard tile={tile} placingStone={emptyFunc} />
                        </CheckerBoardArea>
                        <Button fontSize={'1.4rem'} onClick={onClick}>
                            확인
                        </Button>
                    </Content>
                </WindowForm>
            </ModalForm>
        </EmptySpace>
    );
};

export default GameSummary;
