import styled, { css, keyframes } from 'styled-components';
import { colorConcave, colorConvex } from '../../styles/colors';
import { HiRefresh } from 'react-icons/hi';
import { FaRegSmile } from 'react-icons/fa';
import Button from '../common/Button';
import React, { useEffect, useState } from 'react';
import Alert from '../common/Alert';

import emoji_angry from '../../asset/emoji/angry.png';
import emoji_confused from '../../asset/emoji/confused.png';
import emoji_happy from '../../asset/emoji/happy.png';
import emoji_sad from '../../asset/emoji/sad.png';

const PlayerPanelWrapper = styled.div`
    position: relative;
    padding: 8px;
    background: ${(props) => props.color};
    box-shadow: ${colorConvex[0]};
    display: flex;
    flex-direction: column;

    .CtrlPanel {
        width: 140px;
        height: 32px;
        display: flex;
        justify-content: center;
        padding: 2px;
        margin: 4px;
        box-shadow: ${colorConcave[0]};
    }

    @media (max-width: 768px) {
        padding: 4px;
    }
`;

const Player = styled.div`
    height: 20px;
    width: 138px;
    background: ${(props) => (props.active === 'true' ? '#000099' : '#C0C0C0')};
    color: ${(props) => (props.active === 'true' ? 'white' : 'black')};
    font-size: 1rem;
    margin: 4px;
    padding: 4px;
    box-shadow: ${colorConcave[0]};
    overflow: hidden;
    display: flex;
    align-items: center;
    white-space: nowrap;
`;

const PlayerOther = styled.div`
    height: 30px;
    min-width: 138px;
    max-width: 138px;
    background: ${(props) => (props.active === 'true' ? '#000099' : '#C0C0C0')};
    color: ${(props) => (props.active === 'true' ? 'white' : 'black')};
    font-size: 1.2rem;
    margin: 4px;
    padding: 2px;
    box-shadow: ${colorConcave[0]};
    overflow: hidden;
    display: flex;
    align-items: center;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        max-width: 100px;
        min-width: 0;
        height: 18px;
    }
`;

const EmojiList = styled.div`
    position: absolute;
    left: 16px;
    top: -38px;
    z-index: 3;
    background: #b6b6b6;
    box-shadow: ${colorConvex[0]};
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const popEmoji = keyframes`
    from { z-index: 2; }
    1%  { transform: scale(0, 0); }
    3%  { transform: scale(1.4, 0.5); }
    5%  { transform: scale(0.5, 1.4); }
    7%  { transform: scale(1.2, 0.8); }
    9%  { transform: scale(1, 1); }
    90% { opacity: 1; }
    to { opacity: 0; }
`;

const Emoji = styled.div`
    width: 140px;
    height: 140px;
    z-index: 1;
    ${(props) =>
        props.type === 'player' &&
        css`
            right: 0px;
            top: -150px;
        `};
    ${(props) =>
        props.type === 'team' &&
        css`
            left: 0px;
            bottom: 70px;
        `};
    ${(props) =>
        props.type === 'other' &&
        css`
            left: 0px;
            top: 70px;
        `};
    ${(props) =>
        props.type === 'otherR' &&
        css`
            right: 0px;
            top: 70px;
        `};
    ${(props) => props.emoji === 'angry' && `background: url(${emoji_angry}) #C0C0C0;`};
    ${(props) => props.emoji === 'confused' && `background: url(${emoji_confused}) #C0C0C0;`};
    ${(props) => props.emoji === 'happy' && `background: url(${emoji_happy}) #C0C0C0;`};
    ${(props) => props.emoji === 'sad' && `background: url(${emoji_sad}) #C0C0C0;`};
    background-size: contain;
    position: absolute;
    box-shadow: ${colorConvex[0]};
    animation: ${popEmoji} 5s 1 forwards;

    @media (max-width: 768px) {
        width: 8vh;
        height: 8vh;
        ${(props) =>
            props.type === 'player' &&
            css`
                right: 0px;
                top: -38px;
            `};
        ${(props) =>
            props.type === 'team' &&
            css`
                left: 0px;
                bottom: 47px;
            `};
        ${(props) =>
            props.type === 'other' &&
            css`
                left: 0px;
                top: 47px;
            `};
        ${(props) =>
            props.type === 'otherR' &&
            css`
                right: 0px;
                top: 47px;
            `};
        padding: 4px;
    }
`;

const PlayerPanel = ({ type, color, playerSlot, roomState, ingameFn, emoji, swapBtn }) => {
    const [confirm, setConfirm] = useState(false);
    const [emojiListVisibility, setEmojiListVisibility] = useState(false);
    const [swapBtnActive, setSwapBtnActive] = useState(false);

    useEffect(() => {
        setSwapBtnActive(swapBtn);
    }, [swapBtn]);

    const onClickSurrender = () => {
        ingameFn.setSurrenderForm('surrenderForm');
    };
    
    const onEmojiListBtn = () => {
        if (emojiListVisibility) {
            setEmojiListVisibility(false);
        } else {
            setEmojiListVisibility(true);
        }
    };

    const onSelectEmojiBtn = (type) => {
        ingameFn.sendEmoji(type);
        setEmojiListVisibility(false);
    };

    return (
        <PlayerPanelWrapper color={color}>
            {emojiListVisibility && (
                <EmojiList>
                    <Button width={'60px'} height={'30px'} onClick={() => onSelectEmojiBtn('happy')}>
                        행복
                    </Button>
                    <Button width={'60px'} height={'30px'} onClick={() => onSelectEmojiBtn('angry')}>
                        화남
                    </Button>
                    <Button width={'60px'} height={'30px'} onClick={() => onSelectEmojiBtn('sad')}>
                        슬픔
                    </Button>
                    <Button width={'60px'} height={'30px'} onClick={() => onSelectEmojiBtn('confused')}>
                        혼란
                    </Button>
                </EmojiList>
            )}
            {emoji !== '-' && <Emoji type={type} emoji={emoji} />}

            {(type === 'other' || type === 'team' || type === 'otherR') && <PlayerOther active={playerSlot.active}>{playerSlot.name}</PlayerOther>}
            {type === 'player' && <Player active={playerSlot.active}>{playerSlot.name}</Player>}
            {type === 'player' && (
                <div className="CtrlPanel">
                    <Button width={'32px'} height={'24px'} onClick={onEmojiListBtn}>
                        <FaRegSmile />
                    </Button>
                    <Button width={'32px'} height={'24px'} onClick={() => ingameFn.setSwapForm('requestForm')} disabled={swapBtnActive}>
                        <HiRefresh />
                    </Button>
                    {roomState === 'waiting' && (
                        <Button width={'52px'} height={'24px'} onClick={ingameFn.changePlayerState}>
                            {playerSlot.active === 'false' ? '준비' : '대기'}
                        </Button>
                    )}
                    {roomState === 'ingame' && (
                        <Button width={'52px'} height={'24px'} onClick={onClickSurrender}>
                            기권
                        </Button>
                    )}
                </div>
            )}
        </PlayerPanelWrapper>
    );
};

export default React.memo(PlayerPanel);
