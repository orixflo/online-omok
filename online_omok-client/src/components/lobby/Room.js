import styled from "styled-components";
import Button from "../common/Button";

const RoomWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 4px;
    padding-right: 4px;
    background: #C0C0C0;
    width: 240px;
    height: 60px;
    display: grid;
    grid-template-rows: 4px 1fr 2fr;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    justify-items: start;

    box-shadow:
        // Internal frame
        -2px -2px #DFDFDF,
        -2px 0px #DFDFDF,
        0px -2px #DFDFDF,
        2px 2px #808080,
        2px -2px #808080,
        -2px 2px #808080,
        // External frame
        -4px -4px #808080,
        -4px 2px #808080,
        2px -4px #808080,
        4px 4px #DFDFDF,
        4px -4px #DFDFDF,
        -4px 4px #DFDFDF;

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
    background: #C0C0C0;
    grid-column-start: 1;
    grid-column-end: 3;
    top: -4px;
    
`;

const Room = () => {
    return (
        <RoomWrapper>
            <RoomType>일반</RoomType>
            <p>Host: user001 / 1200pts</p>
            <p>인원 1/2</p>
            <Button width={'90%'}>{"참가"}</Button>
        </RoomWrapper>
    );
};

export default Room;