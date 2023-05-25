import styled from "styled-components";
import { colorConcave, colorConvex } from "../../styles/colors";
import { HiRefresh } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import Button from "../common/Button";

const PlayerPanelWrapper = styled.div`
    padding: 8px;
    background: ${props => props.color};
    box-shadow: ${colorConvex[0]};
    display: flex;
    flex-direction: column;

    .CtrlPanel {
        width: 140px;
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
    background: ${props => props.active === "true" ? "#000099" : "#C0C0C0"};
    color: ${props => props.active ? "white" : "black"};
    font-size: 1.2rem;
    margin: 4px;
    padding: 4px;
    box-shadow: ${colorConcave[0]};
    overflow: hidden;

`;

const PlayerOther = styled.div`
    height: 30px;
    min-width: 138px;
    max-width: 138px;
    background: ${props => props.active === "true" ? "#000099" : "#C0C0C0"};
    color: ${props => props.active ? "white" : "black"};
    font-size: 1.4rem;
    margin: 4px;
    padding: 2px;
    box-shadow: ${colorConcave[0]};
    overflow: hidden;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        max-width: 100px;
        min-width: 0;
        height: 18px;
    }
`;

const PlayerPanel = ({type, name, color, active}) => {
    return (
        <PlayerPanelWrapper color={color}>
            {type === "other" && <PlayerOther active={active}>{name}</PlayerOther>}
            {type === "player" && <Player active={active}>{name}</Player>}
            {type === "player" && 
                <div className="CtrlPanel">
                    <Button width={"32px"} height={"24px"}><FaRegSmile /></Button>
                    <Button width={"32px"} height={"24px"}><HiRefresh /></Button>
                    <Button width={"52px"} height={"24px"}>대기</Button>
                </div>
            }
        </PlayerPanelWrapper>
    )
};

export default PlayerPanel;