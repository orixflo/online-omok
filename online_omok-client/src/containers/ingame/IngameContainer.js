import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../lib/api/socket';
import InGame from '../../components/ingame/InGame';
import { addMessage, changeInput, initChat, setEmoji } from '../../modules/chat';
import { changeScreen } from '../../modules/screen';
import { initSummary, initGame, setGame, setGameData } from '../../modules/game';
import { setHostData } from '../../modules/lobby';

const IngameContainer = () => {
    const { game, user, chat, summary } = useSelector(({ game, auth, chat }) => ({
        game: game.ingame,
        user: auth.auth,
        chat: chat,
        summary: game.summary,
    }));

    const dispatch = useDispatch();
    const [alertType, setAlertType] = useState('');
    const [swapForm, setSwapForm] = useState('');
    const [swapSender, setSwapSender] = useState();
    const [swapSenderName, setSwapSenderName] = useState('');
    const [animationtype, setAnimationtype] = useState('open');
    const [error, setError] = useState('');
    const [surrenderForm, setSurrenderForm] = useState('');

    const getPlayerPosition = (playerArr, myGuestCode) => {
        let position = 0;
        for (let i = 0; i < playerArr.length; i++) {
            if (playerArr[i].guestCode === myGuestCode) {
                position = i;
            }
        }
        return position;
    };

    useEffect(() => {
        socket.on('game_receiveMessage', (message) => {
            dispatch(addMessage(message));
        });
        socket.on('game_receiveGameData', (gameData) => {
            setSwapForm('');
            setSwapSender();
            setSwapSenderName('');

            const nextGameData = {
                ...gameData,
                position: getPlayerPosition(gameData.player, user.guestCode),
            };
            dispatch(setGame(nextGameData));
        });
        socket.on('game_receiveConvertedTile', (gameData) => {
            dispatch(setGameData({ form: 'ingame', key: 'tileStr', value: gameData.convertedTile }));
            dispatch(setGameData({ form: 'ingame', key: 'turn', value: gameData.turn }));
            dispatch(setGameData({ form: 'summary', key: 'tile', value: gameData.convertedTile }));
        });
        socket.on('game_receiveChangedPlayerArr', (playerArr) => {
            dispatch(setGameData({ form: 'ingame', key: 'player', value: playerArr }));
        });
        socket.on('game_receiveRoomState', (roomState) => {
            dispatch(setGameData({ form: 'ingame', key: 'roomState', value: roomState }));
        });
        socket.on('game_receiveGameSummary', (summary) => {
            dispatch(setGameData({ form: 'summary', key: 'winnerArr', value: summary.arr }));
        });
        socket.on('game_closeRoom', () => {
            setAlertType('closeRoom');
        });
        socket.on('game_receiveEmoji', (emoji) => {
            dispatch(setEmoji({ position: emoji.position, emoji: '-' }));
            setTimeout(() => {
                dispatch(setEmoji({ position: emoji.position, emoji: emoji.emoji }));
            }, 10);
        });
        return () => {
            socket.off('game_receiveMessage');
            socket.off('game_receiveGameData');
            socket.off('game_receiveConvertedTile');
            socket.off('game_receiveChangedPlayerArr');
            socket.off('game_receiveRoomState');
            socket.off('game_receiveGameSummary');
            socket.off('game_closeRoom');
            socket.off('game_receiveEmoji');
        };
    }, []);

    useEffect(() => {
        socket.on('game_receiveSwapRequest', (swapData) => {
            dispatch(setGameData({ form: 'ingame', key: 'player', value: swapData.playerArr }));
            if (game.position === swapData.recipient) {
                setSwapForm('responseForm');
                setSwapSender(swapData.sender);
                setSwapSenderName(swapData.senderName);
            }
        });
        socket.on('game_acceptSwap', (swapData) => {
            setSwapForm('');
            setSwapSender();
            setSwapSenderName('');
            if (game.position === swapData.sender) {
                dispatch(setGameData({ form: 'ingame', key: 'position', value: swapData.recipient }));
            } else if (game.position === swapData.recipient) {
                dispatch(setGameData({ form: 'ingame', key: 'position', value: swapData.sender }));
            }
            dispatch(setEmoji({ position: swapData.sender, emoji: '-' }));
            dispatch(setEmoji({ position: swapData.recipient, emoji: '-' }));
            dispatch(setGame(swapData.roomData));
        });
        socket.on('game_rejectSwap', (roomData) => {
            setSwapForm('');
            setSwapSender('');
            dispatch(setGame(roomData));
        });

        return () => {
            socket.off('game_receiveSwapRequest');
            socket.off('game_acceptSwap');
            socket.off('game_rejectSwap');
        };
    }, [game]);

    const changePlayerState = () => {
        socket.emit('game_changeState', { roomCode: game.roomCode, guestCode: user.guestCode }, (error) => {
            setError(error);
            console.log(error);
        });
    };

    const placingStone = (objData) => {
        setAnimationtype('');
        socket.emit('game_placingStone', { roomCode: game.roomCode, objData: objData, guestCode: user.guestCode }, (error) => {
            if (error === 'ruleViolation') {
                setAnimationtype('error');
            } else if (error === 'conflict') {
                //
            } else {
                setError(error);
                console.log(error);
            }
        });
    };

    const changeChatInput = (e) => {
        dispatch(changeInput(e.target.value));
    };

    const closeSummary = () => {
        dispatch(initSummary());
    };

    const leaveRoom = () => {
        setAnimationtype('close');
        setTimeout(() => {
            dispatch(initSummary());
            dispatch(initGame());
            dispatch(changeScreen('lobby'));
            dispatch(initChat());
            dispatch(setHostData({ key: 'mode', value: 'option1' }));
            socket.emit('game_leaveGame', { roomCode: game.roomCode, guestCode: user.guestCode }, (error) => {
                setError(error);
                console.log(error);
            });
        }, 200);
    };

    const surrender = () => {
        socket.emit('game_surrender', { guestCode: user.guestCode, roomCode: game.roomCode }, (error) => {
            setError(error);
            console.log(error);
        });
        setSurrenderForm('');
    };

    const sendMessage = () => {
        socket.emit('game_sendMessage', { roomCode: game.roomCode, user: user, message: chat.input }, (error) => {
            setError(error);
            console.log(error);
        });
        dispatch(changeInput(''));
    };
    const sendEmoji = (emoji) => {
        socket.emit('game_sendEmoji', { roomCode: game.roomCode, position: game.position, emoji: emoji, guestCode: user.guestCode }, (error) => {
            setError(error);
            console.log(error);
        });
    };

    // swap player's position
    const requestSwap = (targetPosition) => {
        socket.emit(
            'game_requestSwap',
            { roomCode: game.roomCode, myPosition: game.position, targetPosition: targetPosition, guestCode: user.guestCode },
            (error) => {
                setError(error);
                console.log(error);
            },
        );
        setSwapForm('');
    };
    const responseSwap = (type) => {
        socket.emit(
            'game_responseSwap',
            { roomCode: game.roomCode, type: type, sender: swapSender, recipient: game.position, guestCode: user.guestCode },
            (error) => {
                setError(error);
                console.log(error);
            },
        );
    };

    const reload = () => {
        window.location.reload();
    };

    const ingameFn = {
        changeChatInput: changeChatInput,
        changePlayerState: changePlayerState,
        sendMessage: sendMessage,
        sendEmoji: sendEmoji,
        setSwapForm: setSwapForm,
        requestSwap: requestSwap,
        responseSwap: responseSwap,
        closeSummary: closeSummary,
        leaveRoom: leaveRoom,
        surrender: surrender,
        setAlertType: setAlertType,
        reload: reload,
        setSurrenderForm: setSurrenderForm,
    };

    return (
        <InGame
            game={game}
            placingStone={placingStone}
            changePlayerState={changePlayerState}
            summary={summary}
            swapForm={swapForm}
            swapSenderName={swapSenderName}
            chat={chat}
            ingameFn={ingameFn}
            alertType={alertType}
            animationtype={animationtype}
            error={error}
            surrenderForm={surrenderForm}
        />
    );
};

export default IngameContainer;
