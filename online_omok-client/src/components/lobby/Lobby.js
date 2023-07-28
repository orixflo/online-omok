import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import Tab from '../common/Tab';
import TabButton from '../common/TabButton';
import { useState } from 'react';
import CreateGameRoom from './CreateGameRoom';
import Alert from '../common/Alert';

const LobbyWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 768px;
    height: 80vh;
    max-height: 768px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 90vw;
        min-width: 350px;
        height: 80vh;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 350px;
        height: 100%;
    }
`;

const TabBox = styled.div`
    width: 90%;
    height: calc(70% - 20px);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
        height: calc(50% - 20px);
    }
`;

const TabMenuButton = styled.div`
    position: relative;
    top: auto;
    bottom: auto;
`;

const ChatBox = styled.div`
    width: 90%;
    height: calc(30% - 24px);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
        height: calc(50% - 24px);
    }
`;

const CreateRoom = styled.div`
    background: red;
`;

const Lobby = ({ userNum, children, changeOpiont, createGameRoom, roomList, animationtype, error, reload }) => {
    const [btn, setBtn] = useState({
        lobby: true,
        createRoom: false,
    });

    const btnClick = (btnName) => {
        setBtn({
            lobby: false,
            createRoom: false,
        });
        setBtn({
            [btnName]: true,
        });
    };

    return (
        <LobbyWrapper>
            {error === 'disconnected' && <Alert text={'접속이 종료됬습니다.'} type={'alert'} confirm={reload} />}
            <WindowForm title={`${userNum}명 접속중`} animationtype={animationtype}>
                <Content>
                    <TabBox>
                        <TabMenuButton>
                            <TabButton
                                activated={String(btn.lobby)}
                                onClick={() => {
                                    btnClick('lobby');
                                }}
                            >
                                대기실
                            </TabButton>
                            <TabButton
                                activated={String(btn.createRoom)}
                                onClick={() => {
                                    btnClick('createRoom');
                                }}
                            >
                                방만들기
                            </TabButton>
                        </TabMenuButton>
                        <Tab>
                            {btn.lobby && roomList}
                            {btn.createRoom && <CreateGameRoom changeOpiont={changeOpiont} createGameRoom={createGameRoom} />}
                        </Tab>
                    </TabBox>
                    <CreateRoom></CreateRoom>
                    <ChatBox>{children}</ChatBox>
                </Content>
            </WindowForm>
        </LobbyWrapper>
    );
};

export default Lobby;
