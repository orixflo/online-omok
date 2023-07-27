import styled from 'styled-components';
import { colorConcave } from '../../styles/colors';
import { colorScrollBtnOff, colorScrollBtnOn } from '../../styles/colors';
import btnScrUp from '../../asset/img/scr_up.png';
import btnScrDown from '../../asset/img/scr_down.png';
import { useEffect, useRef } from 'react';
import React from 'react';

const ReceiveChatWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: white;
    border: 0px;
    box-shadow: ${colorConcave[0]};
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        margin: 100px;
        width: 30px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c0c0c0;
        background-clip: padding-box;
        box-shadow: ${colorScrollBtnOff};

        &:active {
            box-shadow: ${colorScrollBtnOn};
        }
    }
    &::-webkit-scrollbar-track {
        background: #dfdfdf;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement {
        width: 30px;
        height: 30px;
        background: #c0c0c0;
        background-image: url(${btnScrUp});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 22px;
        background-clip: padding-box;
        box-shadow: ${colorScrollBtnOff};
        &:active {
            box-shadow: ${colorScrollBtnOn};
        }
    }
    &::-webkit-scrollbar-button:vertical:end:increment {
        width: 30px;
        height: 30px;
        background: #c0c0c0;
        background-image: url(${btnScrDown});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 22px;
        background-clip: padding-box;
        box-shadow: ${colorScrollBtnOff};
        &:active {
            box-shadow: ${colorScrollBtnOn};
        }
    }
`;
const SystemMessage = styled.div`
    background: blue;
    color: white;
    font-size: 1.3rem;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const Message = styled.div`
    font-size: 1.1rem;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const ReceiveChat = ({ chatArr }) => {
    const scrollRef = useRef(null);
    const chatList =
        chatArr &&
        chatArr.map((chat, index) =>
            chat.type === 'system' ? <SystemMessage key={index}>{chat.text}</SystemMessage> : <Message key={index}>{chat.text}</Message>,
        );

    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [chatArr]);

    return (
        <ReceiveChatWrapper>
            {chatList}
            <div ref={scrollRef}></div>
        </ReceiveChatWrapper>
    );
};

export default React.memo(ReceiveChat);
