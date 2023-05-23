import styled from "styled-components";
import WindowForm from '../common/WindowForm';
import Tab from "../common/Tab";
import TabButton from "../common/TabButton";
import { useState } from "react";
import SpacerHorizontal from "../common/SpacerHorizontal";
import Button from "../common/Button";
import RoomList from "./RoomList";
import Input from "../common/Input";
import { colorConcave } from "../../styles/colors";


const LobbyWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 40vw;
    min-width: 768px;
    height: 80vh;
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
`;

const ChatIn = styled.div`
    font-family: 'DungGeunMo';
    width: 100%;
    height: 80%;
    background: white;
    border: 0px;
    box-shadow: ${colorConcave[0]};
`;

const ChatOut = styled.div`
    font-family: 'DungGeunMo';
    width: 100%;
    height: 20px;
    margin-top: 10px;
    display: flex;    
    justify-content: space-between;
`;

const  Lobby = () => {
    const [btn, setBtn] = useState({
        btn1: true,
        btn2: false,
        btn3: false,
    });
    
    const btnClick = (btnName) => {
        setBtn({
            btn1: false,
            btn2: false,
            btn3: false,
        });
        setBtn({
            [btnName]: true,
        });
    };

    return (
        <LobbyWrapper>
            <WindowForm title={"user1/1000pts"} close={true}>
                <Content>  
                    <TabBox>
                        <TabMenuButton>
                            <TabButton activated={btn.btn1} onClick={() => {btnClick("btn1")}}>대기실</TabButton>
                            <TabButton activated={btn.btn2} onClick={() => {btnClick("btn2")}}>내정보</TabButton>
                            <TabButton activated={btn.btn3} onClick={() => {btnClick("btn3")}}>순위</TabButton>
                        </TabMenuButton>
                        <Tab>
                            <RoomList />
                        </Tab>
                    </TabBox>
                    <ChatBox>
                        <ChatIn />
                        <ChatOut>
                            <Input width={"80%"} height={"20px"} style={{marginLeft: 0}}/>
                            <SpacerHorizontal width={'8px'} />
                            <Button width={'20%'} height={'22px'} style={{marginRight: 0}}>입력</Button>
                        </ChatOut>
                    </ChatBox>
                </Content>
            </WindowForm>
        </LobbyWrapper>
    );
};

export default Lobby;