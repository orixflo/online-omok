import styled from 'styled-components';
import { useState } from 'react';
import WindowForm from '../common/WindowForm';
import Button from '../common/Button';
import { colorConcave, colorConvex } from '../../styles/colors';

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
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PlayerBox = styled.div`
    margin: 10px;
    display: flex;
    height: 40px;
    width: 270px;
    justify-content: center;
    align-items: center;
    box-shadow: ${colorConvex[0]};
    font-size: 1.2rem;
`;
const Plyaer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    width: 150px;
    height: 24px;
    ${(props) => (props.team === 0 ? `background: #000000` : `background: #ffffff`)};
    ${(props) => (props.team === 0 ? `color: #ffffff` : `color: #000000`)};
    box-shadow: ${colorConcave[0]};
`;
const Position = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    width: 30px;
    height: 24px;
    box-shadow: ${colorConcave[0]};
`;

const RequestSwapForm = ({ game, ingameFn }) => {
    const [visible, SetVisible] = useState('true');

    const requestSwapBox = [];
    for (let i = 0; i < game.player.length; i++) {
        if (game.position === i) {
            requestSwapBox.push(
                <PlayerBox key={i}>
                    <Position pos={i}>{i}</Position>
                    <Plyaer team={i % 2}>{game.player[i].nickname}</Plyaer>
                    <Button onClick={() => ingameFn.requestSwap(i)} disabled={true}>
                        교체
                    </Button>
                </PlayerBox>,
            );
        } else {
            const active = game.player[i].swap === 'true' ? true : false;
            requestSwapBox.push(
                <PlayerBox key={i}>
                    <Position pos={i}>{i}</Position>
                    <Plyaer team={i % 2}>{game.player[i].nickname}</Plyaer>
                    <Button onClick={() => ingameFn.requestSwap(i)} disabled={active}>
                        교체
                    </Button>
                </PlayerBox>,
            );
        }
    }

    const handleClick = () => {
        ingameFn.setSwapForm('');
        SetVisible('false');
    };

    return (
        <EmptySpace visible={visible}>
            <ModalForm>
                <WindowForm title={'자리 바꾸기'}>
                    <Content>
                        {requestSwapBox}
                        <ButtonBox>
                            <Button fontSize={'1.4rem'} onClick={handleClick}>
                                닫기
                            </Button>
                        </ButtonBox>
                    </Content>
                </WindowForm>
            </ModalForm>
        </EmptySpace>
    );
};

export default RequestSwapForm;
