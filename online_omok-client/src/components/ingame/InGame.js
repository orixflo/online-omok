import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import PlayerPanel from './PlayerPanel';
import CheckerBoard from './CheckerBoard';
import { colorConvex } from '../../styles/colors';
import { useEffect, useState } from 'react';
import ReceiveChat from '../lobby/ReceiveChat';
import SendChat from '../lobby/SendChat';
import GameSummary from './GameSummary';
import Alert from '../common/Alert';
import RequestSwapForm from './RequestSwapForm';

const InGameWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 60vw;
    min-width: 1154px;
    height: 70vh;
    min-height: 540px;

    @media (max-width: 768px) {
        width: 90vw;
        min-width: 0;
        height: 88vh;
    }
`;

const CheckerBoardArea = styled.div`
    width: calc(70vh - 57px);
    height: calc(70vh - 57px);
    min-width: 486px;
    min-height: 486px;
    background: #c0c0c0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 3px;
    box-shadow: ${colorConvex[1]};

    @media (max-width: 768px) {
        width: 90vw;
        height: 90vw;
        min-width: 0;
        min-height: 0;
        top: 50%;
    }
`;

const InGameChat = styled.div`
    margin: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 16px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PlayerPanelBoxTop = styled.div`
    width: 100%;
    height: 50%;
    background: #c0c0c0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const PlayerPanelBoxBottom = styled.div`
    width: 100%;
    height: 50%;
    background: #c0c0c0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-end;
`;

const Content = styled.div`
    width: calc(100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const InGame = ({ game, chat, placingStone, summary, ingameFn, swapForm, swapSenderName, alertType, animationtype, error, surrenderForm }) => {
    const [panel, setPanel] = useState({ topPanel: '', bottomPanel: '' });
    const [emoji, setEmoji] = useState([]);
    const [playerSlot, setPlayerSlot] = useState([
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
        { name: '---', active: 'true' },
    ]);

    useEffect(() => {
        if (game.position === 0 || game.position === 2) {
            setPanel({ topPanel: 'white', bottomPanel: 'black' });
        } else {
            setPanel({ topPanel: 'black', bottomPanel: 'white' });
        }
    }, [game]);

    useEffect(() => {
        const newArr = [];
        let pointer = game.position;
        for (let i = 0; i < game.player.length; i++) {
            if (game.roomState === 'ingame') {
                newArr.push({
                    name: game.player[pointer].nickname,
                    active: game.player[pointer].guestCode === game.player[game.turn].guestCode ? 'true' : 'false',
                });
            } else {
                newArr.push({ name: game.player[pointer].nickname, active: game.player[pointer].state === 'ready' ? 'true' : 'false' });
            }
            pointer += 1;
            if (pointer > game.player.length - 1) pointer = 0;
        }
        if (newArr.length < game.maxPlayer) {
            for (let i = newArr.length; i < game.maxPlayer; i++) {
                newArr.push({ name: '---', active: 'false' });
            }
        }
        setPlayerSlot(newArr);
    }, [game]);

    useEffect(() => {
        const newArr = [];
        let pointer = game.position;
        for (let i = 0; i < game.player.length; i++) {
            newArr.push(chat.emojiArr[pointer]);
            pointer += 1;
            if (pointer > game.player.length - 1) pointer = 0;
        }
        if (newArr.length < game.maxPlayer) {
            for (let i = newArr.length; i < game.maxPlayer; i++) {
                newArr.push('-');
            }
        }
        setEmoji(newArr);
    }, [chat.emojiArr]);

    return (
        <InGameWrapper>
            {error === 'disconnected' && <Alert text={'접속이 종료됬습니다.'} type={'alert'} confirm={ingameFn.reload} />}
            {alertType === 'closeRoom' && <Alert text={'호스트가 게임을 종료했습니다.'} type={'alert'} confirm={ingameFn.leaveRoom} />}
            {swapForm === 'requestForm' && <RequestSwapForm game={game} ingameFn={ingameFn} />}
            {swapForm === 'responseForm' && (
                <Alert
                    text={`${swapSenderName} 님 과 자리를 교체하시겠습니까?`}
                    type={'confirm'}
                    confirm={() => ingameFn.responseSwap('accept')}
                    cancel={() => ingameFn.responseSwap('reject')}
                />
            )}
            {summary.winnerArr.length > 0 && (
                <GameSummary winnerPosArr={summary.winnerArr} myPos={game.position} tile={summary.tile} closeSummary={ingameFn.closeSummary} />
            )}
            {surrenderForm === 'surrenderForm' && <Alert text={'기권 하시겠습니까?'} type={'confirm'} confirm={ingameFn.surrender} cancel={() => ingameFn.setSurrenderForm('')} />}
            {alertType === 'leaveRoom' && (
                <Alert text={'방을 나가시겠습니까?'} type={'confirm'} confirm={ingameFn.leaveRoom} cancel={() => ingameFn.setAlertType('')} />
            )}
            <WindowForm close={() => ingameFn.setAlertType('leaveRoom')} animationtype={animationtype}>
                <Content>
                    {game.maxPlayer === 2 && (
                        <>
                            <PlayerPanelBoxTop>
                                <PlayerPanel color={panel.topPanel} type={'other'} playerSlot={playerSlot[1]} emoji={emoji[1]} />
                            </PlayerPanelBoxTop>
                            <PlayerPanelBoxBottom>
                                <PlayerPanel
                                    color={panel.bottomPanel}
                                    type={'player'}
                                    playerSlot={playerSlot[0]}
                                    roomState={game.roomState}
                                    ingameFn={ingameFn}
                                    emoji={emoji[0]}
                                    swapBtn={game.roomState === 'ingame' ? true : false}
                                />
                            </PlayerPanelBoxBottom>
                        </>
                    )}
                    {game.maxPlayer === 4 && (
                        <>
                            <PlayerPanelBoxTop>
                                <PlayerPanel color={panel.topPanel} type={'other'} playerSlot={playerSlot[1]} emoji={emoji[1]} />
                                <PlayerPanel color={panel.topPanel} type={'otherR'} playerSlot={playerSlot[3]} emoji={emoji[3]} />
                            </PlayerPanelBoxTop>
                            <PlayerPanelBoxBottom>
                                <PlayerPanel
                                    color={panel.bottomPanel}
                                    type={'player'}
                                    playerSlot={playerSlot[0]}
                                    roomState={game.roomState}
                                    ingameFn={ingameFn}
                                    emoji={emoji[0]}
                                    swapBtn={game.roomState === 'ingame' ? true : false}
                                />
                                <PlayerPanel color={panel.bottomPanel} type={'team'} playerSlot={playerSlot[2]} emoji={emoji[2]} />
                            </PlayerPanelBoxBottom>
                        </>
                    )}
                    <CheckerBoardArea>
                        {game.roomState === 'ingame' ? (
                            <CheckerBoard placingStone={placingStone} tile={game.tileStr} turn={playerSlot[0].active} position={game.position} />
                        ) : (
                            <InGameChat>
                                <ReceiveChat chatArr={chat.chatArr} />
                                <SendChat onChange={ingameFn.changeChatInput} sendMessage={ingameFn.sendMessage} value={chat.input} />
                            </InGameChat>
                        )}
                    </CheckerBoardArea>
                </Content>
            </WindowForm>
        </InGameWrapper>
    );
};

export default InGame;
