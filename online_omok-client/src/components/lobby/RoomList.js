import styled from "styled-components";
import btnScrUp from "../../asset/img/scr_up.png";
import btnScrDown from "../../asset/img/scr_down.png";
import { colorScrollBtnOff, colorScrollBtnOn } from "../../styles/colors";
import Room from "./Room";

const RoomListWrapper = styled.div`
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #C0C0C0;
    overflow-y: scroll;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }

    &::-webkit-scrollbar {
        margin: 100px;
        width: 30px;
    }
    &::-webkit-scrollbar-thumb {
        background: #C0C0C0;
        background-clip: padding-box;
        box-shadow: ${colorScrollBtnOff};

        &:active {
            box-shadow: ${colorScrollBtnOn};
        }
    }
    &::-webkit-scrollbar-track {
        background: #DFDFDF;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement {
        width: 30px;
        height: 30px;
        background: #C0C0C0;
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
        background: #C0C0C0;
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



const RoomList = () => {
    return (
        <RoomListWrapper>
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            
        </RoomListWrapper>
    );
};

export default RoomList;