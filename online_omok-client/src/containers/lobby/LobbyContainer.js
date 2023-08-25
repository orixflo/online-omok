import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../lib/api/socket';
import Lobby from '../../components/lobby/Lobby';
import RoomList from '../../components/lobby/RoomList';
import ReceiveChat from '../../components/lobby/ReceiveChat';
import SendChat from '../../components/lobby/SendChat';
import { addMessage, initChat } from '../../modules/chat';
import { changeInput } from '../../modules/chat';
import { changeScreen } from '../../modules/screen';
import { setHostData, setRoomList } from '../../modules/lobby';
import { setGame } from '../../modules/game';

const LobbyContainer = () => {
    const { user, chat, lobby } = useSelector(({ auth, chat, lobby }) => ({
        user: auth.auth,
        chat: chat,
        lobby: lobby,
    }));
    const dispatch = useDispatch();
    const [animationtype, setAnimationtype] = useState('open');
    const [userNum, setUserNum] = useState(0);
    const [err, setErr] = useState();

    useEffect(() => {
        socket.emit('lobby_join', { user: { guestCode: user.guestCode, nickname: user.nickname }, room: 'lobby' }, (error) => {
            if (error) {
                setErr(error);
                console.log(error);
            }
            dispatch(setHostData({ key: 'hostCode', value: user.guestCode }));
            dispatch(setHostData({ key: 'roomCode', value: `room${user.guestCode}` }));
        });
    }, []);

    useEffect(() => {
        socket.on('lobby_receiveMessage', (message) => {
            dispatch(addMessage(message));
        });
        socket.on('lobby_receiveUserNum', (userNum) => {
            if (userNum !== Number(userNum.userNum)) {
                setUserNum(Number(userNum.userNum));
            }
        });
        socket.on('lobby_receiveGameData', (gameData) => {
            dispatch(initChat());
            dispatch(setGame(gameData));
            setAnimationtype('close');
            setTimeout(() => {
                dispatch(changeScreen('ingame'));
            }, 200);
        });
        socket.on('lobby_receiveGameList', (roomList) => {
            dispatch(setRoomList(roomList));
        });

        return () => {
            socket.off('lobby_receiveMessage');
            socket.off('lobby_receiveUserNum');
            socket.off('lobby_receiveGameData');
            socket.off('lobby_receiveGameList');
        };
    }, []);

    const onChange = useCallback((e) => {
        dispatch(changeInput(e.target.value));
    }, []);

    const sendMessage = useCallback(() => {
        socket.emit('lobby_sendMessage', { user: user, message: chat.input }, (error) => {
            if (error) {
                setErr(error);
                console.log(error);
            }
        });
        dispatch(changeInput(''));
    }, []);

    const changeOpiont = (value) => {
        dispatch(setHostData({ key: 'mode', value: value }));
    };

    const createGameRoom = () => {
        socket.emit('lobby_createRoom', { hostCode: user.guestCode, option: lobby.room.mode }, (error) => {
            if (error) {
                setErr(error);
                console.log(error);
            }
        });
    };

    const joinRoom = (code) => {
        socket.emit('lobby_joinRoom', { user: { guestCode: user.guestCode, nickname: user.nickname }, roomCode: code }, (error) => {
            if (error) {
                setErr(error);
                console.log(error);
            }
        });
    };

    const reload = () => {
        window.location.reload();
    }

    return (
        <Lobby
            userNum={userNum}
            changeOpiont={changeOpiont}
            createGameRoom={createGameRoom}
            roomList={<RoomList roomListArr={lobby.list} joinRoom={joinRoom} />}
            animationtype={animationtype}
            error={err}
            reload={reload}
        >
            <ReceiveChat chatArr={chat.chatArr} />
            <SendChat sendMessage={sendMessage} onChange={onChange} value={chat.input} />
        </Lobby>
    );
};

export default LobbyContainer;
