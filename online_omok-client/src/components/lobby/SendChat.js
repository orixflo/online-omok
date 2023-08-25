import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import SpacerHorizontal from '../common/SpacerHorizontal';
import React from 'react';

const SendChatWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 100%;
    height: 20px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

const SendChat = ({ sendMessage, onChange, value }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    // console.log('send chat render');

    return (
        <SendChatWrapper>
            <Input width={'80%'} height={'20px'} style={{ marginLeft: 0 }} onChange={onChange} value={value} onKeyPress={handleKeyPress} />
            <SpacerHorizontal width={'8px'} />
            <Button width={'20%'} height={'22px'} style={{ marginRight: 0 }} onClick={sendMessage}>
                입력
            </Button>
        </SendChatWrapper>
    );
};

export default React.memo(SendChat);
