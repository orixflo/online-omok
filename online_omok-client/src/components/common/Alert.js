import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import Button from '../common/Button';
import { useState } from 'react';
import SpacerHorizontal from './SpacerHorizontal';

const EmptySpace = styled.div`
    font-family: 'DungGeunMo';
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.539);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    visibility: ${(props) => (props.visible === 'true' ? 'visible' : 'hidden')};
`;

const ModalForm = styled.div`
    position: absolute;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    margin: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.4rem;
    ${(props) => props.result === 'lose' && `color: red`};
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Alert = ({ text, type, confirm, cancel }) => {
    const [visible, SetVisible] = useState('true');

    const handleConfirm = () => {
        confirm();
        SetVisible('false');
    };

    const handleCancel = () => {
        cancel();
        SetVisible('false');
    };

    return (
        <EmptySpace visible={visible}>
            <ModalForm>
                <WindowForm>
                    <Content>
                        {text && <Text>{text}</Text>}
                        {type === 'alert' && (
                            <Button fontSize={'1.4rem'} onClick={handleConfirm}>
                                확인
                            </Button>
                        )}
                        {type === 'confirm' && (
                            <ButtonBox>
                                <Button fontSize={'1.4rem'} onClick={handleConfirm}>
                                    확인
                                </Button>
                                <SpacerHorizontal size={'14px'} />
                                <Button fontSize={'1.4rem'} onClick={handleCancel}>
                                    취소
                                </Button>
                            </ButtonBox>
                        )}
                    </Content>
                </WindowForm>
            </ModalForm>
        </EmptySpace>
    );
};

export default Alert;
