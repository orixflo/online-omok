import styled from 'styled-components';
import Button from '../common/Button';
import { useEffect, useState } from 'react';

const RoomWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 4px;
    padding-right: 4px;
    background: #c0c0c0;
    width: 240px;
    height: 60px;
    display: grid;
    grid-template-rows: 4px 1fr 2fr;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    justify-items: start;

    box-shadow:
        // Internal frame
        -2px -2px #dfdfdf,
        -2px 0px #dfdfdf,
        0px -2px #dfdfdf,
        2px 2px #808080,
        2px -2px #808080,
        -2px 2px #808080,
        // External frame
        -4px -4px #808080,
        -4px 2px #808080,
        2px -4px #808080,
        4px 4px #dfdfdf,
        4px -4px #dfdfdf,
        -4px 4px #dfdfdf;

    p:nth-child(2) {
        grid-column-start: 1;
        grid-column-end: 3;
    }

    p:nth-child(3) {
        font-size: 1.2rem;
    }

    Button:nth-child(4) {
        grid-column-start: 2;
        grid-column-end: 3;
    }
`;

const RoomType = styled.div`
    position: relative;
    background: #c0c0c0;
    grid-column-start: 1;
    grid-column-end: 3;
    top: -4px;
`;

const Room = ({ roomType, host, currentPlayer, maxPlayer, joinRoom }) => {
    const [mode, setMode] = useState();
    const [name, setName] = useState();
    const [disable, setDisable] = useState(false);
    const roomCode = `room${host.guestCode}`;

    useEffect(() => {
        if (roomType === 'option1') setMode('일반게임');
        if (roomType === 'option2') setMode('협동게임');
    }, []);

    useEffect(() => {
        if (maxPlayer <= currentPlayer) setDisable(true);
        else setDisable(false);
    }, [currentPlayer]);

    useEffect(() => {
        if (host.nickname.length > 7) setName(`${host.nickname.substr(0, 7)}...`);
        else setName(host.nickname);
    }, []);

    return (
        <RoomWrapper>
            <RoomType>{mode}</RoomType>
            <p>Host: {`(${host.guestCode})${name}`}</p>
            <p>
                인원 : {currentPlayer}/{maxPlayer}
            </p>
            <Button
                disabled={disable}
                onClick={() => {
                    joinRoom(roomCode);
                }}
                width={'90%'}
            >
                {disable ? 'FULL' : '참가'}
            </Button>
        </RoomWrapper>
    );
};

export default Room;
