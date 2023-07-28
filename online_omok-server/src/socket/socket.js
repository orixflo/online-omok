const Koa = require('koa');
const SocketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const checkConflict = require('../lib/ingame/checkConflict');
const convertTileToString = require('../lib/ingame/convertTileToString');
const checkRuleViolation = require('../lib/ingame/checkRuleViolation');
const checkGameEnd = require('../lib/ingame/checkGameEnd');
const updateArray = require('../lib/updateArray');

const options = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
};

const app = new Koa();
const socketServer = http.createServer(app);
const io = SocketIO(socketServer, options);

const roomDataMap = new Map();

const convertMapToArray = (map) => {
    const arr = new Array();
    for (let roomCode of map.keys()) {
        arr.push({
            host: map.get(roomCode).host,
            option: map.get(roomCode).mode,
            currentPlayer: map.get(roomCode).player.length,
            maxPlayer: map.get(roomCode).maxPlayer,
            roomState: map.get(roomCode).roomState,
        });
    }
    return arr;
};

app.use(cors());

io.on('connection', (socket) => {
    // # lobby - join lobby
    socket.on('lobby_join', ({ user, room }, callback) => {
        try {
            if (userDataMap.has(user.guestCode) === false) {
                callback('disconnected');
                return;
            }
            socket.join(room);

            io.to('lobby').emit('lobby_receiveMessage', {
                type: 'system',
                text: `${user.nickname}(${user.guestCode}) 님 이 로비에 입장했습니다.`,
            });
            io.to('lobby').emit('lobby_receiveUserNum', { userNum: userDataMap.size });
            io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            userDataMap.set(user.guestCode, {
                ...userDataMap.get(user.guestCode),
                room: 'lobby',
                socketId: socket.id,
                swap: 'false',
            });
        } catch (e) {
            console.log('socket.lobby_join ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # lobby - send message
    socket.on('lobby_sendMessage', ({ user, message }, callback) => {
        try {
            if (userDataMap.has(user.guestCode) === false) {
                callback('disconnected');
                return;
            }
            io.to('lobby').emit('lobby_receiveMessage', {
                type: 'user',
                text: `${user.nickname} : ${message}`,
            });
        } catch (e) {
            console.log('socket.lobby_sendMessage ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # lobby - create room
    socket.on('lobby_createRoom', ({ hostCode, option }, callback) => {
        try {
            if (userDataMap.has(hostCode) === false) {
                callback('disconnected');
                return;
            }
            userDataMap.set(hostCode, {
                ...userDataMap.get(hostCode),
                room: `room${hostCode}`,
            });
            let maxPlayerNum = 2;
            if (option === 'option2') maxPlayerNum = 4;
            roomDataMap.set(`room${hostCode}`, {
                host: { guestCode: hostCode, nickname: userDataMap.get(hostCode).nickname },
                mode: option,
                roomState: 'waiting',
                player: [
                    {
                        guestCode: hostCode,
                        nickname: userDataMap.get(hostCode).nickname,
                        state: 'waiting',
                    },
                ],
                maxPlayer: maxPlayerNum,
                turn: 0,
                tile: [],
                tileStr: convertTileToString([]),
            });
            io.to(socket.id).emit('lobby_receiveGameData', {
                roomCode: `room${hostCode}`,
                position: roomDataMap.get(`room${hostCode}`).player.length - 1,
                ...roomDataMap.get(`room${hostCode}`),
            });
            io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            socket.leave('lobby');
            socket.join(`room${hostCode}`);
            io.to(`room${hostCode}`).emit('game_receiveMessage', {
                type: 'system',
                text: `${userDataMap.get(hostCode).nickname} 님이 게임을 생성했습니다.`,
            });
        } catch (e) {
            console.log('socket.lobby_createRoom ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # lobby - join room
    socket.on('lobby_joinRoom', ({ user, roomCode }, callback) => {
        try {
            if (userDataMap.has(user.guestCode) === false) {
                callback('disconnected');
                return;
            }
            if (roomDataMap.get(roomCode).maxPlayer <= roomDataMap.get(roomCode).player.length) return;
            userDataMap.set(user.guestCode, {
                ...userDataMap.get(user.guestCode),
                room: roomCode,
            });
            roomDataMap.set(roomCode, {
                ...roomDataMap.get(roomCode),
                player: [
                    ...roomDataMap.get(roomCode).player,
                    {
                        guestCode: user.guestCode,
                        nickname: user.nickname,
                        state: 'waiting',
                    },
                ],
            });
            // to user joining that room now
            io.to(socket.id).emit('lobby_receiveGameData', {
                roomCode: roomCode,
                position: roomDataMap.get(roomCode).player.length - 1,
                ...roomDataMap.get(roomCode),
            });
            // to users in the room
            io.to(roomCode).emit('game_receiveGameData', {
                roomCode: roomCode,
                ...roomDataMap.get(roomCode),
            });
            io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            socket.leave('lobby');
            socket.join(roomCode);
            io.to(roomCode).emit('game_receiveMessage', {
                type: 'system',
                text: `${user.nickname} 님이 게임에 입장했습니다.`,
            });
        } catch (e) {
            console.log('socket.lobby_joinRoom ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - change player's state (ready, waiting)
    socket.on('game_changeState', ({ roomCode, guestCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            const nextPlayerArr = roomDataMap.get(roomCode).player;
            nextPlayerArr.map((arr) => {
                if (arr.guestCode === guestCode) {
                    if (arr.state === 'waiting') arr.state = 'ready';
                    else arr.state = 'waiting';
                }
            });
            roomDataMap.set(roomCode, {
                ...roomDataMap.get(roomCode),
                player: nextPlayerArr,
            });
            io.to(roomCode).emit('game_receiveChangedPlayerArr', roomDataMap.get(roomCode).player);
            // if all players are ready, start game.
            let readyCount = 0;
            for (let i = 0; i < roomDataMap.get(roomCode).player.length; i++) {
                if (roomDataMap.get(roomCode).player[i].state === 'ready') readyCount += 1;
            }
            if (roomDataMap.get(roomCode).maxPlayer === readyCount) {
                roomDataMap.set(roomCode, {
                    ...roomDataMap.get(roomCode),
                    roomState: 'ingame',
                });
                io.to(roomCode).emit('game_receiveRoomState', roomDataMap.get(roomCode).roomState);
                io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            }
        } catch (e) {
            console.log('socket.game_changeState ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - placing stone
    socket.on('game_placingStone', (objData, callback) => {
        try {
            if (userDataMap.has(objData.guestCode) === false) {
                callback('disconnected');
                return;
            }
            if (checkConflict(roomDataMap.get(objData.roomCode).tile, objData.objData)) {
                callback('conflict');
            } else if (checkRuleViolation(roomDataMap.get(objData.roomCode).tile, objData.objData)) {
                callback('ruleViolation');
            } else {
                let turn = roomDataMap.get(objData.roomCode).turn + 1;
                if (roomDataMap.get(objData.roomCode).maxPlayer <= turn) turn = 0;
                roomDataMap.set(objData.roomCode, {
                    ...roomDataMap.get(objData.roomCode),
                    turn: turn,
                    tile: [...roomDataMap.get(objData.roomCode).tile, objData.objData],
                });
                const convertedTile = convertTileToString(roomDataMap.get(objData.roomCode).tile);
                io.to(objData.roomCode).emit('game_receiveConvertedTile', {
                    convertedTile: convertedTile,
                    turn: turn,
                });
                callback('');
            }
            // if game end
            if (checkGameEnd(roomDataMap.get(objData.roomCode).tile, objData.objData)) {
                const winnerPosArr = new Array();
                if (objData.objData.split(',')[2] === 'B') {
                    winnerPosArr.push(0);
                    winnerPosArr.push(2);
                } else {
                    winnerPosArr.push(1);
                    winnerPosArr.push(3);
                }
                io.to(objData.roomCode).emit('game_receiveGameSummary', { arr: winnerPosArr });
                // init room data
                const nextPlayerArr = roomDataMap.get(objData.roomCode).player;
                nextPlayerArr.map((arr) => {
                    arr.state = 'waiting';
                });
                roomDataMap.set(objData.roomCode, {
                    ...roomDataMap.get(objData.roomCode),
                    roomState: 'waiting',
                    player: nextPlayerArr,
                    turn: 0,
                    tile: [],
                    tileStr: convertTileToString([]),
                });
                io.to(objData.roomCode).emit('game_receiveGameData', roomDataMap.get(objData.roomCode));
                io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            }
        } catch (e) {
            console.log('socket.game_placingStone ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - leave game
    socket.on('game_leaveGame', ({ guestCode, roomCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            if (roomDataMap.has(roomCode)) {
                // in case of user is host, kick all player in room and remove room
                if (roomDataMap.get(roomCode).host.guestCode === guestCode) {
                    io.to(roomCode).emit('game_closeRoom');
                    roomDataMap.delete(roomCode);
                    io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
                } else {
                    // in case of user is guest, delete user from player array
                    const playerArr = roomDataMap.get(roomCode).player;
                    playerArr.map((arr) => {
                        arr.state = 'waiting';
                        arr.swap = 'false';
                    });
                    const nextPlayerArr = playerArr.filter((arr) => {
                        return arr.guestCode !== guestCode;
                    });
                    roomDataMap.set(roomCode, {
                        ...roomDataMap.get(roomCode),
                        roomState: 'waiting',
                        player: nextPlayerArr,
                        turn: 0,
                        tile: [],
                        tileStr: convertTileToString([]),
                    });
                    io.to(roomCode).emit('game_receiveGameData', roomDataMap.get(roomCode));
                    io.to(roomCode).emit('game_receiveMessage', {
                        type: 'system',
                        text: `${userDataMap.get(guestCode).nickname} 님이 게임을 종료했습니다.`,
                    });
                    io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
                }
            }
            userDataMap.set(guestCode, {
                ...userDataMap.get(guestCode),
                room: 'lobby',
            });
            socket.leave(roomCode);
        } catch (e) {
            console.log('socket.game_leaveGame ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - send message at room
    socket.on('game_sendMessage', ({ roomCode, user, message }, callback) => {
        try {
            if (userDataMap.has(user.guestCode) === false) {
                callback('disconnected');
                return;
            }
            io.to(roomCode).emit('game_receiveMessage', {
                type: 'user',
                text: `${user.nickname} : ${message}`,
            });
        } catch (e) {
            console.log('socket.game_sendMessage ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - surrender
    socket.on('game_surrender', ({ guestCode, roomCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            const nextPlayerArr = roomDataMap.get(roomCode).player;
            nextPlayerArr.map((arr) => {
                arr.state = 'waiting';
            });
            roomDataMap.set(roomCode, {
                ...roomDataMap.get(roomCode),
                roomState: 'waiting',
                player: nextPlayerArr,
                turn: 0,
                tile: [],
                tileStr: convertTileToString([]),
            });
            io.to(roomCode).emit('game_receiveGameData', roomDataMap.get(roomCode));
            io.to(roomCode).emit('game_receiveMessage', {
                type: 'system',
                text: `${userDataMap.get(guestCode).nickname} 님이 기권했습니다.`,
            });
        } catch (e) {
            console.log('socket.game_surrender ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - send emoji
    socket.on('game_sendEmoji', ({ roomCode, position, emoji, guestCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            io.to(roomCode).emit('game_receiveEmoji', {
                position: position,
                emoji: emoji,
            });
        } catch (e) {
            console.log('socket.game_sendEmoji ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - request swap position
    socket.on('game_requestSwap', ({ roomCode, myPosition, targetPosition, guestCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            if (roomDataMap.get(roomCode).player[myPosition].swap === 'true' || roomDataMap.get(roomCode).player[targetPosition].swap === 'true') {
                return;
            }
            const nextPlayerArr = roomDataMap.get(roomCode).player;
            nextPlayerArr.map((arr, i) => {
                if (i === myPosition || i === targetPosition) {
                    arr.swap = 'true';
                }
            });
            roomDataMap.set(roomCode, {
                ...roomDataMap.get(roomCode),
                player: nextPlayerArr,
            });
            io.to(roomCode).emit('game_receiveSwapRequest', {
                playerArr: roomDataMap.get(roomCode).player,
                sender: myPosition,
                senderName: roomDataMap.get(roomCode).player[myPosition].nickname,
                recipient: targetPosition,
            });
        } catch (e) {
            console.log('socket.game_requestSwap ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # in game - response swap
    socket.on('game_responseSwap', ({ roomCode, type, sender, recipient, guestCode }, callback) => {
        try {
            if (userDataMap.has(guestCode) === false) {
                callback('disconnected');
                return;
            }
            if (roomDataMap.has(roomCode) === false) {
                return;
            }
            const nextPlayerArr = roomDataMap.get(roomCode).player;
            nextPlayerArr.map((arr, i) => {
                if (i === sender || i === recipient) {
                    arr.swap = 'false';
                }
            });
            roomDataMap.set(roomCode, {
                ...roomDataMap.get(roomCode),
                player: nextPlayerArr,
            });

            if (type === 'accept') {
                const senderName = roomDataMap.get(roomCode).player[sender].nickname;
                const senderObj = roomDataMap.get(roomCode).player[sender];
                const recipientName = roomDataMap.get(roomCode).player[recipient].nickname;
                const recipientObj = roomDataMap.get(roomCode).player[recipient];
                let nextArray = updateArray(roomDataMap.get(roomCode).player, recipient, senderObj);
                nextArray = updateArray(nextArray, sender, recipientObj);
                roomDataMap.set(roomCode, {
                    ...roomDataMap.get(roomCode),
                    player: nextArray,
                });
                io.to(roomCode).emit('game_acceptSwap', {
                    sender: sender,
                    recipient: recipient,
                    roomData: roomDataMap.get(roomCode),
                });
                io.to(roomCode).emit('game_receiveMessage', {
                    type: 'system',
                    text: `${senderName} 님과 ${recipientName} 님이 자리를 교체했습니다.`,
                });
            } else {
                io.to(roomCode).emit('game_rejectSwap', roomDataMap.get(roomCode));
            }
        } catch (e) {
            console.log('socket.game_responseSwap ERROR >>');
            console.log(e);
            callback('bad request');
        }
    });

    // # disconnect
    socket.on('disconnect', () => {
        try {
            let tempGuestCode = '';
            let tempRoomCode = '';
            for (let guestCode of userDataMap.keys()) {
                if (userDataMap.get(guestCode).socketId === socket.id) {
                    tempGuestCode = guestCode;
                    tempRoomCode = userDataMap.get(tempGuestCode).room;
                }
            }

            if (tempRoomCode === 'lobby') {
                // leave lobby
            } else if (roomDataMap.has(tempRoomCode)) {
                // # leave game
                // in case of user is host, kick all player in room and remove room
                if (roomDataMap.get(tempRoomCode).host.guestCode === tempGuestCode) {
                    io.to(tempRoomCode).emit('game_closeRoom');
                    roomDataMap.delete(tempRoomCode);
                    io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
                } else {
                    // in case of user is guest, delete user from player array
                    const playerArr = roomDataMap.get(tempRoomCode).player;
                    playerArr.map((arr) => {
                        arr.state = 'waiting';
                        arr.swap = 'false';
                    });
                    const nextPlayerArr = playerArr.filter((arr) => {
                        return arr.guestCode !== tempGuestCode;
                    });
                    roomDataMap.set(tempRoomCode, {
                        ...roomDataMap.get(tempRoomCode),
                        roomState: 'waiting',
                        player: nextPlayerArr,
                        turn: 0,
                        tile: [],
                        tileStr: convertTileToString([]),
                    });
                    io.to(tempRoomCode).emit('game_receiveGameData', roomDataMap.get(tempRoomCode));
                    io.to(tempRoomCode).emit('game_receiveMessage', {
                        type: 'system',
                        text: `${userDataMap.get(tempGuestCode).nickname} 님이 게임을 종료했습니다.`,
                    });
                    io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
                }
            } else {
            }
            userDataMap.delete(tempGuestCode);

            io.to('lobby').emit('lobby_receiveUserNum', { userNum: userDataMap.size });
            io.to('lobby').emit('lobby_receiveGameList', convertMapToArray(roomDataMap));
            console.log(`user: ${userDataMap.size} / room: ${roomDataMap.size}`);
        } catch (e) {
            console.log('socket.disconnect ERROR >>');
            console.log(e);
        }
    });
});

socketServer.listen(4001, () => {
    console.log('socket on');
});
