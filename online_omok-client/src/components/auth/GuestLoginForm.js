import styled from 'styled-components';
import WindowForm from '../common/WindowForm';
import Input from '../common/Input';
import Button from '../common/Button';

const RegisterFormWrapper = styled.div`
    font-family: 'DungGeunMo';
    width: 300px;
    min-height: 150px;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonArea = styled.div`
    display: flex;
    margin: 10px;
    justify-content: center;
`;

const ERROR = styled.div`
    color: red;
    font-size: 0.9rem;
`;

const GuestLoginForm = ({ onSubmit, onChange, form, error, animationtype }) => {
    return (
        <RegisterFormWrapper>
            <WindowForm title={'온라인 오목'} animationtype={animationtype}>
                <Form onSubmit={onSubmit}>
                    <InputArea>
                        <p>닉네임</p>
                        <Input
                            name="nickname"
                            placeholder="닉네임을 입력해주세요."
                            value={form.nickname}
                            onChange={onChange}
                            width={'250px'}
                            autoComplete="off"
                        />
                    </InputArea>
                    {error && <ERROR>{error}</ERROR>}
                    <ButtonArea>
                        <Button width={'100px'}>접속</Button>
                    </ButtonArea>
                </Form>
            </WindowForm>
        </RegisterFormWrapper>
    );
};

export default GuestLoginForm;
