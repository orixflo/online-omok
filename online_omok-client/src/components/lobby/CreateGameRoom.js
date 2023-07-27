import styled from 'styled-components';
import Button from '../common/Button';
import { useState } from 'react';

const CreateGameRoomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MenuBox = styled.div`
    margin-top: 20px;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 4px;
    padding-right: 4px;
    background: #c0c0c0;
    width: calc(100% - 36px);
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-items: center;

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
`;

const MenuContentBox = styled.div`
    display: flex;
`;

const MenuTypeText = styled.div`
    position: relative;
    background: #c0c0c0;
    top: -10px;
`;

const ButtonType = styled.div`
    width: calc(100% - 22px);
    margin-top: 10px;
    display: flex;
    justify-content: end;
`;

const CreateGameRoom = ({ changeOpiont, createGameRoom }) => {
    const [gameMode, setGameMode] = useState({
        option1: true,
        option2: false,
        option3: false,
    });

    const btnClick = (btnName) => {
        setGameMode({
            option1: false,
            option2: false,
            option3: false,
        });
        setGameMode({
            [btnName]: true,
        });
        changeOpiont(btnName);
    };

    return (
        <CreateGameRoomWrapper>
            <MenuBox>
                <MenuTypeText>게임모드</MenuTypeText>
                <MenuContentBox>
                    <Button
                        height={'28px'}
                        fontSize={'1rem'}
                        checked={gameMode.option1}
                        onClick={() => {
                            btnClick('option1');
                        }}
                    >
                        일반게임
                    </Button>
                    <Button
                        height={'28px'}
                        fontSize={'1rem'}
                        checked={gameMode.option2}
                        onClick={() => {
                            btnClick('option2');
                        }}
                    >
                        협동게임
                    </Button>
                </MenuContentBox>
            </MenuBox>
            <ButtonType>
                <Button onClick={createGameRoom}>방만들기</Button>
            </ButtonType>
        </CreateGameRoomWrapper>
    );
};

export default CreateGameRoom;
