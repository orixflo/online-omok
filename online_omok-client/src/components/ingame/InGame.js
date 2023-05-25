import styled from "styled-components";
import WindowForm from "../common/WindowForm";
import PlayerPanel from "./PlayerPanel";
import CheckerBoard from "./CheckerBoard";


const InGameWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 60vw;
    min-width: 1100px;
    height: 70vh;
    min-height: 540px;

    @media (max-width: 768px) {
        width: 90vw;
        min-width: 0;
        height: 90vh;
    }
`;

const CheckerBoardArea = styled.div`
    width: calc(70vh - 57px);
    height: calc(70vh - 57px);
    min-width: 489px;
    min-height: 489px;
    background: #C0C0C0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
        width: 90vw;
        height: 90vw;
        min-width: 0;
        min-height: 0;
        top: 50%;
    }
`;

const PlayerPanelBoxTop = styled.div`
    width: 100%;
    height: 50%;
    background: #C0C0C0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const PlayerPanelBoxBottom = styled.div`
    width: 100%;
    height: 50%;
    background: #C0C0C0;
    display: flex;
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

const InGame = () => {
    return (
        <InGameWrapper>
            <WindowForm>
                <Content>
                    <PlayerPanelBoxTop>
                        <PlayerPanel color={"black"} type={"other"} name={"snail000000000000"} active={"true"}/>
                        <PlayerPanel color={"black"} type={"other"} name={"fox00000000000000"}/>
                    </PlayerPanelBoxTop>
                    <PlayerPanelBoxBottom>
                        <PlayerPanel color={"white"} type={"other"} name={"dog"}/>
                        <PlayerPanel color={"white"} type={"player"} name={"ori"}/>
                    </PlayerPanelBoxBottom>
                    <CheckerBoardArea>
                        <CheckerBoard />
                    </CheckerBoardArea>  
                </Content>
            </WindowForm>
        </InGameWrapper>
    );
};

export default InGame;